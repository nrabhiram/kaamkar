import { beforeEach, describe, expect, it } from 'vitest';
import { Description } from '../src/model/description';
import { ProjectsList } from '../src/model/projectsList';
import { ProjectTitle } from '../src/model/projectTitle';

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

  describe('Project List Project Arrange', () => {
    it('A project list with 1 project, upon adding a new project, arranges it as the 2nd project', () => {
      projectsList.add(
        new ProjectTitle('Test Project 1'),
        new Description('This is the 1st Test Project')
      );
      const project2 = projectsList.add(
        new ProjectTitle('Test Project 2'),
        new Description('This is the 2nd Test Project')
      );
      expect(projectsList.projects[1]).toEqual(project2);
    });

    it('A project list with 2 projects, upon placing the the 2nd project above the 1st project, arranges it as the new 1st project', () => {
      const project1 = projectsList.add(
        new ProjectTitle('Test Project 1'),
        new Description('This is the 1st Test Project')
      );
      const project2 = projectsList.add(
        new ProjectTitle('Test Project 2'),
        new Description('This is the 2nd Test Project')
      );
      projectsList.arrange(project2, project1);
      expect(projectsList.projects[0]).toEqual(project2);
    });

    it('A project list with 3 projects, upon placing the 1st project after the last one, arranges it as the new 3rd project', () => {
      const project1 = projectsList.add(
        new ProjectTitle('Test Project 1'),
        new Description('This is the 1st Test Project')
      );
      projectsList.add(
        new ProjectTitle('Test Project 2'),
        new Description('This is the 2nd Test Project')
      );
      projectsList.add(
        new ProjectTitle('Test Project 3'),
        new Description('This is the 3rd Test Project')
      );
      projectsList.arrange(project1);
      expect(projectsList.projects[2]).toEqual(project1);
    });

    it('A project list with 3 projects, upon placing the 3rd project before the 2nd one, arranges it as the new 2nd project', () => {
      projectsList.add(
        new ProjectTitle('Test Project 1'),
        new Description('This is the 1st Test Project')
      );
      const project2 = projectsList.add(
        new ProjectTitle('Test Project 2'),
        new Description('This is the 2nd Test Project')
      );
      const project3 = projectsList.add(
        new ProjectTitle('Test Project 3'),
        new Description('This is the 3rd Test Project')
      );
      projectsList.arrange(project3, project2);
      expect(projectsList.projects[1]).toEqual(project3);
    });

    it('A project list with 3 projects, upon placing the 1st project after the 2nd one, arranges it as the new 2nd project', () => {
      const project1 = projectsList.add(
        new ProjectTitle('Test Project 1'),
        new Description('This is the 1st Test Project')
      );
      const project2 = projectsList.add(
        new ProjectTitle('Test Project 2'),
        new Description('This is the 2nd Test Project')
      );
      projectsList.add(
        new ProjectTitle('Test Project 3'),
        new Description('This is the 3rd Test Project')
      );
      projectsList.arrange(project1, project2);
      expect(projectsList.projects[1]).toEqual(project1);
    });
  });
});
