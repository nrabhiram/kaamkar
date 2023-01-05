import { AddProjectForm } from '../components/addProjectForm';
import { DeleteProjectModal } from '../components/deleteProjectModal';
import { EditProjectForm } from '../components/editProjectForm';
import { Footer } from '../components/footer';
import { Mesh } from '../components/mesh';
import { NavBar } from '../components/navBar';
import { ProjectCard } from '../components/projectCard';
import { ProjectsList } from '../components/projectsList';
import { Spacer } from '../components/spacer';
import { ProjectsListController } from '../controller/projectsListController';
import { PageView } from './pageView';

type renderedProject = {
  title: string;
  description: string;
  date: string;
  progress: number;
  id: number;
};

export class ProjectsListView extends PageView {
  private static newTitle: string;
  private static editedTitle: string;
  private static newDescription: string;
  private static editedDescription: string;
  private static selectedProjectComponent: ProjectCard;
  private static selectedProject: renderedProject;
  private static adjacentProjectElement: Element | undefined;
  private static adjacentProject: renderedProject;
  private static droppedContainerElement: Element;

  constructor() {
    super();
  }

  render(
    projects: {
      title: string;
      description: string;
      date: string;
      progress: number;
      id: number;
    }[]
  ) {
    const app = document.getElementById('app');
    app!.innerHTML = '';
    new Mesh(this);
    new NavBar(this);
    new ProjectsList(this);
    projects.forEach((project) => {
      new ProjectCard('projects-container', this, project);
    });
    new Spacer(this);
    new Footer(this);
  }

  add(project: {
    title: string;
    description: string;
    date: string;
    progress: number;
    id: number;
  }) {
    new ProjectCard('projects-container', this, project);
  }

  edit() {
    ProjectsListView.selectedProjectComponent.edit(
      ProjectsListView.editedTitle,
      ProjectsListView.editedDescription
    );
  }

  delete() {
    ProjectsListView.selectedProjectComponent.delete();
  }

  arrange() {
    ProjectsListView.selectedProjectComponent.arrange(
      ProjectsListView.droppedContainerElement,
      ProjectsListView.adjacentProjectElement
    );
  }

  addTitleInput() {
    return ProjectsListView.newTitle;
  }

  addDescriptionInput() {
    return ProjectsListView.newDescription;
  }

  editTitleInput() {
    return ProjectsListView.editedTitle;
  }

  editDescriptionInput() {
    return ProjectsListView.editedDescription;
  }

  selectedProject() {
    return ProjectsListView.selectedProject;
  }

  adjacentProject() {
    return ProjectsListView.adjacentProject;
  }

  addProjectFormBtnClicked() {
    const addProjectForm = new AddProjectForm(this);
    addProjectForm.fadeIn();
  }

  editProjectFormBtnClicked(component: ProjectCard, project: renderedProject) {
    ProjectsListView.selectedProjectComponent = component;
    ProjectsListView.selectedProject = project;
    const editProjectForm = new EditProjectForm(this);
    editProjectForm.fadeIn(project.title, project.description);
  }

  deleteProjectFormBtnClicked(
    component: ProjectCard,
    project: renderedProject
  ) {
    ProjectsListView.selectedProjectComponent = component;
    ProjectsListView.selectedProject = project;
    const deleteProjectForm = new DeleteProjectModal(this);
    deleteProjectForm.fadeIn();
  }

  addProjectBtnClicked(title: string, description: string) {
    ProjectsListView.newTitle = title;
    ProjectsListView.newDescription = description;
    new ProjectsListController().add();
  }

  editProjectBtnClicked(title: string, description: string) {
    ProjectsListView.editedTitle = title;
    ProjectsListView.editedDescription = description;
    new ProjectsListController().edit();
  }

  deleteProjectBtnClicked() {
    new ProjectsListController().delete();
  }

  projectDragged(component: ProjectCard, project: renderedProject) {
    ProjectsListView.selectedProjectComponent = component;
    ProjectsListView.selectedProject = project;
  }

  projectDropped(
    project: renderedProject,
    droppedContainerEle: Element,
    adjacentProjectEle?: Element
  ) {
    ProjectsListView.adjacentProject = project;
    ProjectsListView.droppedContainerElement = droppedContainerEle;
    ProjectsListView.adjacentProjectElement = adjacentProjectEle;
    new ProjectsListController().arrange();
  }
}
