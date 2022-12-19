import { describe, expect, it } from 'vitest';
import { ProjectTitle } from '../src/model/projectTitle';

describe('Project Title', () => {
  it('A project title is set to “Untitled Project” when set to a blank', () => {
    const title = new ProjectTitle('');
    expect(title).toEqual(new ProjectTitle('Untitled Project'));
  });

  it('A project title is updated to the edited value if it is not a blank', () => {
    const title = new ProjectTitle('Test Title');
    expect(title.text).toBe('Test Title');
  });
});
