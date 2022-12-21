import { describe, expect, it } from 'vitest';
import { Category, Status } from '../src/model/status';

describe('Status', () => {
  it('A status is updated to the edited value', () => {
    let status = new Status(Category.TODO);
    const updatedCategory = new Status(Category.PROGRESS);
    status = status.update(updatedCategory);
    expect(status.category).toBe(Category.PROGRESS);
  });
});
