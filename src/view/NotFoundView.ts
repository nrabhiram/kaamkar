import { PageView } from './pageView';

export class NotFoundView extends PageView {
  private hero: string;

  constructor() {
    super();
    this.hero = `
        <div class="hero">
            <h1 class="hero-title text-center">
                <span class="block">Oops...</span>
            </h1>
            <p class="hero-description">
                Unfortunately, this page doesn't exist.
            </p>
        </div>
        `;
  }

  render() {
    const app = document.querySelector('.app');
    if (app) {
      app.innerHTML = '';
      app.innerHTML = `
                ${this.bg}
                ${this.nav}
                ${this.hero}
                ${this.footer}
            `;
    }
  }
}
