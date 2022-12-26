import { Parser } from '../parser';
import { Project } from '../model/project';
import { ProjectView } from '../view/projectView';
import { Renderer } from '../renderer';
import { Category, Status } from '../model/status';
import { Controller } from './controller';

export class ProjectController extends Controller {
  project: Project;

  constructor(project: Project) {
    super();
    this.project = project;
  }

  add() {
    const view = new ProjectView();
    const parser = new Parser();
    const renderer = new Renderer();
    const titleInput = view.addTitleInput();
    const descriptionInput = view.addDescriptionInput();
    const itemTitle = parser.itemTitle(titleInput);
    const itemDescription = parser.description(descriptionInput);
    const itemStatus = new Status(Category.TODO);
    const newItem = this.project.add(itemTitle, itemDescription, itemStatus);
    const renderedNewItem = renderer.item(newItem);
    this.write();
    view.add(renderedNewItem);
  }

  edit() {
    const view = new ProjectView();
    const parser = new Parser();
    const itemInput = view.selectedItem();
    const titleInput = view.editTitleInput();
    const descriptionInput = view.editDescriptionInput();
    const statusInput = view.editStatusInput();
    const item = parser.item(itemInput);
    const itemTitle = parser.itemTitle(titleInput);
    const itemDescription = parser.description(descriptionInput);
    const itemStatus = parser.status(statusInput);
    if (item) {
      this.project.edit(item, itemTitle, itemDescription, itemStatus);
    }
    this.write();
    view.edit();
  }

  delete() {
    const view = new ProjectView();
    const parser = new Parser();
    const itemInput = view.selectedItem();
    const item = parser.item(itemInput);
    if (item) {
      this.project.delete(item);
    }
    this.write();
    view.delete();
  }

  arrange() {
    const view = new ProjectView();
    const parser = new Parser();
    const selectedItemInput = view.selectedItem();
    const adjacentItemInput = view.adjacentItem();
    const selectedItemContainerStatusInput =
      view.selectedItemContainerCategory();
    const selectedItem = parser.item(selectedItemInput);
    const adjacentItem = parser.item(adjacentItemInput);
    const selectedItemContainerStatus = parser.status(
      selectedItemContainerStatusInput
    );
    if (selectedItem) {
      this.project.arrange(
        selectedItem,
        selectedItemContainerStatus,
        adjacentItem
      );
    }
    this.write();
    view.arrange();
  }
}
