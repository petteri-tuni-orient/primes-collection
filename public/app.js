import { findPrimes, validateLimit } from '/shared/primes.js';

const input = document.querySelector('#limit');
const status = document.querySelector('#status');
const buttons = [...document.querySelectorAll('button')];
const formatTime = (ms) => `${ms.toFixed(3)} ms`;

function render(target, result, totalMs) {
  const container = document.querySelector(`#${target}-result`);
  container.replaceChildren();
  const add = (tag, text, className) => {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) element.className = className;
    container.append(element);
  };
  add('p', result.count.toLocaleString(), 'count');
  add('p', `primes found from 1 to ${result.limit.toLocaleString()}`);
  add('p', `Calculation: ${formatTime(result.elapsedMs)}`, 'timing');
  if (totalMs !== undefined) add('p', `Total request: ${formatTime(totalMs)}`, 'timing');
  add('h3', `First ${result.preview.length} primes`);
  add('p', result.preview.length ? result.preview.join(', ') : 'No primes in this range.', 'primes');
}

async function run(target) {
  const limit = input.valueAsNumber;
  try {
    validateLimit(limit);
  } catch (error) {
    status.textContent = error.message;
    input.focus();
    return;
  }
  buttons.forEach((button) => { button.disabled = true; });
  status.textContent = `Calculating ${target === 'browser' ? 'in the browser' : 'on the server'}…`;
  try {
    // Allow the pending status to paint before the synchronous calculation.
    await new Promise((resolve) => setTimeout(resolve, 30));
    const start = performance.now();
    if (target === 'browser') {
      const primes = findPrimes(limit);
      const elapsedMs = performance.now() - start;
      render(target, { limit, count: primes.length, elapsedMs, preview: primes.slice(0, 20) });
    } else {
      const response = await fetch(`/api/primes?limit=${limit}`, { cache: 'no-store' });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'The server request failed.');
      render(target, result, performance.now() - start);
    }
    status.textContent = 'Calculation complete.';
  } catch (error) {
    status.textContent = `Could not complete the calculation: ${error.message}`;
  } finally {
    buttons.forEach((button) => { button.disabled = false; });
  }
}

document.querySelector('#browser-run').addEventListener('click', () => run('browser'));
document.querySelector('#server-run').addEventListener('click', () => run('server'));
