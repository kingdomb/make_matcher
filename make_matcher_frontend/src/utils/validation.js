export function isEmail(value) {
  return value.includes('@');
}

export function isNotEmpty(value) {
  return value.trim() !== '';
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function isEqualsToOtherValue(value, otherValue) {
  console.log('Comparing values:', value, otherValue);
  return value === otherValue;
}

export function isZipCode(value, minLength) {
  return value.length === 5 && value.match(/^\d+$/);
}
