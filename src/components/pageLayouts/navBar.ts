import { Router } from '../../router';
import { PageView } from '../../view/pageView';
import { Component } from '../component';
const Logo = require('../../assets/logo.png');

export class NavBar extends Component<HTMLElement, Element, PageView> {
  private animationInProgress = false;

  constructor(view: PageView) {
    super('app', view);
    this.templateString = this.navBarHTML();
    this.element = this.createElement(this.templateString);
    this.attach(false);
    this.configure();
  }

  private navBarHTML() {
    return `
      <nav class="nav">
        <a href="/" class="nav-title internal-nav-link">
          <img class="nav-logo" src="${Logo}" />
          <span class="nav-title-text">kaamkar</span>
        </a>
        <div class="nav-toggle-container">
          <button class="nav-toggle-btn">
            <svg class="nav-toggle-icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
          </button>
        </div>
        <div class="nav-sub-container">
          <div class="nav-links-container">
            <a href="/projects" class="nav-link internal-nav-link">
              Projects
            </a>
            <a class="nav-link" href="https://nrabhiram.xyz/" target="_blank">
              Blog
            </a>
          </div>
          <a class="nav-github-link" href="https://github.com/nrabhiram/to-do-list" target="_blank">
            <svg class="nav-github-logo" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            <span>GitHub</span>
          </a>
        </div>
        <div class="mobile-nav sub-nav-collapsed">
          <div class="nav-links-container">
            <a href="/projects" class="nav-link internal-nav-link">
              Projects
            </a>
            <a class="nav-link" href="https://nrabhiram.xyz/" target="_blank">
              Blog
            </a>
          </div>
          <a class="nav-github-link" href="https://github.com/nrabhiram/kaamkar" target="_blank">
            <svg class="nav-github-logo" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            <span>GitHub</span>
          </a>
        </div>  
      </nav>
    `;
  }

  configure() {
    const toggleBtn = this.element.querySelector('.nav-toggle-btn');
    toggleBtn?.addEventListener('click', this.toggleBtnClicked.bind(this));
    (this.element as HTMLElement).addEventListener(
      'click',
      this.linkClickHandler
    );
  }

  private linkClickHandler(e: MouseEvent) {
    const navLink = (e.target as HTMLElement).matches(
      '.internal-nav-link, .internal-nav-link *'
    );
    if (navLink) {
      e.preventDefault();
      const link = (e.target as HTMLElement).closest('.internal-nav-link');
      history.pushState(null, '', (link as HTMLAnchorElement).href);
      new Router().route();
    }
  }

  private toggleBtnClicked() {
    const nav = document.querySelector('.mobile-nav') as HTMLElement;
    if (nav.classList.contains('sub-nav-collapsed')) {
      if (!this.animationInProgress) {
        this.animationInProgress = true;
        nav.classList.remove('sub-nav-collapsed');
        nav.classList.add('sub-nav-open');
        nav.style.maxHeight = nav.scrollHeight + 'px';
        setTimeout(() => {
          this.animationInProgress = false;
        });
      }
    } else {
      if (!this.animationInProgress) {
        this.animationInProgress = true;
        nav.style.maxHeight = '0px';
        setTimeout(() => {
          nav.classList.remove('sub-nav-open');
          nav.classList.add('sub-nav-collapsed');
          this.animationInProgress = false;
        }, 200);
      }
    }
  }
}
