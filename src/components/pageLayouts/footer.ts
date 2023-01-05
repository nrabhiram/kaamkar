import { PageView } from '../../view/pageView';
import { Component } from '../component';

export class Footer extends Component<HTMLElement, Element, PageView> {
  constructor(view: PageView) {
    super('app', view);
    this.templateString = this.footerHTML();
    this.element = this.createElement(this.templateString);
    this.attach(false);
    this.configure();
  }

  private footerHTML() {
    return `
      <div class="footer">
        <p>Made by <a href="https://twitter.com/nrabhiram" target="_blank" class="footer-link">Abhiram Reddy</a></p> 
        <p>With vanilla TypeScript, Tailwind, and Webpack</p>
      </div>
    `;
  }

  configure() {}
}
