import express from 'express';
import cors from 'cors';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true });
});

app.get('/api/test', (req, res) => {
  const name = req.query.name ?? 'guest';

  res.status(200).json({
    message: 'Test route is working',
    name,
  });
});

app.post('/api/echo', (req, res) => {
  res.status(200).json({
    message: 'Data received',
    body: req.body,
  });
});

app.post('/api/teams', (req, res) => {
  const { name, country } = req.body;

  if (!name || !country) {
    return res.status(400).json({
      message: 'name and country are required',
    });
  }

  if (typeof name !== 'string' || typeof country !== 'string') {
    return res.status(400).json({
      message: 'name and country must be strings',
    });
  }

  return res.status(201).json({
    message: 'Team received successfully',
    team: {
      name,
      country,
    },
  });
});
