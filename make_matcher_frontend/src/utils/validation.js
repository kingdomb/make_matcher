export function isEmail(value) {
  return value.includes('@');
}

export function isNotEmpty(value) {
  return value.trim() !== '';
}

export function hasMinLength(value, minLength, maxLength) {
  return value.length >= minLength && value.length <= maxLength;
}

export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}

export function isZipCode(value, minLength) {
  return value.length === minLength && /^\d+$/.test(value);
}
