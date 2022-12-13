import { Description } from './description';
import { ItemsList } from './itemsList';
import { Project } from './project';
import { ProjectTitle } from './projectTitle';

export class ProjectsList {
  projects: Project[] = [];
  private _projectsCreated: number;

  constructor(projects?: Project[]) {
    let highestId = 0;
    if (projects && projects.length > 0) {
      this.projects = projects;
      for (let i = 0; i < projects.length; i++) {
        if (projects[i].id > highestId) {
          highestId = projects[i].id;
        }
      }
      this._projectsCreated = highestId + 1;
    } else {
      this.projects = [];
      this._projectsCreated = 0;
    }
  }

  add(title: ProjectTitle, description: Description) {
    const newProject = new Project(
      title,
      description,
      new ItemsList(),
      this._projectsCreated
    );
    this.projects.push(newProject);
    this._projectsCreated++;
    return newProject;
  }

  delete(project: Project) {
    const projects: Project[] = [];
    for (let i = 0; i < this.projects.length; i++) {
      if (project.id !== this.projects[i].id) {
        projects.push(this.projects[i]);
      }
    }
    this.projects = projects;
  }

  edit(project: Project, title: ProjectTitle, description: Description) {
    for (let i = 0; i < this.projects.length; i++) {
      if (project.id === this.projects[i].id) {
        this.projects[i].update(title, description);
        return;
      }
    }
  }
}
