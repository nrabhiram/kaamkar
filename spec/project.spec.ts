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
    toDoItem = Utils.buildItem('Test Item', Status.INCOMPLETE);
    inProgressItem = Utils.buildItem('Test Item', Status.INCOMPLETE);
    completedItem = Utils.buildItem('Complete Test Item', Status.COMPLETED);
  });

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
