export const MAX_LIMIT = 1_000_000;

export function validateLimit(limit) {
  if (!Number.isInteger(limit) || limit < 1 || limit > MAX_LIMIT) {
    throw new RangeError(`Enter a whole number between 1 and ${MAX_LIMIT.toLocaleString('en-US')}.`);
  }
}

// This exact module runs in both the browser and Node.js.
export function findPrimes(limit) {
  validateLimit(limit);
  const primes = [];
  for (let candidate = 2; candidate <= limit; candidate++) {
    let isPrime = true;
    for (let divisor = 2; divisor * divisor <= candidate; divisor++) {
      if (candidate % divisor === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(candidate);
  }
  return primes;
}
