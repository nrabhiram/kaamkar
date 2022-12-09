import { beforeEach, describe, expect, it } from 'vitest';
import { Project } from '../src/project';
import { Item } from '../src/utils';

let project: Project;
let item: Item;

describe('Project', () => {
  beforeEach(() => {
    project = new Project('Test Project', 'This is a test project.');
    item = {
      title: 'Test Item'
    };
  });

  it('A project with 0 items has a progress of 0', () => {
    const progress = project.progress();
    expect(progress).toBe(0);
  });

  it('A project with a single item that is incomplete has a progress of 0', () => {
    project.add(item);
    const progress = project.progress();
    expect(progress).toBe(0);
  });
});
