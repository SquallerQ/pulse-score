import { Router } from 'express';
import { loginHandler, getMeHandler } from '../handlers/authHandlers';
import { authMiddleware } from '../middlewares/authMiddleware';

export const authRouter = Router();

authRouter.post('/auth/login', loginHandler);

authRouter.get('/auth/me', authMiddleware, getMeHandler);
