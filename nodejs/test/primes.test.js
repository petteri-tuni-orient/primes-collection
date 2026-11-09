import test from 'node:test';
import assert from 'node:assert/strict';
import { findPrimes } from '../shared/primes.js';

test('finds primes inclusively and excludes one and perfect squares', () => {
  assert.deepEqual(findPrimes(1), []);
  assert.deepEqual(findPrimes(2), [2]);
  assert.deepEqual(findPrimes(25), [2, 3, 5, 7, 11, 13, 17, 19, 23]);
  assert.equal(findPrimes(10_000).length, 1229);
});

test('rejects invalid limits', () => {
  for (const value of [0, -1, 2.5, NaN, Infinity, '100', 1_000_001]) {
    assert.throws(() => findPrimes(value), RangeError);
  }
});

