import { describe, expect, it } from 'vitest';
import { Project } from '../src/project';

describe('Project', () => {
  it('A project with 0 items has a progress of 0', () => {
    const project = new Project('Test Project', 'This is a test project.');
    const progress = project.progress();
    expect(progress).toBe(0);
  });
});
