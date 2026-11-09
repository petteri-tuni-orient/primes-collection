# Python prime-number demo

A command-line version of the JavaScript demonstration. Requires Python 3.9 or newer; no external dependencies.

From the Python project root:

```sh
python3 main.py          # Default limit: 10,000
python3 main.py 100000    # Choose an inclusive upper limit
python3 main.py --help
```

`primes.py` contains only the calculation. `main.py` handles arguments, timing, and output. The algorithm matches the JavaScript version: check each candidate using divisors up to its square root. The allowed limit is 1 through 1,000,000; 1 is not prime.

The output shows the number of primes, calculation time in milliseconds, and the first 20 primes (or all primes if fewer). The default range contains 1,229 primes. Timing measures the function call and varies between runs and machines.
