import { PageView } from './pageView';

export class HomeView extends PageView {
  private hero: string;

  constructor() {
    super();
    this.hero = `
        <div class="hero">
            <h1 class="hero-title text-center">
                <span class="block">Stay on top of </span>
                <span class="block">the important stuff</span>
            </h1>
            <p class="hero-description">
                With kaamkar, effortlessly identify what needs to get done, organize tasks, and get a clearer picture of the project timeline.
            </p>
            <div class="hero-btn-container hero-projects-link">
                <button type="button" class="hero-add-btn">       
                    Create Project
                </button>
                <a href="https://www.buymeacoffee.com/nrabhiram" target="_blank" class="hero-bmc-btn">
                    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" class="hero-bmc-btn-content" >
                </a>
            </div>
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
