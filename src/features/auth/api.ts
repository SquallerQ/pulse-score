import { z } from 'zod';
import { PULSE_SCORE_API_BASE } from '../../api/config';

const loginResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    email: z.string().email(),
    name: z.string(),
  }),
  accessToken: z.string(),
});

const currentUserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
});

const refreshAccessTokenSchema = z.object({
  accessToken: z.string(),
});

const errorResponseSchema = z.object({
  message: z.string(),
});

export class AuthApiError extends Error {
  constructor(
    message: string,
    public readonly status: number | null
  ) {
    super(message);
    this.name = 'AuthApiError';
  }
}

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type CurrentUser = z.infer<typeof currentUserSchema>;
export type RefreshAccessTokenResponse = z.infer<typeof refreshAccessTokenSchema>;

export function isUnauthorizedAuthError(error: unknown): error is AuthApiError {
  return error instanceof AuthApiError && error.status === 401;
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await fetch(`${PULSE_SCORE_API_BASE}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const json: unknown = await response.json();

  if (!response.ok) {
    const error = errorResponseSchema.safeParse(json);
    throw new Error(error.success ? error.data.message : 'Unable to sign in');
  }

  return loginResponseSchema.parse(json);
}

export async function fetchCurrentUser(accessToken: string): Promise<CurrentUser> {
  const response = await fetch(`${PULSE_SCORE_API_BASE}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const json: unknown = await response.json();

  if (response.status === 401) {
    throw new AuthApiError('Authentication is required.', 401);
  }

  if (!response.ok) {
    const error = errorResponseSchema.safeParse(json);
    throw new Error(error.success ? error.data.message : 'Unable to load your profile');
  }

  return currentUserSchema.parse(json);
}

export async function refreshAccessToken(): Promise<RefreshAccessTokenResponse> {
  let response: Response;

  try {
    response = await fetch(`${PULSE_SCORE_API_BASE}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch {
    throw new AuthApiError('Unable to connect while restoring your session.', null);
  }

  let json: unknown = null;

  try {
    json = await response.json();
  } catch {
    throw new AuthApiError('Invalid response while restoring your session.', response.status);
  }

  if (!response.ok) {
    const error = errorResponseSchema.safeParse(json);
    throw new AuthApiError(error.success ? error.data.message : 'Unable to refresh access token', response.status);
  }

  return refreshAccessTokenSchema.parse(json);
}

export async function fetchCurrentUserWithRefresh(
  accessToken: string,
  refreshSession: () => Promise<string>
): Promise<{ user: CurrentUser; accessToken: string }> {
  try {
    const user = await fetchCurrentUser(accessToken);
    return { user, accessToken };
  } catch (error) {
    if (!isUnauthorizedAuthError(error)) {
      throw error;
    }

    const nextAccessToken = await refreshSession();
    const user = await fetchCurrentUser(nextAccessToken);

    return { user, accessToken: nextAccessToken };
  }
}

export async function logout() {
  const response = await fetch(`${PULSE_SCORE_API_BASE}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Unable to log out');
  }
}
