import { Component } from "./base-component.js";
import { validate } from "../util/validation.js";
import { Project, ProjectStatus } from "../models/project.js";
import { ProjectState, projectState } from "../state/project-state.js";
import { Autobind } from "../decorators/autobind.js";

// 1. project input class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  mandayInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.mandayInputElement = this.element.querySelector(
      "#manday"
    ) as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
  renderContent() {}

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredManday = this.mandayInputElement.value;
    const project = new Project(
      Math.random().toString(),
      enteredTitle,
      enteredDescription,
      +enteredManday,
      ProjectStatus.Active
    );
    if (!validate(project)) {
      alert("入力値が正しくありません。再度試してください。");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredManday];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.mandayInputElement.value = "";
  }

  @Autobind
  private submitHandler(event: Event) {
    // このformからHTTPリクエストが送られないようにする
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, manday] = userInput;
      projectState.addProject(title, desc, manday, ProjectStatus.Active);
      this.clearInputs();
    }
  }
}
