export const registeredValidators: Validatorconfig = {};

// Validation
interface validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

interface Validatorconfig {
  [prop: string]: {
    [validatorName: string]: string[];
  };
}

export function validate(obj: any) {
  const validaters = registeredValidators[obj.constructor.name];
  if (!validaters) {
    return true;
  }
  let isValid = true;

  for (const prop in validaters) {
    for (const validator of validaters[prop]) {
      console.log(`prop: ${prop}`);
      console.log(`obj[prop]: ${obj[prop]}`);
      console.log(`validator: ${validator}`);
      switch (validator) {
        case "required":
          isValid = isValid && obj[prop].toString().trim().length !== 0;
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
      if (validator.startsWith("length")) {
        const args = validator.split(":");
        const minLength = args[1]!;
        const maxLength = args[2]!;
        const value: string = obj[prop].toString();
        if (!minLength) {
          isValid = isValid && value.length >= +minLength;
        }
        if (!maxLength) {
          isValid = isValid && value.length <= +maxLength;
        }
      }
    }
  }
  return isValid;
}
