import { z } from 'zod';

export const createTeamSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  country: z.string().trim().min(1, 'County is required'),
});
