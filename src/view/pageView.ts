export abstract class PageView {
  protected bg: string;
  protected nav: string;
  protected grow: string;
  protected footer: string;

  constructor() {
    this.bg = `
        <div class="mesh-gradient-container">
            <div class="mesh-1"></div>
            <div class="mesh-2"></div>
            <div class="mesh-3"></div>
        </div>
        `;
    this.nav = `
        <nav class="nav">
            <a href="/" class="nav-title internal-nav-link">
                <svg class="nav-logo" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/>
                </svg>
                <span class="nav-title-text">kaamkar</span>
            </a>
            <div class="nav-toggle-container">
                <button class="nav-toggle-btn">
                    <svg class="nav-toggle-icon" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
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
        </nav>
        `;
    this.grow = `<div class="grow"></div>`;
    this.footer = `
        <div class="footer">
            <p>Made by <a href="https://twitter.com/nrabhiram" target="_blank" class="footer-link">Abhiram Reddy</a></p> 
            <p>With vanilla TypeScript, Tailwind, and Webpack</p>
        </div>
        `;
  }

  protected titleInput(inputId: string) {
    const titleInput = document.getElementById(inputId);
    let title: string;
    if (titleInput) {
      title = (titleInput as HTMLInputElement).value;
    } else {
      title = '';
    }
    return title;
  }

  protected descriptionInput(inputId: string) {
    const descriptionInput = document.getElementById(inputId);
    let description: string;
    if (descriptionInput) {
      description = (descriptionInput as HTMLTextAreaElement).value;
    } else {
      description = '';
    }
    return description;
  }

  protected renderModal(
    template: string,
    modalBgId: string,
    containerId: string,
    modalId: string
  ) {
    document.querySelector('.app')?.insertAdjacentHTML('afterbegin', template);
    const modalBackground = document.getElementById(modalBgId);
    const modalContainer = document.getElementById(containerId);
    const modal = document.getElementById(modalId);
    modalBackground?.classList.toggle('hidden');
    modalContainer?.classList.toggle('hidden');
    modal?.classList.toggle('hidden');
    setTimeout(() => {
      modalBackground?.classList.toggle('modal-bg-ease-out');
      modalBackground?.classList.toggle('modal-bg-ease-in');
      modal?.classList.toggle('modal-ease-out');
      modal?.classList.toggle('modal-ease-in');
    }, 300);
  }

  protected removeModal(
    modalBgId: string,
    containerId: string,
    modalId: string
  ) {
    const modalBackground = document.getElementById(modalBgId);
    const modalContainer = document.getElementById(containerId);
    const modal = document.getElementById(modalId);
    modalBackground?.classList.toggle('modal-bg-ease-out');
    modalBackground?.classList.toggle('modal-bg-ease-in');
    modal?.classList.toggle('modal-ease-out');
    modal?.classList.toggle('modal-ease-in');
    setTimeout(() => {
      modalBackground?.classList.toggle('hidden');
      modalContainer?.classList.toggle('hidden');
      modal?.classList.toggle('hidden');
      const app = modalContainer?.parentNode?.parentNode;
      app?.removeChild(app.children[0]);
    }, 300);
  }

  protected toggleDescription(
    listElement: any,
    truncatedDescriptionClass: string,
    fullDescriptionClass: string
  ) {
    const truncatedDescription = listElement.querySelector(
      truncatedDescriptionClass
    );
    const fullDescription = listElement.querySelector(fullDescriptionClass);
    const descriptionButton = listElement.querySelector('.read-btn');
    if (fullDescription.classList.contains('collapsible')) {
      truncatedDescription.classList.toggle('collapsible');
      fullDescription.classList.toggle('collapsible');
      fullDescription.classList.toggle('active');
      fullDescription.style.maxHeight = fullDescription.scrollHeight + 'px';
      descriptionButton.innerHTML = `
            <svg class="read-btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
            <span class="read-btn-text">Read less</span>
            `;
    } else {
      fullDescription.style.maxHeight = null;
      descriptionButton.innerHTML = `
            <svg class="read-btn-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
            <span class="read-btn-text">Read more</span>
            `;
      setTimeout(() => {
        truncatedDescription.classList.toggle('collapsible');
        fullDescription.classList.toggle('active');
        fullDescription.classList.toggle('collapsible');
      }, 200);
    }
  }

  protected toggleDropdown(menuId: string) {
    const menu = document.getElementById(menuId);
    if (menu?.classList.contains('dropdown')) {
      menu?.classList.toggle('dropdown');
      setTimeout(() => {
        menu?.classList.toggle('dropdown-ease-out');
        menu?.classList.toggle('dropdown-ease-in');
      }, 200);
    } else {
      menu?.classList.toggle('dropdown-ease-in');
      menu?.classList.toggle('dropdown-ease-out');
      setTimeout(() => {
        menu?.classList.toggle('dropdown');
      }, 200);
    }
  }

  protected editFormDefaultInputs(
    title: string,
    description: string,
    titleInputId: string,
    descriptionInputId: string
  ) {
    const editTitleInput = document.getElementById(titleInputId);
    const editDescriptionInput = document.getElementById(descriptionInputId);
    if (editTitleInput) {
      (editTitleInput as HTMLInputElement).value = title;
    }
    if (editDescriptionInput) {
      (editDescriptionInput as HTMLTextAreaElement).value = description;
    }
  }
}
