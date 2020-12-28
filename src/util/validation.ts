export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}
export function validate(credentials: Validatable) {
  let isValid = true;
  if (credentials.required) {
    isValid = isValid && credentials.value.toString().trim().length !== 0;
  }
  if (typeof credentials.value === "string") {
    if (credentials.minLength != null) {
      isValid = isValid && credentials.value.length > credentials.minLength;
    }
    if (credentials.maxLength != null) {
      isValid = isValid && credentials.value.length < credentials.maxLength;
    }
  }
  if (typeof credentials.value === "number") {
    if (credentials.min != null) {
      isValid = isValid && credentials.value > credentials.min;
    }
    if (credentials.max != null) {
      isValid = isValid && credentials.value < credentials.max;
    }
  }
  return isValid;
}
