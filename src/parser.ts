import { Description } from './model/description';
import { Item } from './model/item';
import { ItemsList } from './model/itemsList';
import { ItemTitle } from './model/itemTitle';
import { Project } from './model/project';
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
    return new Project(
      new ProjectTitle(project.title),
      new Description(project.description),
      new ItemsList(),
      project.id
    );
  }

  item(item: {
    title: string;
    description: string;
    status: Category;
    id: number;
  }) {
    return new Item(
      new ItemTitle(item.title),
      new Description(item.description),
      new Status(item.status),
      item.id
    );
  }
}
