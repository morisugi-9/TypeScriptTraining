import { registeredValidators } from "../util/validation.js";

interface LengthIF {
  minLength?: number;
  maxLength?: number;
}

export function Length(len: LengthIF) {
  return function (target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: [
        ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
        `length:${len.minLength ?? 0}:${len.maxLength ?? 0}`,
      ],
    };
  };
}
