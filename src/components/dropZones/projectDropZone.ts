import { ProjectsListView } from '../../view/projectsListView';
import { DropZone } from './dropZone';

export class ProjectDropZone extends DropZone {
  constructor(
    hostElementId: string,
    view: ProjectsListView,
    insertAtStart: boolean
  ) {
    super(hostElementId, view, insertAtStart);
  }

  protected dropHandler(e: DragEvent) {
    e.preventDefault();
    const projectsContainerEle = (e.target as HTMLElement).closest(
      '.project-container'
    );
    const dropZonesArr = Array.from(
      (projectsContainerEle as HTMLElement).querySelectorAll('.drop-zone')
    );
    const projectsArr = Array.from(
      (projectsContainerEle as HTMLElement).querySelectorAll(
        '.project-card-container'
      )
    );
    const projectId = (e.dataTransfer as DataTransfer).getData('text/plain');
    const project = this.getProject(
      dropZonesArr,
      projectsArr,
      e.target as Element,
      projectId
    );
    const adjacentProjectEle = this.getAdjacentProjectEle(
      dropZonesArr,
      projectsArr,
      e.target as Element
    );
    (this.view as ProjectsListView).projectDropped(
      project,
      projectsContainerEle as Element,
      adjacentProjectEle
    );
    this.removeHighlight();
  }

  private getProject(
    dropZonesArr: Element[],
    projectsArr: Element[],
    dropZone: Element,
    projectId: string
  ) {
    const projectEle = document.getElementById(projectId) as HTMLElement;
    const projectDropZone1 = projectEle.lastElementChild as Element;
    const projectContainerEle = projectDropZone1.closest('.project-container');
    const projectContainerDropZonesArr = Array.from(
      (projectContainerEle as HTMLElement).querySelectorAll('.drop-zone')
    );
    const projectDropIndex =
      projectContainerDropZonesArr.indexOf(projectDropZone1);
    const projectDropZone2 = projectContainerDropZonesArr[projectDropIndex - 1];
    const validDropZonesArr = dropZonesArr.filter((dropZone) => {
      return dropZone !== projectDropZone1 && dropZone !== projectDropZone2;
    });
    const droppedIndex = validDropZonesArr.indexOf(dropZone as HTMLElement);
    const remainingProjectArr = projectsArr.filter((project) => {
      return project !== projectEle;
    });
    let adjacentProjectEle = projectEle as Element;
    if (!(droppedIndex < 0)) {
      adjacentProjectEle = remainingProjectArr[droppedIndex];
    }
    const project = {
      title: '',
      description: '',
      date: '',
      progress: 0,
      id: -1
    };
    if (dropZone === projectDropZone1 || dropZone === projectDropZone2) {
      project.id = +projectEle.id.split('-')[1];
    } else if (adjacentProjectEle) {
      project.id = +adjacentProjectEle.id.split('-')[1];
    }
    return project;
  }

  private getAdjacentProjectEle(
    dropZonesArr: Element[],
    projectsArr: Element[],
    dropZone: Element
  ) {
    const droppedIndex = dropZonesArr.indexOf(dropZone);
    const adjacentProjectEle = projectsArr[droppedIndex];
    return adjacentProjectEle;
  }
}
