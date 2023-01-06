import { PageView } from '../../view/pageView';
import { Component } from '../component';

export class Spacer extends Component<HTMLElement, Element, PageView> {
  constructor(view: PageView) {
    super('app', view);
    this.templateString = this.spacerHTML();
    this.element = this.createElement(this.templateString);
    this.attach(false);
    this.configure();
  }

  private spacerHTML() {
    return `
      <div class="grow"></div>
    `;
  }

  configure() {}
}
