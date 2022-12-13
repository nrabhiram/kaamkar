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
    it('A project list with 1 project has 0 project left upon deletion', () => {
      const project = projectsList.add(
        new ProjectTitle('Test Project'),
        new Description('This is a Test Project')
      );
      projectsList.delete(project);
      expect(projectsList.projects).toEqual([]);
    });

    it('A project with 2 projects has only the 2nd project left after deleting the 1st project', () => {
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

    it('A project with 3 items, has only 1st and 3rd items left after deleting the 2nd one', () => {
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

    it('A project with 3 items, the 1st and 3rd being identical, has only the 1st and 2nd items left after deleting the 3rd one', () => {
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
});
