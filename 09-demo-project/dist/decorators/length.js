import { registeredValidators } from "../util/validation.js";
export function Length(len) {
    return function (target, propName) {
        var _a, _b, _c, _d;
        registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [
                ...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []),
                `length:${(_c = len.minLength) !== null && _c !== void 0 ? _c : 0}:${(_d = len.maxLength) !== null && _d !== void 0 ? _d : 0}`,
            ] });
    };
}
//# sourceMappingURL=length.js.map