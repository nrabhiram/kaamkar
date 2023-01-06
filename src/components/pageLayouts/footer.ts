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
        <a target="_blank" href="https://icons8.com/icon/JPbBqkBV0i6A/note" class="footer-link">Note</a> icon by <a target="_blank" href="https://icons8.com" class="footer-link">Icons8</a>
      </div>
    `;
  }

  configure() {}
}
