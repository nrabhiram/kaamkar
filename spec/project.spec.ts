import { describe, expect, it } from 'vitest';
import { Utils } from '../src/utils';

describe('Project', () => {
  it('A project with 0 items has a progress of 0', () => {
    const project = Utils.build_project(
      'Test Project',
      'This is a test project'
    );
    const progress = project.progress;
    expect(progress).toBe(0);
  });
});
