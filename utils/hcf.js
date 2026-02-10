function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function hcfArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0)
    throw new Error("HCF requires non-empty array");

  if (!arr.every(Number.isInteger))
    throw new Error("HCF array must contain integers");

  return arr.reduce((acc, val) => gcd(acc, val));
}

module.exports = hcfArray;
