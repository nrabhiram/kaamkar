import { beforeEach, describe, expect, it } from 'vitest';
import { Description } from '../src/model/description';
import { ItemsList } from '../src/model/itemsList';
import { ItemTitle } from '../src/model/itemTitle';
import { Project } from '../src/model/project';
import { ProjectTitle } from '../src/model/projectTitle';
import { Category, Status } from '../src/model/status';

let project: Project;

describe('Project', () => {
  beforeEach(() => {
    project = new Project(
      new ProjectTitle('Test Project'),
      new Description('This is a test project.'),
      new ItemsList()
    );
  });

  describe('Project Progress', () => {
    it('A project with 0 items has a progress of 0', () => {
      const progress = project.progress();
      expect(progress).toBe(0);
    });

    it('A project with a single item that is incomplete has a progress of 0', () => {
      project.add(
        new ItemTitle('Test Item'),
        new Description('This is a test item'),
        new Status(Category.TODO)
      );
      const progress = project.progress();
      expect(progress).toBe(0);
    });

    it('A project with a single item that is completed has a progress of 100', () => {
      project.add(
        new ItemTitle('Test Item'),
        new Description('This is a test item'),
        new Status(Category.COMPLETED)
      );
      const progress = project.progress();
      expect(progress).toBe(100);
    });

    it('A project with 2 items but only 1 completed has a progress of 50', () => {
      project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is a test item'),
        new Status(Category.TODO)
      );
      project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is a test item'),
        new Status(Category.COMPLETED)
      );
      const progress = project.progress();
      expect(progress).toBe(50);
    });

    it('A project with 2 items that are both completed has a progress of 100', () => {
      project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is a test item'),
        new Status(Category.COMPLETED)
      );
      project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is a test item'),
        new Status(Category.COMPLETED)
      );
      const progress = project.progress();
      expect(progress).toBe(100);
    });

    it('A project with 3 items, 1 yet to start, 1 in progress, 1 completed has a progress of 33', () => {
      project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is a test item'),
        new Status(Category.TODO)
      );
      project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is a test item'),
        new Status(Category.PROGRESS)
      );
      project.add(
        new ItemTitle('Test Item 3'),
        new Description('This is a test item'),
        new Status(Category.COMPLETED)
      );
      const progress = project.progress();
      expect(progress).toBe(33);
    });

    it('A project with 3 items, 1 yet to start, 2 completed has a progress of 67', () => {
      project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is a test item'),
        new Status(Category.TODO)
      );
      project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is a test item'),
        new Status(Category.COMPLETED)
      );
      project.add(
        new ItemTitle('Test Item 3'),
        new Description('This is a test item'),
        new Status(Category.COMPLETED)
      );
      const progress = project.progress();
      expect(progress).toBe(67);
    });

    it('A project with 3 items, 1 in progress, 2 completed has a progress of 67', () => {
      project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is a test item'),
        new Status(Category.PROGRESS)
      );
      project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is a test item'),
        new Status(Category.COMPLETED)
      );
      project.add(
        new ItemTitle('Test Item 3'),
        new Description('This is a test item'),
        new Status(Category.COMPLETED)
      );
      const progress = project.progress();
      expect(progress).toBe(67);
    });

    it('A project with 3 items that are all completed has a progress of 100', () => {
      project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is a test item'),
        new Status(Category.COMPLETED)
      );
      project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is a test item'),
        new Status(Category.COMPLETED)
      );
      project.add(
        new ItemTitle('Test Item 3'),
        new Description('This is a test item'),
        new Status(Category.COMPLETED)
      );
      const progress = project.progress();
      expect(progress).toBe(100);
    });
  });

  describe('Project Organization', () => {
    it('A project with 0 items has a list of 0 to-do items', () => {
      const toDoItems = project.toDoItems();
      expect(toDoItems.items()).toEqual([]);
    });

    it('A project with a single item that is yet to be started has the item listed as the only to-do item', () => {
      const item = project.add(
        new ItemTitle('Test Item'),
        new Description('This is a test item'),
        new Status(Category.TODO)
      );
      const toDoItems = project.toDoItems();
      expect(toDoItems.items()).toEqual([item]);
    });

    it('A project with 3 items, the first 2 yet to be started, and the last 1 completed, has only the first 2 listed as to do items', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is a test item'),
        new Status(Category.TODO)
      );
      const item2 = project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is a test item'),
        new Status(Category.TODO)
      );
      project.add(
        new ItemTitle('Test Item 3'),
        new Description('This is a test item'),
        new Status(Category.COMPLETED)
      );
      const toDoItems = project.toDoItems();
      expect(toDoItems.items()).toEqual([item1, item2]);
    });

    it('A project with 0 items has a list of 0 progress items', () => {
      const progressItems = project.progressItems();
      expect(progressItems.items()).toEqual([]);
    });

    it('A project with a single item that is in progress has the item listed as the only progress item', () => {
      const item = project.add(
        new ItemTitle('Test Item'),
        new Description('This is a test item'),
        new Status(Category.PROGRESS)
      );
      const progressItems = project.progressItems();
      expect(progressItems.items()).toEqual([item]);
    });

    it('A project with 3 items, the first 2 in progress, and the last 1 completed, has only the first 2 listed as progress items', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is a test item'),
        new Status(Category.PROGRESS)
      );
      const item2 = project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is a test item'),
        new Status(Category.PROGRESS)
      );
      project.add(
        new ItemTitle('Test Item 3'),
        new Description('This is a test item'),
        new Status(Category.COMPLETED)
      );
      const progressItems = project.progressItems();
      expect(progressItems.items()).toEqual([item1, item2]);
    });

    it('A project with 0 items has a list of 0 completed items', () => {
      const completeItems = project.completeItems();
      expect(completeItems.items()).toEqual([]);
    });

    it('A project with a single item that is completed has the item listed as the only completed item', () => {
      const item = project.add(
        new ItemTitle('Test Item'),
        new Description('This is a test item'),
        new Status(Category.COMPLETED)
      );
      const completeItems = project.completeItems();
      expect(completeItems.items()).toEqual([item]);
    });

    it('A project with 3 items, the first 2 completed, and the last 1 to do, has only the first 2 listed as completed items', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is a test item'),
        new Status(Category.COMPLETED)
      );
      const item2 = project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is a test item'),
        new Status(Category.COMPLETED)
      );
      project.add(
        new ItemTitle('Test Item 3'),
        new Description('This is a test item'),
        new Status(Category.TODO)
      );
      const completeItems = project.completeItems();
      expect(completeItems.items()).toEqual([item1, item2]);
    });

    it('A project with 2 items, 1st yet to start, and 2nd in progress, has only the 2nd one listed as a progress item', () => {
      project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is a test item'),
        new Status(Category.TODO)
      );
      const item = project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is a test item'),
        new Status(Category.PROGRESS)
      );
      const progressItems = project.progressItems();
      expect(progressItems.items()).toEqual([item]);
    });
  });

  describe('Project Item Delete', () => {
    it('A project with 1 item has 0 items left upon deletion', () => {
      const item = project.add(
        new ItemTitle('Test Item'),
        new Description('This is a test item'),
        new Status(Category.TODO)
      );
      project.delete(item);
      expect(project.items.items()).toEqual([]);
    });

    it('A project with 2 items has only the 2nd item left after deleting the 1st item', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is a test item'),
        new Status(Category.TODO)
      );
      const item2 = project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is a test item'),
        new Status(Category.TODO)
      );
      project.delete(item1);
      expect(project.items.items()).toEqual([item2]);
    });

    it('A project with 3 items, has only 1st and 3rd items left after deleting the 2nd one', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is a test item'),
        new Status(Category.TODO)
      );
      const item2 = project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is a test item'),
        new Status(Category.TODO)
      );
      const item3 = project.add(
        new ItemTitle('Test Item 3'),
        new Description('This is a test item'),
        new Status(Category.TODO)
      );
      project.delete(item2);
      expect(project.items.items()).toEqual([item1, item3]);
    });

    it('A project with 3 items, the 1st and 3rd being identical, has only the 1st and 2nd items left after deleting the 3rd one', () => {
      const item1 = project.add(
        new ItemTitle('Test Item'),
        new Description('This is a test item'),
        new Status(Category.TODO)
      );
      const item2 = project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is a test item'),
        new Status(Category.TODO)
      );
      const item3 = project.add(
        new ItemTitle('Test Item'),
        new Description('This is a test item'),
        new Status(Category.TODO)
      );
      project.delete(item3);
      expect(project.items.items()).toEqual([item1, item2]);
    });
  });

  describe('Project Edit', () => {
    it('A project title is updated to “Untitled Project” when edited to a blank', () => {
      project.update(
        new ProjectTitle(''),
        new Description('This is a project description')
      );
      expect(project.title).toEqual(new ProjectTitle('Untitled Project'));
    });

    it('A project title is updated to the edited value if it is not a blank', () => {
      project.update(
        new ProjectTitle('Test Title'),
        new Description('This is a project description')
      );
      expect(project.title.text).toBe('Test Title');
    });

    it('A project description is updated to the edited value', () => {
      project.update(
        new ProjectTitle('Test Title'),
        new Description('This is a project description')
      );
      expect(project.description.text).toBe('This is a project description');
    });
  });

  describe('Project Item Edit', () => {
    it('A project item is edited to the new status', () => {
      const status = new Status(Category.TODO);
      const item = project.add(
        new ItemTitle('Test Item'),
        new Description('This is a Test Item'),
        status
      );
      const editedStatus = status.update(new Status(Category.PROGRESS));
      project.edit(item, item.title, item.description, editedStatus);
      expect(item.status).toEqual(editedStatus);
    });

    it('A project item is edited to the new title', () => {
      const title = new ItemTitle('Test Item');
      const item = project.add(
        title,
        new Description('This is a Test Item'),
        new Status(Category.TODO)
      );
      const editedTitle = title.update(new ItemTitle('Edited Test Item'));
      project.edit(item, editedTitle, item.description, item.status);
      expect(item.title).toEqual(editedTitle);
    });

    it('A project item is edited to the new description', () => {
      const description = new Description('This is a Test Item');
      const item = project.add(
        new ItemTitle('Test Item'),
        description,
        new Status(Category.TODO)
      );
      const editedDescription = description.update(
        new Description('This is an Edited Test Item')
      );
      project.edit(item, item.title, editedDescription, item.status);
      expect(item.description).toEqual(editedDescription);
    });
  });

  describe('Project Items Arrange', () => {
    it('A project with 1 to-do item, upon adding a new to-do item, arranges it as the 2nd to-do item', () => {
      project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.TODO)
      );
      const item2 = project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.TODO)
      );
      expect(project.items.toDoItems().items()[1]).toEqual(item2);
    });

    it('A project with 1st a to-do item and 2nd a progress item, upon updating the status of the to-do item to progress, arranges it as the 2nd progress item', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.TODO)
      );
      project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.PROGRESS)
      );
      project.edit(
        item1,
        item1.title,
        item1.description,
        new Status(Category.PROGRESS)
      );
      expect(project.items.progressItems().items()[1]).toEqual(item1);
    });

    it('A project with 1st a to-do item and 2nd a complete item, upon updating the status of the to-do item to complete, arranges it as the 2nd complete item', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.TODO)
      );
      project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.COMPLETED)
      );
      project.edit(
        item1,
        item1.title,
        item1.description,
        new Status(Category.COMPLETED)
      );
      expect(project.items.completeItems().items()[1]).toEqual(item1);
    });

    it('A project with 1st a progress item and 2nd a to-do item, upon updating the status of the progress item to to-do, arranges it as the 2nd to-do item', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.PROGRESS)
      );
      project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.TODO)
      );
      project.edit(
        item1,
        item1.title,
        item1.description,
        new Status(Category.TODO)
      );
      expect(project.items.toDoItems().items()[1]).toEqual(item1);
    });

    it('A project with 2 to-do items, upon placing the the 2nd to-do item above the 1st to-do item, arranges it as the new 1st to-do item', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.TODO)
      );
      const item2 = project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.TODO)
      );
      project.arrange(item2, new Status(Category.TODO), item1);
      expect(project.items.toDoItems().items()[0]).toEqual(item2);
    });

    it('A project with 2 progress items, upon placing the the 2nd progress item above the 1st progress item, arranges it as the new 1st progress item', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.PROGRESS)
      );
      const item2 = project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.PROGRESS)
      );
      project.arrange(item2, new Status(Category.PROGRESS), item1);
      expect(project.items.progressItems().items()[0]).toEqual(item2);
    });

    it('A project with 2 complete items, upon placing the the 2nd complete item above the 1st complete item, arranges it as the new 1st complete item', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.COMPLETED)
      );
      const item2 = project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.COMPLETED)
      );
      project.arrange(item2, new Status(Category.COMPLETED), item1);
      expect(project.items.completeItems().items()[0]).toEqual(item2);
    });

    it('A project with 2 complete items and 1 to-do item, upon placing the to-do item between the complete items, arranges it as the new 2nd complete item', () => {
      project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.COMPLETED)
      );
      const item2 = project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.COMPLETED)
      );
      const item3 = project.add(
        new ItemTitle('Test Item 3'),
        new Description('This is Test Item 3'),
        new Status(Category.TODO)
      );
      project.arrange(item3, new Status(Category.COMPLETED), item2);
      expect(project.items.completeItems().items()[1]).toEqual(item3);
    });

    it('A project with 2 progress items and 1 to-do item, upon placing the to-do item between the progress items, arranges it as the new 2nd progress item', () => {
      project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.PROGRESS)
      );
      const item2 = project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.PROGRESS)
      );
      const item3 = project.add(
        new ItemTitle('Test Item 3'),
        new Description('This is Test Item 3'),
        new Status(Category.TODO)
      );
      project.arrange(item3, new Status(Category.PROGRESS), item2);
      expect(project.items.progressItems().items()[1]).toEqual(item3);
    });

    it('A project with 2 to-do items and 1 progress item, upon placing the progress item between the to-do items, arranges it as the new 2nd to-do item', () => {
      project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.TODO)
      );
      const item2 = project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.TODO)
      );
      const item3 = project.add(
        new ItemTitle('Test Item 3'),
        new Description('This is Test Item 3'),
        new Status(Category.PROGRESS)
      );
      project.arrange(item3, new Status(Category.TODO), item2);
      expect(project.items.toDoItems().items()[1]).toEqual(item3);
    });

    it('A project with 3 to-do items, upon placing the 1st to-do item after the last one, arranges it as the new 3rd to-do item', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.TODO)
      );
      project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.TODO)
      );
      const item3 = project.add(
        new ItemTitle('Test Item 3'),
        new Description('This is Test Item 3'),
        new Status(Category.TODO)
      );
      project.arrange(item1, new Status(Category.TODO), item3);
      expect(project.items.toDoItems().items()[2]).toEqual(item1);
    });

    it('A project with 3 progress items, upon placing the 1st progress item after the last one, arranges it as the new 3rd progress item', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.PROGRESS)
      );
      project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.PROGRESS)
      );
      const item3 = project.add(
        new ItemTitle('Test Item 3'),
        new Description('This is Test Item 3'),
        new Status(Category.PROGRESS)
      );
      project.arrange(item1, new Status(Category.PROGRESS), item3);
      expect(project.items.progressItems().items()[2]).toEqual(item1);
    });

    it('A project with 3 complete items, upon placing the 1st complete item after the last one, arranges it as the new 3rd complete item', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.COMPLETED)
      );
      project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.COMPLETED)
      );
      const item3 = project.add(
        new ItemTitle('Test Item 3'),
        new Description('This is Test Item 3'),
        new Status(Category.COMPLETED)
      );
      project.arrange(item1, new Status(Category.COMPLETED), item3);
      expect(project.items.completeItems().items()[2]).toEqual(item1);
    });

    it('A project with 3 to-do items, upon placing the 3rd to-do item before the 2nd one, arranges it as the new 2nd to-do item', () => {
      project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.TODO)
      );
      const item2 = project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.TODO)
      );
      const item3 = project.add(
        new ItemTitle('Test Item 3'),
        new Description('This is Test Item 3'),
        new Status(Category.TODO)
      );
      project.arrange(item3, new Status(Category.TODO), item2);
      expect(project.items.toDoItems().items()[1]).toEqual(item3);
    });

    it('A project with 3 progress items, upon placing the 3rd progress item before the 2nd one, arranges it as the new 2nd progress item', () => {
      project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.PROGRESS)
      );
      const item2 = project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.PROGRESS)
      );
      const item3 = project.add(
        new ItemTitle('Test Item 3'),
        new Description('This is Test Item 3'),
        new Status(Category.PROGRESS)
      );
      project.arrange(item3, new Status(Category.PROGRESS), item2);
      expect(project.items.progressItems().items()[1]).toEqual(item3);
    });

    it('A project with 3 complete items, upon placing the 3rd complete item before the 2nd one, arranges it as the new 2nd complete item', () => {
      project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.COMPLETED)
      );
      const item2 = project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.COMPLETED)
      );
      const item3 = project.add(
        new ItemTitle('Test Item 3'),
        new Description('This is Test Item 3'),
        new Status(Category.COMPLETED)
      );
      project.arrange(item3, new Status(Category.COMPLETED), item2);
      expect(project.items.completeItems().items()[1]).toEqual(item3);
    });

    it('A project with 3 to-do items, upon placing the 1st to-do item after the 2nd one, arranges it as the new 2nd to-do item', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.TODO)
      );
      const item2 = project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.TODO)
      );
      project.add(
        new ItemTitle('Test Item 3'),
        new Description('This is Test Item 3'),
        new Status(Category.TODO)
      );
      project.arrange(item1, new Status(Category.TODO), item2);
      expect(project.items.toDoItems().items()[1]).toEqual(item1);
    });

    it('A project with 3 progress items, upon placing the 1st progress item after the 2nd one, arranges it as the new 2nd progress item', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.PROGRESS)
      );
      const item2 = project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.PROGRESS)
      );
      project.add(
        new ItemTitle('Test Item 3'),
        new Description('This is Test Item 3'),
        new Status(Category.PROGRESS)
      );
      project.arrange(item1, new Status(Category.PROGRESS), item2);
      expect(project.items.progressItems().items()[1]).toEqual(item1);
    });

    it('A project with 3 complete items, upon placing the 1st complete item after the 2nd one, arranges it as the new 2nd complete item', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.COMPLETED)
      );
      const item2 = project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.COMPLETED)
      );
      project.add(
        new ItemTitle('Test Item 3'),
        new Description('This is Test Item 3'),
        new Status(Category.COMPLETED)
      );
      project.arrange(item1, new Status(Category.COMPLETED), item2);
      expect(project.items.completeItems().items()[1]).toEqual(item1);
    });

    it('A project with 1 to-do item, upon placing it in the progress list, arranges it as the 1st progress item', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.TODO)
      );
      project.arrange(item1, new Status(Category.PROGRESS));
      expect(project.items.progressItems().items()[0]).toEqual(item1);
    });

    it('A project with 1 to-do item, upon placing it in the complete list, arranges it as the 1st complete item', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.TODO)
      );
      project.arrange(item1, new Status(Category.COMPLETED));
      expect(project.items.completeItems().items()[0]).toEqual(item1);
    });

    it('A project with 1 progress item, upon placing it in the to-do list, arranges it as the 1st to-do item', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.PROGRESS)
      );
      project.arrange(item1, new Status(Category.TODO));
      expect(project.items.toDoItems().items()[0]).toEqual(item1);
    });

    it('A project with 1 to-do item and 1 progress item, upon placing the to-do item at the end of the progress list, arranges it as the 2nd progress item', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.TODO)
      );
      project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.PROGRESS)
      );
      project.arrange(item1, new Status(Category.PROGRESS));
      expect(project.items.progressItems().items()[1]).toEqual(item1);
    });

    it('A project with 1 to-do item and 1 complete item, upon placing the to-do item at the end of the complete list, arranges it as the 2nd complete item', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.TODO)
      );
      project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.COMPLETED)
      );
      project.arrange(item1, new Status(Category.COMPLETED));
      expect(project.items.completeItems().items()[1]).toEqual(item1);
    });

    it('A project with 1 progress item and 1 to-do item, upon placing the progress item at the end of the to-do list, arranges it as the 2nd to-do item', () => {
      const item1 = project.add(
        new ItemTitle('Test Item 1'),
        new Description('This is Test Item 1'),
        new Status(Category.PROGRESS)
      );
      project.add(
        new ItemTitle('Test Item 2'),
        new Description('This is Test Item 2'),
        new Status(Category.TODO)
      );
      project.arrange(item1, new Status(Category.TODO));
      expect(project.items.toDoItems().items()[1]).toEqual(item1);
    });
  });
});
