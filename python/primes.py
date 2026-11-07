"""Prime-number calculation, independent of the command-line interface."""

MAX_LIMIT = 1_000_000


def find_primes(limit: int) -> list[int]:
    """Return every prime from 2 through limit, including limit if prime."""
    if type(limit) is not int or not 1 <= limit <= MAX_LIMIT:
        raise ValueError(f"Limit must be a whole number between 1 and {MAX_LIMIT:,}.")

    primes = []
    for candidate in range(2, limit + 1):
        is_prime = True
        divisor = 2
        while divisor * divisor <= candidate:
            if candidate % divisor == 0:
                is_prime = False
                break
            divisor += 1
        if is_prime:
            primes.append(candidate)
    return primes
