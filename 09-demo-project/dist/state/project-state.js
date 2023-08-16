import { Project } from "../models/project.js";
class State {
    constructor() {
        this.listeners = [];
    }
    addListner(listnerFn) {
        this.listeners.push(listnerFn);
    }
}
export class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    addListner(listnerFn) {
        this.listeners.push(listnerFn);
    }
    addProject(title, description, manday, status) {
        const newProject = new Project(Math.random().toString(), title, description, manday, status);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(id, newStatus) {
        const project = this.projects.find((project) => project.id === id);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        this.listeners.forEach((listenerFn) => listenerFn(this.projects.slice()));
    }
}
export const projectState = ProjectState.getInstance();
//# sourceMappingURL=project-state.js.map