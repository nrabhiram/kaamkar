import { PageView } from './pageView';
import { Category } from '../model/status';
import { DeleteItemModal } from '../components/deleteItemModal';
import { AddItemForm } from '../components/addItemForm';
import { EditItemForm } from '../components/editItemForm';
import { Project } from '../components/project';
import { Item } from '../components/item';
import { ProjectController } from '../controller/projectController';
import { Mesh } from '../components/mesh';
import { NavBar } from '../components/navBar';
import { Spacer } from '../components/spacer';
import { Footer } from '../components/footer';

type renderedItem = {
  title: string;
  description: string;
  status: Category;
  id: number;
};

export class ProjectView extends PageView {
  private static newTitle: string;
  private static editedTitle: string;
  private static newDescription: string;
  private static editedDescription: string;
  private static editedCategory: Category;
  private static selectedItemComponent: Item;
  private static selectedItem: renderedItem;
  private static adjacentItemElement: Element | undefined;
  private static adjacentItem: renderedItem;
  private static droppedContainerEle: Element;
  private static droppedContainerStatus: Category;

  constructor() {
    super();
  }

  private itemContainerId(status: Category) {
    switch (status) {
      case Category.TODO:
        return 'to-do-items-container';
      case Category.PROGRESS:
        return 'progress-items-container';
      case Category.COMPLETED:
        return 'complete-items-container';
      default:
        return 'to-do-items-container';
    }
  }

  render(
    title: string,
    toDoItems: renderedItem[],
    progressItems: renderedItem[],
    completeItems: renderedItem[]
  ) {
    const app = document.getElementById('app');
    app!.innerHTML = '';
    new Mesh(this);
    new NavBar(this);
    new Project(title, this);
    const items = [...toDoItems, ...progressItems, ...completeItems];
    items.forEach((item) => {
      const itemContainerId = this.itemContainerId(item.status);
      new Item(itemContainerId, this, item);
    });
    new Spacer(this);
    new Footer(this);
  }

  add(item: {
    title: string;
    description: string;
    status: Category;
    id: number;
  }) {
    const itemContainerId = this.itemContainerId(item.status);
    new Item(itemContainerId, this, item);
  }

  edit() {
    ProjectView.selectedItemComponent.edit(
      ProjectView.editedTitle,
      ProjectView.editedDescription,
      ProjectView.editedCategory
    );
  }

  arrange() {
    ProjectView.selectedItemComponent.arrange(
      ProjectView.droppedContainerEle,
      ProjectView.droppedContainerStatus,
      ProjectView.adjacentItemElement
    );
  }

  delete() {
    document.getElementById(`item-${ProjectView.selectedItem['id']}`)?.remove();
    ProjectView.selectedItemComponent.delete();
  }

  addTitleInput() {
    return ProjectView.newTitle;
  }

  addDescriptionInput() {
    return ProjectView.newDescription;
  }

  editTitleInput() {
    return ProjectView.editedTitle;
  }

  editDescriptionInput() {
    return ProjectView.editedDescription;
  }

  editStatusInput() {
    return ProjectView.editedCategory;
  }

  selectedItem() {
    return ProjectView.selectedItem;
  }

  selectedItemContainerCategory() {
    return ProjectView.droppedContainerStatus;
  }

  adjacentItem() {
    return ProjectView.adjacentItem;
  }

  addItemFormBtnClicked() {
    const addItemForm = new AddItemForm(this);
    addItemForm.fadeIn();
  }

  editItemFormBtnClicked(component: Item, item: renderedItem) {
    ProjectView.selectedItemComponent = component;
    ProjectView.selectedItem = item;
    const editItemForm = new EditItemForm(this);
    editItemForm.fadeIn(item.title, item.description, item.status);
  }

  deleteItemFormBtnClicked(component: Item, item: renderedItem) {
    ProjectView.selectedItemComponent = component;
    ProjectView.selectedItem = item;
    const deleteItemModal = new DeleteItemModal(this);
    deleteItemModal.fadeIn();
  }

  addItemBtnClicked(title: string, description: string) {
    ProjectView.newTitle = title;
    ProjectView.newDescription = description;
    new ProjectController().add();
  }

  editItemBtnClicked(title: string, description: string, category: Category) {
    ProjectView.editedTitle = title;
    ProjectView.editedDescription = description;
    ProjectView.editedCategory = category;
    new ProjectController().edit();
  }

  deleteItemBtnClicked() {
    new ProjectController().delete();
  }

  itemDragged(component: Item, item: renderedItem) {
    ProjectView.selectedItemComponent = component;
    ProjectView.selectedItem = item;
  }

  itemDropped(
    item: renderedItem,
    droppedContainerEle: Element,
    adjacentItemEle?: Element
  ) {
    ProjectView.adjacentItem = item;
    ProjectView.droppedContainerStatus = item.status;
    ProjectView.droppedContainerEle = droppedContainerEle;
    ProjectView.adjacentItemElement = adjacentItemEle;
    new ProjectController().arrange();
  }
}
