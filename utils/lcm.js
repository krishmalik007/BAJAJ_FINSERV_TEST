function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function lcmTwo(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}

function lcmArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0)
    throw new Error("LCM requires non-empty array");

  if (!arr.every(Number.isInteger))
    throw new Error("LCM array must contain integers");

  return arr.reduce((acc, val) => lcmTwo(acc, val));
}

module.exports = lcmArray;
