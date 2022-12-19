import { Parser } from '../parser';
import { ProjectsList } from '../model/projectsList';
import { ProjectsListView } from '../view/projectsListView';
import { Renderer } from '../renderer';

export class ProjectsListController {
  projects: ProjectsList;

  constructor(projects: ProjectsList) {
    this.projects = projects;
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
    this.projects.edit(project, editedProjectTitle, editedProjectDescription);
    view.edit();
  }

  delete() {
    const view = new ProjectsListView();
    const parser = new Parser();
    const projectInput = view.selectedProject();
    const project = parser.project(projectInput);
    this.projects.delete(project);
    view.delete();
  }
}
