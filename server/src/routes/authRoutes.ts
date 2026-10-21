import { Router } from 'express';
import { loginHandler } from '../handlers/authHandlers';

export const authRouter = Router();

authRouter.post('/auth/login', loginHandler);
