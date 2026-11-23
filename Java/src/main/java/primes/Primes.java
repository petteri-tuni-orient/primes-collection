package primes;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public final class Primes {
    public static final int MAX_LIMIT = 1_000_000;

    private Primes() {
    }

    /** Returns every prime from 2 through the inclusive limit. */
    public static List<Integer> findPrimes(int limit) {
        if (limit < 1 || limit > MAX_LIMIT) {
            throw new IllegalArgumentException(
                    String.format(Locale.ROOT, "Limit must be between 1 and %,d.", MAX_LIMIT));
        }

        List<Integer> primes = new ArrayList<>();
        for (int candidate = 2; candidate <= limit; candidate++) {
            boolean isPrime = true;
            for (int divisor = 2; divisor * divisor <= candidate; divisor++) {
                if (candidate % divisor == 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime) {
                primes.add(candidate);
            }
        }
        return primes;
    }
}
