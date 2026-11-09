# C prime-number demo

A compiled command-line version using the same trial-division algorithm as the Python and JavaScript versions. Requires a C compiler and a POSIX system (such as Linux or macOS) for the monotonic timer. No external libraries.

From the C root:

```sh
make -C c
./primes          # Default limit: 10,000
./primes 100000   # Custom inclusive upper limit
./primes --help
```

Or compile directly:

```sh
cc -O3 -std=c11 -Wall -Wextra -Wpedantic c/main.c c/primes.c -o c/primes
```

- `primes.c`: calculation only; tests each candidate with divisors up to its square root.
- `primes.h`: declares the calculation function and result type.
- `main.c`: input validation, timing, output, and freeing the result memory.

The limit must be between 1 and 1,000,000. Output includes the prime count, calculation time in milliseconds, and first 20 primes (or all if fewer). The default result is 1,229 primes; 1 is not prime.

Calculation time includes validation, result allocation, and the calculation, excluding startup and printing. C reserves space for all candidates up front; Python and JavaScript grow their result lists. These implementation and runtime differences also affect timings. For comparison, use identical limits, enable C optimization (`-O3`), repeat measurements, and warm up JavaScript. A single short run is not a reliable speed comparison.

Remove the executable with `make -C c clean`.
