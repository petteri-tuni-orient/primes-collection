"""Command-line interface for the prime-number demonstration."""

import argparse
from time import perf_counter

from primes import MAX_LIMIT, find_primes


def parse_limit(value: str) -> int:
    try:
        limit = int(value)
    except ValueError:
        raise argparse.ArgumentTypeError("Limit must be a whole number.") from None
    if not 1 <= limit <= MAX_LIMIT:
        raise argparse.ArgumentTypeError(f"Limit must be between 1 and {MAX_LIMIT:,}.")
    return limit


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Find prime numbers using the same trial-division algorithm as the JavaScript demo."
    )
    parser.add_argument(
        "limit", nargs="?", type=parse_limit, default=10_000,
        help=f"inclusive upper limit, 1–{MAX_LIMIT:,} (default: 10,000)",
    )
    args = parser.parse_args()

    start = perf_counter()
    primes = find_primes(args.limit)
    elapsed_ms = (perf_counter() - start) * 1000

    print(f"Range: 1 to {args.limit:,}")
    print(f"Primes found: {len(primes):,}")
    print(f"Calculation time: {elapsed_ms:.3f} ms")
    if primes:
        preview = primes[:20]
        print(f"First {len(preview)} primes: {', '.join(map(str, preview))}")
    else:
        print("No primes in this range. 1 is not prime.")


if __name__ == "__main__":
    main()
