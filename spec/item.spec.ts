import { describe, expect, it } from 'vitest';
import { Description } from '../src/model/description';
import { Item } from '../src/model/item';
import { ItemTitle } from '../src/model/itemTitle';
import { Category, Status } from '../src/model/status';

describe('Item', () => {
  it('An item title is updated to “Untitled Item” when edited to a blank', () => {
    const item = new Item(
      new ItemTitle('Test Title'),
      new Description('Test Description'),
      new Status(Category.TODO)
    );
    item.update(
      new ItemTitle(''),
      new Description('Test Description'),
      new Status(Category.TODO)
    );
    expect(item.title).toEqual(new ItemTitle('Untitled Item'));
  });

  it('An item title is updated to edited text when not a blank', () => {
    const item = new Item(
      new ItemTitle('Test Title'),
      new Description('Test Description'),
      new Status(Category.TODO)
    );
    item.update(
      new ItemTitle('Test Title 2'),
      new Description('Test Description'),
      new Status(Category.TODO)
    );
    expect(item.title.text).toBe('Test Title 2');
  });

  it('An item description is updated to the edited value', () => {
    const item = new Item(
      new ItemTitle('Test Title'),
      new Description('Test Description'),
      new Status(Category.TODO)
    );
    item.update(
      new ItemTitle('Test Title'),
      new Description('Test Description 02'),
      new Status(Category.TODO)
    );
    expect(item.description.text).toBe('Test Description 02');
  });

  it('An item status is updated to the edited value', () => {
    const item = new Item(
      new ItemTitle('Test Title'),
      new Description('Test Description'),
      new Status(Category.TODO)
    );
    item.update(
      new ItemTitle('Test Title'),
      new Description('Test Description'),
      new Status(Category.PROGRESS)
    );
    expect(item.status.category).toBe(Category.PROGRESS);
  });
});
