import { describe, expect, it } from 'vitest';
import { Title } from '../src/title';

describe('Title', () => {
  it('A title is set to “Untitled Project” when set to a blank', () => {
    const title = new Title('');
    expect(title).toEqual(new Title('Untitled Project'));
  });

  it('A title is updated to the edited value if it is not a blank', () => {
    const title = new Title('Test Title');
    expect(title.text).toBe('Test Title');
  });
});
