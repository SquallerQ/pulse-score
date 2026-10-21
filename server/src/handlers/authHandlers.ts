import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { users } from '../data/users';

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find((item) => item.email === email);

  if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
    return res.status(400).json({
      message: 'Email and password are required',
    });
  }

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

  return res.status(200).json({
    id: user.id,
    email: user.email,
    name: user.name,
  });
};
