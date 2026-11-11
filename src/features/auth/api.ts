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

const errorResponseSchema = z.object({
  message: z.string(),
});

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await fetch(`${PULSE_SCORE_API_BASE}/auth/login`, {
    method: 'POST',
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
