import { state } from '../app';
import { ProjectsList } from '../model/projectsList';
import { Parser } from '../parser';
import { Renderer } from '../renderer';

export abstract class Controller {
  static read() {
    const JSONParsedProjects = JSON.parse(
      localStorage.getItem('projects') as string
    );
    let projects: ProjectsList;
    if (JSONParsedProjects) {
      projects = new Parser().projectsList(JSONParsedProjects);
    } else {
      projects = new ProjectsList();
    }
    return projects;
  }

  protected write() {
    const renderer = new Renderer();
    const renderedProjectsList = renderer.projectsList(state.projects);
    localStorage.setItem('projects', JSON.stringify(renderedProjectsList));
  }
}
