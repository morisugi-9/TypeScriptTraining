var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Required } from "../decorators/required.js";
import { Length } from "../decorators/length.js";
import { PositiveNumber } from "../decorators/positive-number.js";
export var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["Active"] = "active";
    ProjectStatus["Finished"] = "finished";
})(ProjectStatus || (ProjectStatus = {}));
export class Project {
    constructor(id, t, des, md, status) {
        this.id = id;
        this.title = t;
        this.description = des;
        this.manday = md;
        this.status = status;
    }
}
__decorate([
    Required,
    Length({ minLength: 2 })
], Project.prototype, "title", void 0);
__decorate([
    Required
], Project.prototype, "description", void 0);
__decorate([
    PositiveNumber
], Project.prototype, "manday", void 0);
//# sourceMappingURL=project.js.map