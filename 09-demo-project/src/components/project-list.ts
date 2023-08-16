import { Component } from "./base-component.js";
import { DragTarget } from "../models/drag-drop.js";
import { Project } from "../models/project.js";
import { ProjectStatus } from "../models/project.js";
import { ProjectState, projectState } from "../state/project-state.js";
import { ProjectItem } from "./project-item.js";
import { Autobind } from "../decorators/autobind.js";

// 2. project list class
export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];

  constructor(private type: ProjectStatus) {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  @Autobind
  dragOverhandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      // drag & drop を許可
      // dropeventは下記を実施している要素にのみトリガーされる
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }
  @Autobind
  dropHandler(event: DragEvent): void {
    // console.log("dropHandler:" + event.dataTransfer!.getData('text/plain'));
    const prjId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(prjId, this.type);
  }

  @Autobind
  dragLeaveHandler(event: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverhandler);
    this.element.addEventListener("drop", this.dropHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);

    projectState.addListner((projects: Project[]) => {
      const relevantProject = projects.filter(
        (project) => project.status === this.type
      );
      this.assignedProjects = relevantProject;
      this.renderProjects();
    });
  }
  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type === ProjectStatus.Active
        ? "実行中プロジェクト"
        : "完了プロジェクト";
  }
  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    ) as HTMLElement;
    // console.log(`${this.type}-projects-list`);
    // console.log(listEl);

    listEl.innerHTML = "";
    for (const prjItem of this.assignedProjects) {
      console.log(prjItem);
      // const listItem = document.createElement("li") as HTMLLIElement;
      // listItem.textContent = prjItem.title;
      // listEl.appendChild(listItem);

      new ProjectItem(listEl.id, prjItem);
    }
  }
}
