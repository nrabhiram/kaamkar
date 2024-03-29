﻿# Kaamkar

<p align="center">
    <img src="./src/assets/demo.gif" alt="demo">
</p>

<p align="center">
    <img src="./src/assets/kaamkar.png" alt="kaamkar">
    <br>
    <br>
    <img src="https://img.shields.io/badge/create-projects-teal?style=flat" alt="projects">
    <img src="https://img.shields.io/badge/organize-tasks-teal?style=flat" alt="tasks"> 
    <img src="https://img.shields.io/github/deployments/nrabhiram/kaamkar/production">
</p>

A single page application (SPA) for managing your projects' to-do-lists. It allows you to create kanban-boards that are stored within the browser.

## Test Driven Development

> Where should you start building a system? With stories you want to be able to tell about the finished system.
> Where should you start writing a bit of functionality? With the tests you want to pass with the finished code.
> Where should you start writing a test? With the asserts that will pass when it is done.

*-Kent Beck*

In this project, I rigorously adhered to Test Driven Development (TDD) and Domain Driven Design (DDD) principles. Before I wrote the first line of code, I defined the domain by pondering the following questions:

- What should I be able to do with the finished version of the project?
- What is the domain, what are the concepts that exist within it, and how do they interact with one another?
- What are the behaviors that these concepts should display?

Two immediate advantages to practicing TDD that I've experienced in this project are:

1. TDD allows you to think more deeply about the design of your programs
2. The TDD loop ensures that you're always one change away from a green bar because you pick the simplest example of the behavior you're trying to model (I'm still trying to get better at this). Doing so ensures that your stress levels are low during development and that you can vary the step size accordingly

## MVC Architecture

Once the domain abstractions were modeled, I set up a Model View Controller (MVC) architecture such that:

- The domain layer deals only with domain types
- The view layer, which handles user inputs and outputs, only accepts primitive types
- The controller orchestrates the flow of data from the domain and views layers with the help of a `Parser` and `Renderer`.

```
Primitive Type → Parser → Domain Type

Domain Type → Renderer → Primitive Type
```

I've also created `Components` for reusable UI elements so that rendering the necessary information and setting up event listeners is easier.

## Webpack

During the development of this project, I understood how to configure Webpack for a vanilla Typescript SPA with support for HTML metadata, TailwindCSS, images, and favicons. Webpack is useful because it bundles your modules into a single file by going through all of your imports starting from the application's entry point. This allows browsers to make lesser HTTP requests for the source code.

## Technologies

![TypeScript](https://img.shields.io/badge/frontend-ts-blue?style=flat&logo=typescript)
![Tailwind](https://img.shields.io/badge/frontend-tailwind-00C4C4?style=flat&logo=tailwindcss)
![ESLint](https://img.shields.io/badge/linter-eslint-4B32C3?style=flat&logo=eslint)
![Prettier](https://img.shields.io/badge/formatter-prettier-F8BC45?style=flat&logo=prettier)
![Vitest](https://img.shields.io/badge/specs-vitest-yellow?style=flat&logo=vitest)
![Webpack](https://img.shields.io/badge/bundler-webpack-4DBDF7?style=flat&logo=webpack)

- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/) for utility CSS classes
- [ESLint](https://eslint.org/) configured with some initial rules
- [Prettier](https://prettier.io/) to enforce consistent code style
- [Vitest](https://vitest.dev/) for unit testing and code coverage
- [Webpack](https://webpack.js.org/) to compile TS code to JS, generate a bundle file, and build the project files for distribution

## Development

### Setup

1. `git clone https://github.com/nrabhiram/typescript-tailwind-frontend-template.git`
2. Run `npm install` to install all of the project's dependencies
3. Build the project for development: `npm run build-dev`
4. Run the local development server: `npm run start`

### Dev Loop

- `prettier-format` - run the autoformatter
- `lint` - run the linter
- `test` - run the specs
- `test-filter <spec-name>` - run a specific spec
- `coverage` - get a coverage report of the specs
- `build` - build the project files for distribution
- `build-dev` - build the project files for development
- `start` - run the local development server

## License

The project is available as open source under the terms of the [MIT License](LICENSE).

## Author

[![Twitter](https://img.shields.io/badge/follow-%40nrabhiram-1DA1F2?style=flat&logo=Twitter)](https://twitter.com/nrabhiram)

[![LinkedIn](https://img.shields.io/badge/connect-%40abhiramreddy-%230077B5?style=flat&logo=LinkedIn)](https://www.linkedin.com/in/abhiram-reddy-23285b196/)
