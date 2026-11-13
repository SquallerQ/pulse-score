import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { users } from '../data/users';
import { createAccessToken, createRefreshToken, verifyRefreshToken } from '../services/jwtService';

type LoginBody = {
  email: string;
  password: string;
};

function isLoginBody(value: unknown): value is LoginBody {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const { email, password } = value as Record<string, unknown>;

  return typeof email === 'string' && email.trim().length > 0 && typeof password === 'string' && password.length > 0;
}

export const loginHandler = async (req: Request, res: Response) => {
  const body: unknown = req.body;

  if (!isLoginBody(body)) {
    return res.status(400).json({
      message: 'Email and password are required',
    });
  }

  const { email, password } = body;
  const user = users.find((item) => item.email === email);

  if (!user) {
    return res.status(401).json({
      message: 'Invalid email or password',
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: 'Invalid email or password',
    });
  }

  const accessToken = await createAccessToken(String(user.id));
  const refreshToken = await createRefreshToken(String(user.id));

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    path: '/api/auth',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    accessToken,
  });
};

export const getMeHandler = (req: Request, res: Response) => {
  const userId: unknown = res.locals.userId;

  if (typeof userId !== 'string' || !userId) {
    return res.status(401).json({
      message: 'Authentication is required',
    });
  }

  const user = users.find((user) => String(user.id) === userId);

  if (!user) {
    return res.status(401).json({
      message: 'User no longer exists',
    });
  }

  return res.status(200).json({
    id: user.id,
    email: user.email,
    name: user.name,
  });
};

export const refreshHandler = async (req: Request, res: Response) => {
  const token: unknown = req.cookies.refreshToken;

  if (typeof token !== 'string') {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }

  try {
    const payload = await verifyRefreshToken(token);

    if (!payload.sub) {
      return res.status(401).json({
        message: 'Invalid data',
      });
    }

    const userID = payload.sub;

    const user = users.find((user) => String(user.id) === userID);

    if (!user) {
      return res.status(401).json({
        message: 'User no longer exists',
      });
    }

    const accessToken = await createAccessToken(String(user.id));

    return res.status(200).json({ accessToken });
  } catch {
    return res.status(401).json({
      message: 'Invalid or expired refresh token',
    });
  }
};
