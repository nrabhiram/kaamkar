import { PageView } from '../../view/pageView';
import { Component } from '../component';

export class NotFound extends Component<HTMLElement, Element, PageView> {
  constructor(view: PageView) {
    super('app', view);
    this.templateString = this.notFoundHTML();
    this.element = this.createElement(this.templateString);
    this.attach(false);
    this.configure();
  }

  private notFoundHTML() {
    return `
      <div class="hero">
        <h1 class="hero-title">
          <span class="block">Oops...</span>
        </h1>
        <p class="hero-description">
          Unfortunately, this page doesn't exist.
        </p>
      </div>
		`;
  }

  configure() {}
}
