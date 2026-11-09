import test from 'node:test';
import assert from 'node:assert/strict';
import { findPrimes } from '../shared/primes.js';
import { app } from '../server.js';

test('Express serves the page, shared module, and validated calculation API', async (t) => {
  const server = app.listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  t.after(() => new Promise((resolve, reject) => server.close(error => error ? reject(error) : resolve())));
  const base = `http://127.0.0.1:${server.address().port}`;
  const response = await fetch(`${base}/api/primes?limit=10000`);
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.count, 1229);
  assert.deepEqual(result.preview, findPrimes(10_000).slice(0, 20));
  assert.ok(Number.isFinite(result.elapsedMs) && result.elapsedMs >= 0);
  for (const query of ['', '?limit=', '?limit=abc', '?limit=0', '?limit=1.5', '?limit=1000001', '?limit=2&limit=3']) {
    const invalid = await fetch(`${base}/api/primes${query}`);
    assert.equal(invalid.status, 400, query);
    assert.equal(typeof (await invalid.json()).error, 'string');
  }
  const empty = await (await fetch(`${base}/api/primes?limit=1`)).json();
  assert.equal(empty.count, 0);
  for (const path of ['/', '/app.js', '/style.css', '/shared/primes.js']) {
    assert.equal((await fetch(`${base}${path}`)).status, 200, path);
  }
});
