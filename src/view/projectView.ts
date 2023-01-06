import { PageView } from './pageView';
import { Category } from '../model/status';
import { DeleteItemModal } from '../components/modals/deleteItemModal';
import { AddItemForm } from '../components/modals/addItemForm';
import { EditItemForm } from '../components/modals/editItemForm';
import { Project } from '../components/pageLayouts/project';
import { ItemCard } from '../components/cards/itemCard';
import { ProjectController } from '../controller/projectController';
import { Mesh } from '../components/pageLayouts/mesh';
import { NavBar } from '../components/pageLayouts/navBar';
import { Spacer } from '../components/pageLayouts/spacer';
import { Footer } from '../components/pageLayouts/footer';

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
  private static selectedItemComponent: ItemCard;
  private static selectedItem: renderedItem;
  private static adjacentItemElement: Element | undefined;
  private static adjacentItem: renderedItem;
  private static droppedContainerEle: Element;
  private static droppedContainerStatus: Category;
  private static addItemFormOpen = false;
  private static editItemFormOpen = false;
  private static deleteItemModalOpen = false;

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
    this.clear();
    new Mesh(this);
    new NavBar(this);
    new Project(title, this);
    const items = [...toDoItems, ...progressItems, ...completeItems];
    items.forEach((item) => {
      const itemContainerId = this.itemContainerId(item.status);
      new ItemCard(itemContainerId, this, item);
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
    new ItemCard(itemContainerId, this, item);
  }

  edit() {
    ProjectView.selectedItemComponent.edit(
      ProjectView.editedTitle,
      ProjectView.editedDescription,
      ProjectView.editedCategory
    );
  }

  delete() {
    ProjectView.selectedItemComponent.delete();
  }

  arrange() {
    ProjectView.selectedItemComponent.arrange(
      ProjectView.droppedContainerEle,
      ProjectView.droppedContainerStatus,
      ProjectView.adjacentItemElement
    );
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
    if (!ProjectView.addItemFormOpen) {
      const addItemForm = new AddItemForm(this);
      addItemForm.fadeIn();
      ProjectView.addItemFormOpen = true;
    }
  }

  editItemFormBtnClicked(component: ItemCard, item: renderedItem) {
    if (!ProjectView.editItemFormOpen) {
      ProjectView.selectedItemComponent = component;
      ProjectView.selectedItem = item;
      const editItemForm = new EditItemForm(this);
      editItemForm.fadeIn(item.title, item.description, item.status);
      ProjectView.editItemFormOpen = true;
    }
  }

  deleteItemFormBtnClicked(component: ItemCard, item: renderedItem) {
    if (!ProjectView.deleteItemModalOpen) {
      ProjectView.selectedItemComponent = component;
      ProjectView.selectedItem = item;
      const deleteItemModal = new DeleteItemModal(this);
      deleteItemModal.fadeIn();
      ProjectView.deleteItemModalOpen = true;
    }
  }

  addItemBtnClicked(title: string, description: string) {
    ProjectView.newTitle = title;
    ProjectView.newDescription = description;
    new ProjectController().add();
    this.addItemFormClosed();
  }

  editItemBtnClicked(title: string, description: string, category: Category) {
    ProjectView.editedTitle = title;
    ProjectView.editedDescription = description;
    ProjectView.editedCategory = category;
    new ProjectController().edit();
    this.editItemFormClosed();
  }

  deleteItemBtnClicked() {
    new ProjectController().delete();
    this.deleteItemModalClosed();
  }

  itemDragged(component: ItemCard, item: renderedItem) {
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

  addItemFormClosed() {
    ProjectView.addItemFormOpen = false;
  }

  editItemFormClosed() {
    ProjectView.editItemFormOpen = false;
  }

  deleteItemModalClosed() {
    ProjectView.deleteItemModalOpen = false;
  }
}
