import type { Request, Response } from 'express';

import { epl2019 } from '../data/epl2019';

export const top3Handler = (_req: Request, res: Response) => {
  return res.status(200).json(epl2019);
};
