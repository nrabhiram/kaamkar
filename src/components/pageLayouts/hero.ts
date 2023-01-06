import { Router } from '../../router';
import { PageView } from '../../view/pageView';
import { Component } from '../component';

export class Hero extends Component<HTMLElement, Element, PageView> {
  constructor(view: PageView) {
    super('app', view);
    this.templateString = this.heroHTML();
    this.element = this.createElement(this.templateString);
    this.attach(false);
    this.configure();
  }

  private heroHTML() {
    return `
			<div class="hero">
				<h1 class="hero-title">
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

  configure() {
    const addProjectBtn = this.element.querySelector('.hero-add-btn') as HTMLElement;
    addProjectBtn.addEventListener('click', this.onAddBtnClicked);
  }

  private onAddBtnClicked() {
    history.pushState(null, '', 'projects');
    new Router().route();
  }
}
