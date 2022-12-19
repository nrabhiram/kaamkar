import { HomeView } from './view/homeView';
import { NotFoundView } from './view/NotFoundView';
import { ProjectsListView } from './view/projectsListView';
import { ProjectView } from './view/projectView';
import { Renderer } from './renderer';
import { state } from './app';

export class Router {
  private pathToRegex(path: string) {
    return new RegExp(
      '^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$'
    );
  }

  private getParams(match: {
    route: {
      path: string;
    };
    result: RegExpMatchArray | null;
  }) {
    const values = match.result?.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
      (result) => result[1]
    );
    return Object.fromEntries(
      keys.map((key, i) => {
        if (values && values[i]) {
          return [key, values[i]];
        } else {
          return [key, ''];
        }
      })
    );
  }

  route() {
    const routes = [
      {
        path: '/',
        render: function () {
          const homeView = new HomeView();
          homeView.render();
        }
      },
      {
        path: '/404',
        render: function () {
          const notFoundView = new NotFoundView();
          notFoundView.render();
        }
      },
      {
        path: '/projects',
        render: function () {
          const projectsListView = new ProjectsListView();
          const renderedProjects = renderer.projects(state.projects);
          projectsListView.render(renderedProjects);
        }
      },
      {
        path: '/projects/:id',
        render: function (params?: any) {
          const projectId = params.id;
          let project;
          for (let i = 0; i < state.projects.projects.length; i++) {
            if (state.projects.projects[i].id.toString() === projectId) {
              project = state.projects.projects[i];
            }
          }
          state.projectId = +projectId;
          if (project) {
            const projectView = new ProjectView();
            const renderedToDoItems = renderer.items(project.toDoItems());
            const renderedProgressItems = renderer.items(
              project.progressItems()
            );
            const renderedCompleteItems = renderer.items(
              project.completeItems()
            );
            const renderedProjectTitle = renderer.projectTitle(project.title);
            projectView.render(
              renderedProjectTitle,
              renderedToDoItems,
              renderedProgressItems,
              renderedCompleteItems
            );
          } else {
            new NotFoundView().render();
          }
        }
      }
    ];
    const potentialMatches = routes.map((route) => {
      return {
        route: route,
        result: location.pathname.match(this.pathToRegex(route.path))
      };
    });
    let match = potentialMatches.find(
      (potentialMatch) => potentialMatch.result !== null
    );
    if (!match) {
      match = {
        route: routes[1],
        result: [location.pathname]
      };
    }
    const renderer = new Renderer();
    const notFoundView = new NotFoundView();
    switch (match.route.path) {
      case '/':
        match.route.render();
        break;
      case '404':
        match.route.render();
        break;
      case '/projects':
        match.route.render();
        break;
      case '/projects/:id':
        match.route.render(this.getParams(match));
        break;
      default:
        notFoundView.render();
    }
  }
}
