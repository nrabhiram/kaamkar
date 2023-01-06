import { PageView } from '../../view/pageView';
import { Component } from '../component';

export abstract class DropZone extends Component<
  HTMLElement,
  Element,
  PageView
> {
  constructor(hostElementId: string, view: PageView, insertAtStart: boolean) {
    super(hostElementId, view);
    this.templateString = this.dropZoneHTML();
    this.element = this.createElement(this.templateString);
    this.attach(insertAtStart);
    this.configure();
  }

  private dropZoneHTML() {
    return `<div class="drop-zone drop-zone-inactive"></div>`;
  }

  configure() {
    (this.element as HTMLElement).addEventListener(
      'dragover',
      this.dragOverHandler.bind(this)
    );
    (this.element as HTMLElement).addEventListener(
      'dragleave',
      this.dragLeaveHandler.bind(this)
    );
    (this.element as HTMLElement).addEventListener(
      'drop',
      this.dropHandler.bind(this)
    );
  }

  private dragOverHandler(e: DragEvent) {
    e.preventDefault();
    if (this.element.classList.contains('drop-zone-inactive')) {
      this.addHighlight();
    }
  }

  private dragLeaveHandler(e: DragEvent) {
    e.preventDefault();
    if (!this.element.classList.contains('drop-zone-inactive')) {
      this.removeHighlight();
    }
  }

  private addHighlight() {
    this.element.classList.remove('drop-zone-inactive');
    this.element.classList.add('drop-zone-active');
  }

  protected removeHighlight() {
    this.element.classList.remove('drop-zone-active');
    this.element.classList.add('drop-zone-inactive');
  }

  protected abstract dropHandler(e: DragEvent): void;
}
