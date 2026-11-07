CC = cc
CFLAGS = -O3 -std=c11 -Wall -Wextra -Wpedantic

.PHONY: all clean
all: primes

primes: main.c primes.c primes.h
	$(CC) $(CFLAGS) main.c primes.c -o primes

clean:
	rm -f primes
