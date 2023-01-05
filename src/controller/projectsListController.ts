import { Parser } from '../parser';
import { ProjectsList } from '../model/projectsList';
import { ProjectsListView } from '../view/projectsListView';
import { Renderer } from '../renderer';
import { Controller } from './controller';
import { state } from '../app';

export class ProjectsListController extends Controller {
  projects: ProjectsList;

  constructor() {
    super();
    this.projects = state.projects;
  }

  add() {
    const view = new ProjectsListView();
    const parser = new Parser();
    const renderer = new Renderer();
    const titleInput = view.addTitleInput();
    const descriptionInput = view.addDescriptionInput();
    const projectTitle = parser.projectTitle(titleInput);
    const projectDescription = parser.description(descriptionInput);
    const newProject = this.projects.add(projectTitle, projectDescription);
    const renderedNewProject = renderer.project(newProject);
    this.write();
    view.add(renderedNewProject);
  }

  edit() {
    const view = new ProjectsListView();
    const parser = new Parser();
    const projectInput = view.selectedProject();
    const titleInput = view.editTitleInput();
    const descriptionInput = view.editDescriptionInput();
    const project = parser.project(projectInput);
    const editedProjectTitle = parser.projectTitle(titleInput);
    const editedProjectDescription = parser.description(descriptionInput);
    if (project) {
      this.projects.edit(project, editedProjectTitle, editedProjectDescription);
    }
    this.write();
    view.edit();
  }

  delete() {
    const view = new ProjectsListView();
    const parser = new Parser();
    const projectInput = view.selectedProject();
    const project = parser.project(projectInput);
    if (project) {
      this.projects.delete(project);
    }
    this.write();
    view.delete();
  }

  arrange() {
    const view = new ProjectsListView();
    const parser = new Parser();
    const selectedProjectInput = view.selectedProject();
    const adjacentProjectInput = view.adjacentProject();
    const selectedProject = parser.project(selectedProjectInput);
    const adjacentProject = parser.project(adjacentProjectInput);
    if (selectedProject) {
      this.projects.arrange(selectedProject, adjacentProject);
    }
    this.write();
    view.arrange();
  }
}
