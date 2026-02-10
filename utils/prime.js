function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function filterPrimes(arr) {
  if (!Array.isArray(arr) || arr.length === 0)
    throw new Error("Prime requires non-empty array");

  if (!arr.every(Number.isInteger))
    throw new Error("Prime array must contain integers");

  return arr.filter(isPrime);
}

module.exports = filterPrimes;
