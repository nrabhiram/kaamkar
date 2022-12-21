import { describe, expect, it } from 'vitest';
import { Description } from '../src/model/description';

describe('Description', () => {
  it('A description is updated to the edited value', () => {
    let description = new Description('Test Description');
    const updatedDescription = new Description('This is a description');
    description = description.update(updatedDescription);
    expect(description.text).toBe('This is a description');
  });
});
