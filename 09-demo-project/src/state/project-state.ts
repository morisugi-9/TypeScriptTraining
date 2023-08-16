import { Project } from "../models/project.js";
import { ProjectStatus } from "../models/project.js";

// project state management
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];
  constructor() {}
  addListner(listnerFn: Listener<T>) {
    this.listeners.push(listnerFn);
  }
}
// singleton object
export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListner(listnerFn: Listener<Project>) {
    this.listeners.push(listnerFn);
  }

  addProject(
    title: string,
    description: string,
    manday: number,
    status: ProjectStatus
  ) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      manday,
      status
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(id: string, newStatus: ProjectStatus) {
    const project = this.projects.find((project) => project.id === id);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    this.listeners.forEach((listenerFn) => listenerFn(this.projects.slice()));
  }
}
export const projectState = ProjectState.getInstance();
