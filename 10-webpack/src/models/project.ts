import { Required } from "../decorators/required";
import { Length } from "../decorators/length";
import { PositiveNumber } from "../decorators/positive-number";

export enum ProjectStatus {
  Active = "active",
  Finished = "finished",
}

export class Project {
  id: string;
  @Required
  @Length({ minLength: 2 })
  title: string;
  @Required
  description: string;
  @PositiveNumber
  manday: number;
  status: ProjectStatus;
  constructor(
    id: string,
    t: string,
    des: string,
    md: number,
    status: ProjectStatus
  ) {
    this.id = id;
    this.title = t;
    this.description = des;
    this.manday = md;
    this.status = status;
  }
}
