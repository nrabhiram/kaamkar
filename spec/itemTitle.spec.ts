import { describe, expect, it } from 'vitest';
import { ItemTitle } from '../src/model/itemTitle';

describe('Item Title', () => {
  it('An item title is set to “Untitled Item” when set to a blank', () => {
    const title = new ItemTitle('');
    expect(title).toEqual(new ItemTitle('Untitled Item'));
  });

  it('A item title is updated to the edited value if it is not a blank', () => {
    const title = new ItemTitle('Test Title');
    expect(title.text).toBe('Test Title');
  });
});
