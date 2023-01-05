import { Description } from './model/description';
import { Item } from './model/item';
import { ItemsList } from './model/itemsList';
import { ItemTitle } from './model/itemTitle';
import { Project } from './model/project';
import { ProjectsList } from './model/projectsList';
import { ProjectTitle } from './model/projectTitle';
import { Category, Status } from './model/status';

export class Parser {
  projectTitle(title: string) {
    return new ProjectTitle(title);
  }

  itemTitle(title: string) {
    return new ItemTitle(title);
  }

  description(description: string) {
    return new Description(description);
  }

  status(status: Category) {
    return new Status(status);
  }

  project(project: { title: string; description: string; id: number }) {
    if (project.id !== -1) {
      return new Project(
        new ProjectTitle(project.title),
        new Description(project.description),
        new ItemsList(),
        project.id
      );
    } else {
      return;
    }
  }

  item(item: {
    title: string;
    description: string;
    status: Category;
    id: number;
  }) {
    if (item.id !== -1) {
      return new Item(
        new ItemTitle(item.title),
        new Description(item.description),
        new Status(item.status),
        item.id
      );
    } else {
      return;
    }
  }

  projectsList(
    projects: {
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
    }[]
  ) {
    const projectsArr: Project[] = [];
    for (let i = 0; i < projects.length; i++) {
      const projectTitle = this.projectTitle(projects[i].title);
      const projectDescription = this.description(projects[i].description);
      const projectDate = new Date(projects[i].date);
      const projectId = projects[i].id;
      const projectItemsArr: Item[] = [];
      for (let j = 0; j < projects[i].items.length; j++) {
        const itemTitle = this.itemTitle(projects[i].items[j].title);
        const itemDescription = this.description(
          projects[i].items[j].description
        );
        const itemStatus = this.status(projects[i].items[j].status);
        const itemId = projects[i].items[j].id;
        const item = new Item(itemTitle, itemDescription, itemStatus, itemId);
        projectItemsArr.push(item);
      }
      const itemsList = new ItemsList(projectItemsArr);
      const project = new Project(
        projectTitle,
        projectDescription,
        itemsList,
        projectId,
        projectDate
      );
      projectsArr.push(project);
    }
    const projectsList = new ProjectsList(projectsArr);
    return projectsList;
  }
}
