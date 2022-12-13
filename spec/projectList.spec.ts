import { beforeEach, describe, expect, it } from 'vitest';
import { Description } from '../src/description';
import { ProjectsList } from '../src/projectsList';
import { ProjectTitle } from '../src/projectTitle';

let projectsList: ProjectsList;

describe('Project List', () => {
  beforeEach(() => {
    projectsList = new ProjectsList();
  });

  describe('Project List Project Delete', () => {
    it('A project list with 1 project has 0 projects left upon deletion', () => {
      const project = projectsList.add(
        new ProjectTitle('Test Project'),
        new Description('This is a Test Project')
      );
      projectsList.delete(project);
      expect(projectsList.projects).toEqual([]);
    });

    it('A project list with 2 projects has only the 2nd project left after deleting the 1st project', () => {
      const project1 = projectsList.add(
        new ProjectTitle('Test Project 1'),
        new Description('This is a Test Project')
      );
      const project2 = projectsList.add(
        new ProjectTitle('Test Project 2'),
        new Description('This is a Test Project')
      );
      projectsList.delete(project1);
      expect(projectsList.projects).toEqual([project2]);
    });

    it('A project list with 3 projects, has only 1st and 3rd projects left after deleting the 2nd one', () => {
      const project1 = projectsList.add(
        new ProjectTitle('Test Project 1'),
        new Description('This is a Test Project')
      );
      const project2 = projectsList.add(
        new ProjectTitle('Test Project 2'),
        new Description('This is a Test Project')
      );
      const project3 = projectsList.add(
        new ProjectTitle('Test Project 3'),
        new Description('This is a Test Project')
      );
      projectsList.delete(project2);
      expect(projectsList.projects).toEqual([project1, project3]);
    });

    it('A project with 3 projects, the 1st and 3rd being identical, has only the 1st and 2nd projects left after deleting the 3rd one', () => {
      const project1 = projectsList.add(
        new ProjectTitle('Test Project 1'),
        new Description('This is a Test Project')
      );
      const project2 = projectsList.add(
        new ProjectTitle('Test Project 2'),
        new Description('This is a Test Project')
      );
      const project3 = projectsList.add(
        new ProjectTitle('Test Project 1'),
        new Description('This is a Test Project')
      );
      projectsList.delete(project3);
      expect(projectsList.projects).toEqual([project1, project2]);
    });
  });

  describe('Project List Project Edit', () => {
    it('A project list project is edited to the new title', () => {
      const title = new ProjectTitle('Test Project');
      const description = new Description('This is a Test Project');
      const project = projectsList.add(title, description);
      const editedTitle = title.update(new ProjectTitle('Edited Test Project'));
      projectsList.edit(project, editedTitle, description);
      expect(project.title).toEqual(editedTitle);
    });

    it('A project list project is edited to the new description', () => {
      const title = new ProjectTitle('Test Project');
      const description = new Description('This is a Test Project');
      const project = projectsList.add(title, description);
      const editedDescription = description.update(
        new Description('This is an Edited Test Project')
      );
      projectsList.edit(project, title, editedDescription);
      expect(project.description).toEqual(editedDescription);
    });
  });
});
