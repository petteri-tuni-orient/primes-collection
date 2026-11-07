#ifndef PRIMES_H
#define PRIMES_H

#include <stddef.h>

#define MAX_LIMIT 1000000

typedef struct {
    int *values;
    size_t count;
} PrimeResult;

/* Inclusive range. Returns 0 on success, -1 for invalid input or allocation
 * failure. On success, the caller must free(result->values). */
int find_primes(int limit, PrimeResult *result);

#endif
