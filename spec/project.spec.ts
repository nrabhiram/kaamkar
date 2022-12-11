import { beforeEach, describe, expect, it } from 'vitest';
import { ItemsList } from '../src/itemsList';
import { Project } from '../src/project';
import { Status, Utils } from '../src/utils';

let project: Project;

describe('Project', () => {
  beforeEach(() => {
    project = new Project(
      Utils.buildTitle('Test Project'),
      Utils.buildDescription('This is a test project.'),
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
        Utils.buildTitle('Test Item'),
        Utils.buildStatus(Status.TODO)
      );
      const progress = project.progress();
      expect(progress).toBe(0);
    });

    it('A project with a single item that is completed has a progress of 100', () => {
      project.add(
        Utils.buildTitle('Complete Test Item'),
        Utils.buildStatus(Status.COMPLETED)
      );
      const progress = project.progress();
      expect(progress).toBe(100);
    });

    it('A project with 2 items but only 1 completed has a progress of 50', () => {
      project.add(
        Utils.buildTitle('Test Item'),
        Utils.buildStatus(Status.TODO)
      );
      project.add(
        Utils.buildTitle('Complete Test Item'),
        Utils.buildStatus(Status.COMPLETED)
      );
      const progress = project.progress();
      expect(progress).toBe(50);
    });

    it('A project with 2 items that are both completed has a progress of 100', () => {
      project.add(
        Utils.buildTitle('Complete Test Item 1'),
        Utils.buildStatus(Status.COMPLETED)
      );
      project.add(
        Utils.buildTitle('Complete Test Item 2'),
        Utils.buildStatus(Status.COMPLETED)
      );
      const progress = project.progress();
      expect(progress).toBe(100);
    });

    it('A project with 3 items, 1 yet to start, 1 in progress, 1 completed has a progress of 33', () => {
      project.add(
        Utils.buildTitle('Test Item'),
        Utils.buildStatus(Status.TODO)
      );
      project.add(
        Utils.buildTitle('Test Item'),
        Utils.buildStatus(Status.PROGRESS)
      );
      project.add(
        Utils.buildTitle('Complete Test Item'),
        Utils.buildStatus(Status.COMPLETED)
      );
      const progress = project.progress();
      expect(progress).toBe(33);
    });

    it('A project with 3 items, 1 yet to start, 2 completed has a progress of 67', () => {
      project.add(
        Utils.buildTitle('Test Item'),
        Utils.buildStatus(Status.TODO)
      );
      project.add(
        Utils.buildTitle('Complete Test Item 1'),
        Utils.buildStatus(Status.COMPLETED)
      );
      project.add(
        Utils.buildTitle('Complete Test Item 2'),
        Utils.buildStatus(Status.COMPLETED)
      );
      const progress = project.progress();
      expect(progress).toBe(67);
    });

    it('A project with 3 items, 1 in progress, 2 completed has a progress of 67', () => {
      project.add(
        Utils.buildTitle('Test Item'),
        Utils.buildStatus(Status.PROGRESS)
      );
      project.add(
        Utils.buildTitle('Complete Test Item 1'),
        Utils.buildStatus(Status.COMPLETED)
      );
      project.add(
        Utils.buildTitle('Complete Test Item 2'),
        Utils.buildStatus(Status.COMPLETED)
      );
      const progress = project.progress();
      expect(progress).toBe(67);
    });

    it('A project with 3 items that are all completed has a progress of 100', () => {
      project.add(
        Utils.buildTitle('Complete Test Item 1'),
        Utils.buildStatus(Status.COMPLETED)
      );
      project.add(
        Utils.buildTitle('Complete Test Item 2'),
        Utils.buildStatus(Status.COMPLETED)
      );
      project.add(
        Utils.buildTitle('Complete Test Item 3'),
        Utils.buildStatus(Status.COMPLETED)
      );
      const progress = project.progress();
      expect(progress).toBe(100);
    });
  });

  describe('Project Organization', () => {
    it('A project with 0 items has a list of 0 to-do items', () => {
      const toDoItems = project.toDoItems();
      expect(toDoItems).toEqual(new ItemsList());
    });

    it('A project with a single item that is yet to be started has the item listed as the only to-do item', () => {
      project.add(
        Utils.buildTitle('Test Item'),
        Utils.buildStatus(Status.TODO)
      );
      const toDoItems = project.toDoItems();
      expect(toDoItems).toEqual(
        new ItemsList([
          Utils.buildItem(
            Utils.buildTitle('Test Item'),
            Utils.buildStatus(Status.TODO),
            0
          )
        ])
      );
    });

    it('A project with 3 items, the first 2 yet to be started, and the last 1 completed, has only the first 2 listed as to do items', () => {
      project.add(
        Utils.buildTitle('Test Item 1'),
        Utils.buildStatus(Status.TODO)
      );
      project.add(
        Utils.buildTitle('Test Item 2'),
        Utils.buildStatus(Status.TODO)
      );
      project.add(
        Utils.buildTitle('Complete Test Item'),
        Utils.buildStatus(Status.COMPLETED)
      );
      const toDoItems = project.toDoItems();
      expect(toDoItems).toEqual(
        new ItemsList([
          Utils.buildItem(
            Utils.buildTitle('Test Item 1'),
            Utils.buildStatus(Status.TODO),
            0
          ),
          Utils.buildItem(
            Utils.buildTitle('Test Item 2'),
            Utils.buildStatus(Status.TODO),
            1
          )
        ])
      );
    });

    it('A project with 0 items has a list of 0 progress items', () => {
      const progressItems = project.progressItems();
      expect(progressItems).toEqual(new ItemsList());
    });

    it('A project with a single item that is in progress has the item listed as the only progress item', () => {
      project.add(
        Utils.buildTitle('Test Item'),
        Utils.buildStatus(Status.PROGRESS)
      );
      const progressItems = project.progressItems();
      expect(progressItems).toEqual(
        new ItemsList([
          Utils.buildItem(
            Utils.buildTitle('Test Item'),
            Utils.buildStatus(Status.PROGRESS),
            0
          )
        ])
      );
    });

    it('A project with 3 items, the first 2 in progress, and the last 1 completed, has only the first 2 listed as progress items', () => {
      project.add(
        Utils.buildTitle('Test Item 1'),
        Utils.buildStatus(Status.PROGRESS)
      );
      project.add(
        Utils.buildTitle('Test Item 2'),
        Utils.buildStatus(Status.PROGRESS)
      );
      project.add(
        Utils.buildTitle('Complete Test Item'),
        Utils.buildStatus(Status.COMPLETED)
      );
      const progressItems = project.progressItems();
      expect(progressItems).toEqual(
        new ItemsList([
          Utils.buildItem(
            Utils.buildTitle('Test Item 1'),
            Utils.buildStatus(Status.PROGRESS),
            0
          ),
          Utils.buildItem(
            Utils.buildTitle('Test Item 2'),
            Utils.buildStatus(Status.PROGRESS),
            1
          )
        ])
      );
    });

    it('A project with 0 items has a list of 0 completed items', () => {
      const completeItems = project.completeItems();
      expect(completeItems).toEqual(new ItemsList());
    });

    it('A project with a single item that is completed has the item listed as the only completed item', () => {
      project.add(
        Utils.buildTitle('Complete Test Item'),
        Utils.buildStatus(Status.COMPLETED)
      );
      const completeItems = project.completeItems();
      expect(completeItems).toEqual(
        new ItemsList([
          Utils.buildItem(
            Utils.buildTitle('Complete Test Item'),
            Utils.buildStatus(Status.COMPLETED),
            0
          )
        ])
      );
    });

    it('A project with 3 items, the first 2 completed, and the last 1 to do, has only the first 2 listed as completed items', () => {
      project.add(
        Utils.buildTitle('Complete Test Item 1'),
        Utils.buildStatus(Status.COMPLETED)
      );
      project.add(
        Utils.buildTitle('Complete Test Item 2'),
        Utils.buildStatus(Status.COMPLETED)
      );
      project.add(
        Utils.buildTitle('Test Item'),
        Utils.buildStatus(Status.TODO)
      );
      const completeItems = project.completeItems();
      expect(completeItems).toEqual(
        new ItemsList([
          Utils.buildItem(
            Utils.buildTitle('Complete Test Item 1'),
            Utils.buildStatus(Status.COMPLETED),
            0
          ),
          Utils.buildItem(
            Utils.buildTitle('Complete Test Item 2'),
            Utils.buildStatus(Status.COMPLETED),
            1
          )
        ])
      );
    });

    it('A project with 2 items, 1st yet to start, and 2nd in progress, has only the 2nd one listed as a progress item', () => {
      project.add(
        Utils.buildTitle('To-Do Item'),
        Utils.buildStatus(Status.TODO)
      );
      project.add(
        Utils.buildTitle('Progress Item'),
        Utils.buildStatus(Status.PROGRESS)
      );
      const progressItems = project.progressItems();
      expect(progressItems).toEqual(
        new ItemsList([
          Utils.buildItem(
            Utils.buildTitle('Progress Item'),
            Utils.buildStatus(Status.PROGRESS),
            1
          )
        ])
      );
    });
  });

  describe('Project Item Delete', () => {
    it('A project with 1 item has 0 items left upon deletion', () => {
      project.add(
        Utils.buildTitle('Test Item'),
        Utils.buildStatus(Status.TODO)
      );
      project.delete(
        Utils.buildItem(
          Utils.buildTitle('Test Item'),
          Utils.buildStatus(Status.TODO),
          0
        )
      );
      expect(project.items).toEqual(new ItemsList());
    });

    it('A project with 2 items has only the 2nd item left after deleting the 1st item', () => {
      project.add(
        Utils.buildTitle('Test Item 1'),
        Utils.buildStatus(Status.TODO)
      );
      project.add(
        Utils.buildTitle('Test Item 2'),
        Utils.buildStatus(Status.TODO)
      );
      project.delete(
        Utils.buildItem(
          Utils.buildTitle('Test Item 1'),
          Utils.buildStatus(Status.TODO),
          0
        )
      );
      expect(project.items).toEqual(
        new ItemsList([
          Utils.buildItem(
            Utils.buildTitle('Test Item 2'),
            Utils.buildStatus(Status.TODO),
            1
          )
        ])
      );
    });

    it('A project with 3 items, has only 1st and 3rd items left after deleting the 2nd one', () => {
      project.add(
        Utils.buildTitle('Test Item 1'),
        Utils.buildStatus(Status.TODO)
      );
      project.add(
        Utils.buildTitle('Test Item 2'),
        Utils.buildStatus(Status.TODO)
      );
      project.add(
        Utils.buildTitle('Test Item 3'),
        Utils.buildStatus(Status.TODO)
      );
      project.delete(
        Utils.buildItem(
          Utils.buildTitle('Test Item 2'),
          Utils.buildStatus(Status.TODO),
          1
        )
      );
      expect(project.items).toEqual(
        new ItemsList([
          Utils.buildItem(
            Utils.buildTitle('Test Item 1'),
            Utils.buildStatus(Status.TODO),
            0
          ),
          Utils.buildItem(
            Utils.buildTitle('Test Item 3'),
            Utils.buildStatus(Status.TODO),
            2
          )
        ])
      );
    });

    it('A project with 3 items, the 1st and 3rd being identical, has only the 1st and 2nd items left after deleting the 3rd one', () => {
      project.add(
        Utils.buildTitle('Test Item 1'),
        Utils.buildStatus(Status.TODO)
      );
      project.add(
        Utils.buildTitle('Test Item 2'),
        Utils.buildStatus(Status.TODO)
      );
      project.add(
        Utils.buildTitle('Test Item 1'),
        Utils.buildStatus(Status.TODO)
      );
      project.delete(
        Utils.buildItem(
          Utils.buildTitle('Test Item 1'),
          Utils.buildStatus(Status.TODO),
          2
        )
      );
      expect(project.items).toEqual(
        new ItemsList([
          Utils.buildItem(
            Utils.buildTitle('Test Item 1'),
            Utils.buildStatus(Status.TODO),
            0
          ),
          Utils.buildItem(
            Utils.buildTitle('Test Item 2'),
            Utils.buildStatus(Status.TODO),
            1
          )
        ])
      );
    });
  });
});
