const assert = require('node:assert/strict');
const { calculateCharge } = require('../public/billing.js');

const cases = [
  ['carro', 0, 10], ['carro', 15, 15], ['carro', 29, 15],
  ['carro', 30, 20], ['carro', 59, 20], ['carro', 60, 20], ['carro', 105, 30],
  ['moto', 0, 8], ['moto', 15, 12], ['moto', 29, 12],
  ['moto', 30, 16], ['moto', 59, 16], ['moto', 60, 16], ['moto', 105, 24]
];

for (const [vehicleType, minutes, expected] of cases) {
  const actual = calculateCharge(vehicleType, minutes);
  assert.equal(actual, expected, `${vehicleType} ${minutes} min: esperado R$ ${expected}, recebido R$ ${actual}`);
}

assert.equal(calculateCharge('car', 15, 10.005, 10.005), 15.01, 'arredondamento em centavos');
console.log(`OK: ${cases.length + 1} cenários de cobrança passaram.`);
