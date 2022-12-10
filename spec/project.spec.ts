import { beforeEach, describe, expect, it } from 'vitest';
import { Project } from '../src/project';
import { Item, Status, Utils } from '../src/utils';

let project: Project;
let toDoItem: Item;
let inProgressItem: Item;
let completedItem: Item;

describe('Project', () => {
  beforeEach(() => {
    project = new Project('Test Project', 'This is a test project.');
    toDoItem = Utils.buildItem('Test Item', Utils.buildStatus(Status.TODO));
    inProgressItem = Utils.buildItem(
      'Test Item',
      Utils.buildStatus(Status.PROGRESS)
    );
    completedItem = Utils.buildItem(
      'Complete Test Item',
      Utils.buildStatus(Status.COMPLETED)
    );
  });

  describe('Project Progress', () => {
    it('A project with 0 items has a progress of 0', () => {
      const progress = project.progress();
      expect(progress).toBe(0);
    });

    it('A project with a single item that is incomplete has a progress of 0', () => {
      project.add(toDoItem);
      const progress = project.progress();
      expect(progress).toBe(0);
    });

    it('A project with a single item that is completed has a progress of 100', () => {
      project.add(completedItem);
      const progress = project.progress();
      expect(progress).toBe(100);
    });

    it('A project with 2 items but only 1 completed has a progress of 50', () => {
      project.add(toDoItem);
      project.add(completedItem);
      const progress = project.progress();
      expect(progress).toBe(50);
    });

    it('A project with 2 items that are both completed has a progress of 100', () => {
      project.add(completedItem);
      project.add(completedItem);
      const progress = project.progress();
      expect(progress).toBe(100);
    });

    it('A project with 3 items, 1 yet to start, 1 in progress, 1 completed has a progress of 33', () => {
      project.add(toDoItem);
      project.add(inProgressItem);
      project.add(completedItem);
      const progress = project.progress();
      expect(progress).toBe(33);
    });

    it('A project with 3 items, 1 yet to start, 2 completed has a progress of 67', () => {
      project.add(toDoItem);
      project.add(completedItem);
      project.add(completedItem);
      const progress = project.progress();
      expect(progress).toBe(67);
    });

    it('A project with 3 items, 1 in progress, 2 completed has a progress of 67', () => {
      project.add(inProgressItem);
      project.add(completedItem);
      project.add(completedItem);
      const progress = project.progress();
      expect(progress).toBe(67);
    });

    it('A project with 3 items that are all completed has a progress of 100', () => {
      project.add(completedItem);
      project.add(completedItem);
      project.add(completedItem);
      const progress = project.progress();
      expect(progress).toBe(100);
    });
  });

  describe('Project Organization', () => {
    it('A project with 0 items has a list of 0 to-do items', () => {
      const toDoItems = project.toDoItems();
      expect(toDoItems).toEqual(Utils.buildItemsList([]));
    });

    it('A project with a single item that is yet to be started has the item listed as the only to-do item', () => {
      project.add(toDoItem);
      const toDoItems = project.toDoItems();
      expect(toDoItems).toEqual(
        Utils.buildItemsList([
          Utils.buildItem('Test Item', Utils.buildStatus(Status.TODO))
        ])
      );
    });

    it('A project with 3 items, the first 2 yet to be started, and the last 1 completed, has only the first 2 listed as to do items', () => {
      const toDoItem1 = Utils.buildItem(
        'Test Item 1',
        Utils.buildStatus(Status.TODO)
      );
      const toDoItem2 = Utils.buildItem(
        'Test Item 2',
        Utils.buildStatus(Status.TODO)
      );
      project.add(toDoItem1);
      project.add(toDoItem2);
      project.add(completedItem);
      const toDoItems = project.toDoItems();
      expect(toDoItems).toEqual(
        Utils.buildItemsList([
          Utils.buildItem('Test Item 1', Utils.buildStatus(Status.TODO)),
          Utils.buildItem('Test Item 2', Utils.buildStatus(Status.TODO))
        ])
      );
    });

    it('A project with 0 items has a list of 0 progress items', () => {
      const progressItems = project.progressItems();
      expect(progressItems).toEqual(Utils.buildItemsList([]));
    });

    it('A project with a single item that is in progress has the item listed as the only progress item', () => {
      project.add(inProgressItem);
      const progressItems = project.progressItems();
      expect(progressItems).toEqual(
        Utils.buildItemsList([
          Utils.buildItem('Test Item', Utils.buildStatus(Status.PROGRESS))
        ])
      );
    });

    it('A project with 3 items, the first 2 in progress, and the last 1 completed, has only the first 2 listed as progress items', () => {
      const progressItem1 = Utils.buildItem(
        'Test Item 1',
        Utils.buildStatus(Status.PROGRESS)
      );
      const progressItem2 = Utils.buildItem(
        'Test Item 2',
        Utils.buildStatus(Status.PROGRESS)
      );
      project.add(progressItem1);
      project.add(progressItem2);
      project.add(completedItem);
      const progressItems = project.progressItems();
      expect(progressItems).toEqual(
        Utils.buildItemsList([
          Utils.buildItem('Test Item 1', Utils.buildStatus(Status.PROGRESS)),
          Utils.buildItem('Test Item 2', Utils.buildStatus(Status.PROGRESS))
        ])
      );
    });

    it('A project with 0 items has a list of 0 completed items', () => {
      const completeItems = project.completeItems();
      expect(completeItems).toEqual(Utils.buildItemsList([]));
    });

    it('A project with a single item that is completed has the item listed as the only completed item', () => {
      project.add(completedItem);
      const completeItems = project.completeItems();
      expect(completeItems).toEqual(
        Utils.buildItemsList([
          Utils.buildItem(
            'Complete Test Item',
            Utils.buildStatus(Status.COMPLETED)
          )
        ])
      );
    });

    it('A project with 3 items, the first 2 completed, and the last 1 to do, has only the first 2 listed as completed items', () => {
      const completedItem1 = Utils.buildItem(
        'Complete Test Item 1',
        Utils.buildStatus(Status.COMPLETED)
      );
      const completedItem2 = Utils.buildItem(
        'Complete Test Item 2',
        Utils.buildStatus(Status.COMPLETED)
      );
      project.add(completedItem1);
      project.add(completedItem2);
      project.add(toDoItem);
      const completeItems = project.completeItems();
      expect(completeItems).toEqual(
        Utils.buildItemsList([
          Utils.buildItem(
            'Complete Test Item 1',
            Utils.buildStatus(Status.COMPLETED)
          ),
          Utils.buildItem(
            'Complete Test Item 2',
            Utils.buildStatus(Status.COMPLETED)
          )
        ])
      );
    });

    it('A project with 2 items, 1st yet to start, and 2nd in progress, has only the 2nd one listed as a progress item', () => {
      const toDoItem = Utils.buildItem(
        'To-Do Item',
        Utils.buildStatus(Status.TODO)
      );
      const inProgressItem = Utils.buildItem(
        'Progress Item',
        Utils.buildStatus(Status.PROGRESS)
      );
      project.add(toDoItem);
      project.add(inProgressItem);
      const progressItems = project.progressItems();
      expect(progressItems).toEqual(
        Utils.buildItemsList([
          Utils.buildItem('Progress Item', Utils.buildStatus(Status.PROGRESS))
        ])
      );
    });
  });
});
