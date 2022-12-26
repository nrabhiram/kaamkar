import { Item } from './model/item';
import { ItemsList } from './model/itemsList';
import { Project } from './model/project';
import { ProjectsList } from './model/projectsList';
import { ProjectTitle } from './model/projectTitle';
import { Category } from './model/status';
import { months } from './utils';

export class Renderer {
  project(project: Project) {
    return {
      title: project.title.text,
      description: project.description.text,
      date: this.date(project.date),
      progress: project.progress(),
      id: project.id
    };
  }

  projects(projects: ProjectsList) {
    const renderedProjects: {
      title: string;
      description: string;
      date: string;
      progress: number;
      id: number;
    }[] = [];
    for (let i = 0; i < projects.projects.length; i++) {
      const renderedProject = this.project(projects.projects[i]);
      renderedProjects.push(renderedProject);
    }
    return renderedProjects;
  }

  fullProject(project: Project) {
    return {
      title: project.title.text,
      description: project.description.text,
      date: this.date(project.date),
      progress: project.progress(),
      items: this.items(project.items),
      id: project.id
    };
  }

  projectsList(projects: ProjectsList) {
    const renderedProjects: {
      title: string;
      description: string;
      date: string;
      progress: number;
      items: {
        title: string;
        description: string;
        status: Category;
        id: number;
      }[];
      id: number;
    }[] = [];
    for (let i = 0; i < projects.projects.length; i++) {
      const renderedProject = this.fullProject(projects.projects[i]);
      renderedProjects.push(renderedProject);
    }
    return renderedProjects;
  }

  projectTitle(title: ProjectTitle) {
    return title.text;
  }

  item(item: Item) {
    return {
      title: item.title.text,
      description: item.description.text,
      status: item.status.category,
      id: item.id
    };
  }

  items(items: ItemsList) {
    const renderedItems: {
      title: string;
      description: string;
      status: Category;
      id: number;
    }[] = [];
    for (let i = 0; i < items.items().length; i++) {
      const renderedItem = this.item(items.items()[i]);
      renderedItems.push(renderedItem);
    }
    return renderedItems;
  }

  private date(date: Date) {
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }
}
