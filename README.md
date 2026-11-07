# Prime numbers: browser and server

A small teaching application using plain browser JavaScript and Node.js with Express. Both execution paths import the **same function** from `shared/primes.js`. No frontend framework or build step.

## Run

Use Node.js 20 or newer:

```sh
npm install
npm start
```

Open http://localhost:3000. Set `PORT` to use another port. `npm run dev` restarts the server when files change.

Enter an upper limit and use either button. Results stay side by side, with the limit used for each run. Up to 10,000 there are **1,229 primes**. The preview shows the first 20 primes; 1 is not prime.

## How it works

- `shared/primes.js`: checks every candidate from 2 through the upper limit, testing divisors through its square root. Exports the calculation and shared input validation.
- `public/app.js`: imports that module directly for browser execution. For server execution, sends `GET /api/primes?limit=10000` to Express.
- `server.js`: serves the page and shared module, validates API input, runs the shared function, and returns a count, preview, and calculation time.
- `public/index.html` and `public/style.css`: the interface.

Calculation time measures the shared function call, including its validation and array allocation. Server total request time includes HTTP communication and reading the response. Both use `performance.now()`; small timings and differences vary across runs and machines.

The inclusive limit must be a whole number from 1 to 1,000,000. The algorithm is deliberately simple. It runs synchronously: larger browser runs can briefly pause the page, and server runs occupy Node's event loop. This is a teaching demo for local use; a production CPU-intensive service would need a different execution strategy.

## Check

```sh
npm test
```

Tests check known prime results, boundaries, validation, and the real Express HTTP endpoint.
