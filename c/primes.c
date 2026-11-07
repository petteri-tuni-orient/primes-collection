#include "primes.h"

#include <stdbool.h>
#include <stdlib.h>

int find_primes(int limit, PrimeResult *result)
{
    if (result == NULL) {
        return -1;
    }
    result->values = NULL;
    result->count = 0;
    if (limit < 1 || limit > MAX_LIMIT) {
        return -1;
    }

    /* Reserve enough space for every candidate; only primes are stored. */
    int *values = malloc((size_t)limit * sizeof(*values));
    if (values == NULL) {
        return -1;
    }
    size_t count = 0;
    for (int candidate = 2; candidate <= limit; candidate++) {
        bool is_prime = true;
        /* MAX_LIMIT keeps divisor * divisor safely within int range. */
        for (int divisor = 2; divisor * divisor <= candidate; divisor++) {
            if (candidate % divisor == 0) {
                is_prime = false;
                break;
            }
        }
        if (is_prime) {
            values[count++] = candidate;
        }
    }
    result->values = values;
    result->count = count;
    return 0;
}
