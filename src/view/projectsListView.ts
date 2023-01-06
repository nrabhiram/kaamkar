import { AddProjectForm } from '../components/modals/addProjectForm';
import { DeleteProjectModal } from '../components/modals/deleteProjectModal';
import { EditProjectForm } from '../components/modals/editProjectForm';
import { Footer } from '../components/pageLayouts/footer';
import { Mesh } from '../components/pageLayouts/mesh';
import { NavBar } from '../components/pageLayouts/navBar';
import { ProjectCard } from '../components/cards/projectCard';
import { ProjectsList } from '../components/pageLayouts/projectsList';
import { Spacer } from '../components/pageLayouts/spacer';
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
  private static addProjectFormOpen = false;
  private static editProjectFormOpen = false;
  private static deleteProjectModalOpen = false;

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
    this.clear();
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
    if (!ProjectsListView.addProjectFormOpen) {
      const addProjectForm = new AddProjectForm(this);
      addProjectForm.fadeIn();
      ProjectsListView.addProjectFormOpen = true;
    }
  }

  editProjectFormBtnClicked(component: ProjectCard, project: renderedProject) {
    if (!ProjectsListView.editProjectFormOpen) {
      ProjectsListView.selectedProjectComponent = component;
      ProjectsListView.selectedProject = project;
      const editProjectForm = new EditProjectForm(this);
      editProjectForm.fadeIn(project.title, project.description);
      ProjectsListView.editProjectFormOpen = true;
    }
  }

  deleteProjectFormBtnClicked(
    component: ProjectCard,
    project: renderedProject
  ) {
    if (!ProjectsListView.deleteProjectModalOpen) {
      ProjectsListView.selectedProjectComponent = component;
      ProjectsListView.selectedProject = project;
      const deleteProjectForm = new DeleteProjectModal(this);
      deleteProjectForm.fadeIn();
      ProjectsListView.deleteProjectModalOpen = true;
    }
  }

  addProjectBtnClicked(title: string, description: string) {
    ProjectsListView.newTitle = title;
    ProjectsListView.newDescription = description;
    new ProjectsListController().add();
    this.addProjectFormClosed();
  }

  editProjectBtnClicked(title: string, description: string) {
    ProjectsListView.editedTitle = title;
    ProjectsListView.editedDescription = description;
    new ProjectsListController().edit();
    this.editProjectFormClosed();
  }

  deleteProjectBtnClicked() {
    new ProjectsListController().delete();
    this.deleteProjectModalClosed();
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

  addProjectFormClosed() {
    ProjectsListView.addProjectFormOpen = false;
  }

  editProjectFormClosed() {
    ProjectsListView.editProjectFormOpen = false;
  }

  deleteProjectModalClosed() {
    ProjectsListView.deleteProjectModalOpen = false;
  }
}
