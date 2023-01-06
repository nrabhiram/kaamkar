import { PageView } from '../../view/pageView';
import { Component } from '../component';

export class Mesh extends Component<HTMLElement, Element, PageView> {
  constructor(view: PageView) {
    super('app', view);
    this.templateString = this.meshHTML();
    this.element = this.createElement(this.templateString);
    this.attach(false);
    this.configure();
  }

  private meshHTML() {
    return `
      <div class="mesh-gradient-container">
        <div class="mesh-1"></div>
        <div class="mesh-2"></div>
        <div class="mesh-3"></div>
      </div>
    `;
  }

  configure() {}
}
