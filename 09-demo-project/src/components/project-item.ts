import { Draggable } from "../models/drag-drop.js";
import { Component } from "./base-component.js";
import { Project } from "../models/project.js";
import { Autobind } from "../decorators/autobind.js";
import { ProjectState, projectState } from "../state/project-state.js";

// 3.project item class
export class ProjectItem
  extends Component<HTMLUListElement, HTMLElement>
  implements Draggable
{
  private project: Project;

  get manday() {
    if (this.project.manday < 20) {
      return this.project.manday + "人日";
    } else {
      return (this.project.manday / 20).toString() + "人月";
    }
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @Autobind
  dragStarthandler(event: DragEvent): void {
    // console.log('drag start:' + event);
    event.dataTransfer!.setData("text/plain", this.project.id);
    // move copy
    event.dataTransfer!.effectAllowed = "move";
  }
  @Autobind
  dragEndHandler(event: DragEvent): void {
    console.log("drag end:" + this.project.id);
  }

  configure(): void {
    this.element.draggable = true;
    this.element.addEventListener("dragstart", this.dragStarthandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }
  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.manday;
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}
