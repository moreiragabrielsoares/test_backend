function isCpfValid(cpf: string) {
  if (!isFormatValid(cpf)) {
    return false;
  }

  if (isKnownInvalidValue(cpf)) {
    return false;
  }

  const cpfFirstNineDigits = cpf.slice(0, 9);
  const cpfFirstCheckDigit = parseInt(cpf[9]);
  const correctFirstCheckDigit = calculateFirstCheckDigit(cpfFirstNineDigits);

  if (cpfFirstCheckDigit !== correctFirstCheckDigit) {
    return false;
  }

  const cpfFirstTenDigits = cpf.slice(0, 10);
  const cpfSecondCheckDigit = parseInt(cpf[10]);
  const correctSecondCheckDigit = calculateSecondCheckDigit(cpfFirstTenDigits);

  if (cpfSecondCheckDigit !== correctSecondCheckDigit) {
    return false;
  }

  return true;
}

function isFormatValid(cpf: string) {
  const cpfRGEX = /(^[0-9]{11}$)/;

  return cpfRGEX.test(cpf);
}

function isKnownInvalidValue(cpf: string) {
  return (
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999' ||
    cpf === '00000000000'
  );
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

export { isCpfValid };
