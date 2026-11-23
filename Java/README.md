# Java prime-number demo

Requires JDK 25 and Maven. From the `Java` directory:

```sh
mvn package
java -jar target/primes-1.0.0.jar          # Default limit: 10,000
java -jar target/primes-1.0.0.jar 100000   # Choose an inclusive upper limit
java -jar target/primes-1.0.0.jar --help
```

`Main.java` handles command-line arguments, timing, and output. `Primes.java`
finds primes by testing divisors up to each candidate's square root.

The limit can be any integer from 1 through 1,000,000. The program reports the
prime count, calculation time in milliseconds, and up to the first 20 primes.
