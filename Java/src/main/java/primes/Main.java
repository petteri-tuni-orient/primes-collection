package primes;

import java.math.BigInteger;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

public final class Main {
    private static final int DEFAULT_LIMIT = 10_000;
    private static final int PREVIEW_SIZE = 20;
    private static final String USAGE = "Usage: java -jar target/primes-1.0.0.jar [-h] [limit]";

    private Main() {
    }

    public static void main(String[] args) {
        if (args.length == 1 && ("-h".equals(args[0]) || "--help".equals(args[0]))) {
            System.out.println(USAGE);
            System.out.println("Find prime numbers using trial division.");
            System.out.printf(Locale.ROOT, "  limit  Inclusive upper limit, 1–%,d (default: %,d)%n",
                    Primes.MAX_LIMIT, DEFAULT_LIMIT);
            return;
        }

        int limit;
        try {
            limit = parseLimit(args);
        } catch (IllegalArgumentException error) {
            System.err.println(USAGE);
            System.err.println("Error: " + error.getMessage());
            System.exit(2);
            return;
        }

        long start = System.nanoTime();
        List<Integer> primes = Primes.findPrimes(limit);
        double elapsedMs = (System.nanoTime() - start) / 1_000_000.0;

        System.out.printf(Locale.ROOT, "Range: 1 to %,d%n", limit);
        System.out.printf(Locale.ROOT, "Primes found: %,d%n", primes.size());
        System.out.printf(Locale.ROOT, "Calculation time: %.3f ms%n", elapsedMs);
        if (primes.isEmpty()) {
            System.out.println("No primes in this range. 1 is not prime.");
        } else {
            int previewSize = Math.min(PREVIEW_SIZE, primes.size());
            String preview = primes.subList(0, previewSize).stream()
                    .map(String::valueOf)
                    .collect(Collectors.joining(", "));
            System.out.printf(Locale.ROOT, "First %d primes: %s%n", previewSize, preview);
        }
    }

    private static int parseLimit(String[] args) {
        if (args.length == 0) {
            return DEFAULT_LIMIT;
        }
        if (args.length != 1) {
            throw new IllegalArgumentException("Expected at most one limit.");
        }

        BigInteger limit;
        try {
            limit = new BigInteger(args[0].strip());
        } catch (NumberFormatException error) {
            throw new IllegalArgumentException("Limit must be a whole number.");
        }
        if (limit.signum() <= 0 || limit.compareTo(BigInteger.valueOf(Primes.MAX_LIMIT)) > 0) {
            throw new IllegalArgumentException(
                    String.format(Locale.ROOT, "Limit must be between 1 and %,d.", Primes.MAX_LIMIT));
        }
        return limit.intValueExact();
    }
}
