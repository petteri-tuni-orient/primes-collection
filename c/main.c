#define _POSIX_C_SOURCE 200809L

#include "primes.h"

#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

static void usage(const char *program)
{
    printf("Usage: %s [limit]\n"
           "Find primes from 1 through limit (default: 10000).\n"
           "Limit must be a whole number between 1 and %d.\n", program, MAX_LIMIT);
}

int main(int argc, char **argv)
{
    if (argc == 2 && (strcmp(argv[1], "--help") == 0 || strcmp(argv[1], "-h") == 0)) {
        usage(argv[0]);
        return EXIT_SUCCESS;
    }
    if (argc > 2) {
        fprintf(stderr, "Error: expected at most one upper limit.\n");
        return EXIT_FAILURE;
    }

    int limit = 10000;
    if (argc == 2) {
        char *end;
        errno = 0;
        long parsed = strtol(argv[1], &end, 10);
        if (errno == ERANGE || end == argv[1] || *end != '\0' ||
            parsed < 1 || parsed > MAX_LIMIT) {
            fprintf(stderr, "Error: limit must be a whole number between 1 and %d.\n", MAX_LIMIT);
            return EXIT_FAILURE;
        }
        limit = (int)parsed;
    }

    struct timespec start, finish;
    if (clock_gettime(CLOCK_MONOTONIC, &start) != 0) {
        perror("Could not start timer");
        return EXIT_FAILURE;
    }
    PrimeResult result;
    if (find_primes(limit, &result) != 0) {
        fprintf(stderr, "Error: could not allocate memory for the calculation.\n");
        return EXIT_FAILURE;
    }
    if (clock_gettime(CLOCK_MONOTONIC, &finish) != 0) {
        perror("Could not stop timer");
        free(result.values);
        return EXIT_FAILURE;
    }
    double elapsed_ms = (double)(finish.tv_sec - start.tv_sec) * 1000.0
        + (double)(finish.tv_nsec - start.tv_nsec) / 1000000.0;

    printf("Range: 1 to %d\n", limit);
    printf("Primes found: %zu\n", result.count);
    printf("Calculation time: %.3f ms\n", elapsed_ms);
    size_t preview_count = result.count < 20 ? result.count : 20;
    if (preview_count > 0) {
        printf("First %zu primes: ", preview_count);
        for (size_t i = 0; i < preview_count; i++) {
            printf("%s%d", i == 0 ? "" : ", ", result.values[i]);
        }
        putchar('\n');
    } else {
        puts("No primes in this range. 1 is not prime.");
    }
    free(result.values);
    return EXIT_SUCCESS;
}
