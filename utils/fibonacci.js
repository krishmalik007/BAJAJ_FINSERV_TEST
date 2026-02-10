function fibonacci(n) {
  if (!Number.isInteger(n) || n < 0)
    throw new Error("Fibonacci must be a non-negative integer");

  const result = [];
  let a = 0, b = 1;

  for (let i = 0; i < n; i++) {
    result.push(a);
    [a, b] = [b, a + b];
  }

  return result;
}

module.exports = fibonacci;
