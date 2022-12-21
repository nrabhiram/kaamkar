import { Parser } from '../parser';
import { ProjectsList } from '../model/projectsList';
import { ProjectsListView } from '../view/projectsListView';
import { Renderer } from '../renderer';
import { Controller } from './controller';

export class ProjectsListController extends Controller {
  projects: ProjectsList;

  constructor(projects: ProjectsList) {
    super();
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
    this.projects.edit(project, editedProjectTitle, editedProjectDescription);
    this.write();
    view.edit();
  }

  delete() {
    const view = new ProjectsListView();
    const parser = new Parser();
    const projectInput = view.selectedProject();
    const project = parser.project(projectInput);
    this.projects.delete(project);
    this.write();
    view.delete();
  }
}
