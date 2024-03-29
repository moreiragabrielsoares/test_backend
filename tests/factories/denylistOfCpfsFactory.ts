function createNewValidCpf() {
  let newValidCpf = '';

  const cpfFirstNineDigits = Math.random().toString().slice(2, 11);

  const correctFirstCheckDigit = calculateFirstCheckDigit(cpfFirstNineDigits).toString();

  const cpfFirstTenDigits = cpfFirstNineDigits + correctFirstCheckDigit;

  const correctSecondCheckDigit = calculateSecondCheckDigit(cpfFirstTenDigits).toString();
  newValidCpf = cpfFirstTenDigits + correctSecondCheckDigit;

  return newValidCpf;
}

//Esta função irá gerar sempre um CPF com o primeiro dígito de verificação errado
function createNewInvalidCpf() {
  let newInvalidCpf = '';

  const cpfFirstNineDigits = Math.random().toString().slice(2, 11);
  const correctFirstCheckDigit = calculateFirstCheckDigit(cpfFirstNineDigits);

  let incorrectFirstCheckDigit: number;
  if (correctFirstCheckDigit === 9) {
    incorrectFirstCheckDigit = correctFirstCheckDigit - 1;
  } else {
    incorrectFirstCheckDigit = correctFirstCheckDigit + 1;
  }

  const cpfFirstTenDigits = cpfFirstNineDigits + incorrectFirstCheckDigit.toString();

  const correctSecondCheckDigit = calculateSecondCheckDigit(cpfFirstTenDigits).toString();
  newInvalidCpf = cpfFirstTenDigits + correctSecondCheckDigit;

  return newInvalidCpf;
}

function calculateFirstCheckDigit(cpfFirstNineDigits: string) {
  const weightedSum = calculateWeightedSum(cpfFirstNineDigits);
  const referenceRemainder = calculateRemainder(weightedSum);
  const correctFirstCheckDigit = calculateCheckDigit(referenceRemainder);
  return correctFirstCheckDigit;
}

function calculateSecondCheckDigit(cpfFirstTenDigits: string) {
  const weightedSum = calculateWeightedSum(cpfFirstTenDigits);
  const referenceRemainder = calculateRemainder(weightedSum);
  const correctSecondCheckDigit = calculateCheckDigit(referenceRemainder);
  return correctSecondCheckDigit;
}

function calculateWeightedSum(cpfDigits: string) {
  let weightedSum = 0;
  let multiplier = 2;
  for (let i = cpfDigits.length - 1; i >= 0; i--) {
    const digit = parseInt(cpfDigits[i]);
    weightedSum += digit * multiplier;
    multiplier++;
  }

  return weightedSum;
}

function calculateRemainder(weightedSum: number) {
  return weightedSum % 11;
}

function calculateCheckDigit(referenceRemainder: number) {
  let checkDigit: number;

  if (referenceRemainder < 2) {
    checkDigit = 0;
  } else {
    checkDigit = 11 - referenceRemainder;
  }

  return checkDigit;
}

export { createNewValidCpf, createNewInvalidCpf };
