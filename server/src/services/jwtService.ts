import { SignJWT, jwtVerify } from 'jose';
import { env } from '../config/env.js';

const secret = new TextEncoder().encode(env.jwtSecret);

export const createAccessToken = async (userId: string) => {
  return new SignJWT({ tokenType: 'access' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(secret);
};

export const createRefreshToken = async (userId: string) => {
  return new SignJWT({ tokenType: 'refresh' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
};

export const verifyAccessToken = async (token: string) => {
  const { payload } = await jwtVerify(token, secret, {
    algorithms: ['HS256'],
    requiredClaims: ['sub', 'iat', 'exp'],
  });

  if (payload.tokenType !== 'access') {
    throw new Error('Invalid token type');
  }

  return payload;
};

export const verifyRefreshToken = async (token: string) => {
  const { payload } = await jwtVerify(token, secret, {
    algorithms: ['HS256'],
    requiredClaims: ['sub', 'iat', 'exp'],
  });

  if (payload.tokenType !== 'refresh') {
    throw new Error('Invalid token type');
  }

  return payload;
};
