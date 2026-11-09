import express from 'express';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { findPrimes, validateLimit } from './shared/primes.js';

export const app = express();
app.disable('x-powered-by');
app.use(express.static(fileURLToPath(new URL('./public/', import.meta.url))));
app.use('/shared', express.static(fileURLToPath(new URL('./shared/', import.meta.url))));

app.get('/api/primes', (req, res) => {
  const limit = typeof req.query.limit === 'string' && req.query.limit.trim() !== ''
    ? Number(req.query.limit) : NaN;
  try {
    validateLimit(limit);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  const start = performance.now();
  const primes = findPrimes(limit);
  const elapsedMs = performance.now() - start;
  res.set('Cache-Control', 'no-store').json({
    limit, count: primes.length, elapsedMs, preview: primes.slice(0, 20)
  });
});

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Prime demo: http://localhost:${port}`));
}
