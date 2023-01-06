import { PageView } from '../view/pageView';

export abstract class Component<
  T extends HTMLElement,
  U extends Element,
  V extends PageView
> {
  hostElement: T;
  element: U;
  view: V;
  templateString = '';

  constructor(hostElementId: string, view: PageView) {
    this.hostElement = document.getElementById(hostElementId) as T;
    this.view = view as V;
    this.element = this.createElement('<div></div>');
  }

  protected attach(insertAtStart: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtStart ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  protected createElement(template: string) {
    return document.createRange().createContextualFragment(template)
      .children[0] as U;
  }

  protected abstract configure(): void;
}
