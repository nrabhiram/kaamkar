import { describe, expect, it } from 'vitest';
import { Description } from '../src/description';
import { Item } from '../src/item';
import { ItemTitle } from '../src/itemTitle';
import { Category, Status } from '../src/status';

describe('Item', () => {
  it('An item title is updated to “Untitled Item” when edited to a blank', () => {
    let item = new Item(
      new ItemTitle('Test Title'),
      new Description('Test Description'),
      new Status(Category.TODO)
    );
    item = item.update(
      new Item(
        new ItemTitle(''),
        new Description('Test Description'),
        new Status(Category.TODO)
      )
    );
    expect(item.title).toEqual(new ItemTitle('Untitled Item'));
  });

  it('An item title is updated to edited text when edited to a blank', () => {
    let item = new Item(
      new ItemTitle('Test Title'),
      new Description('Test Description'),
      new Status(Category.TODO)
    );
    item = item.update(
      new Item(
        new ItemTitle('Test Title 2'),
        new Description('Test Description'),
        new Status(Category.TODO)
      )
    );
    expect(item.title.text).toBe('Test Title 2');
  });

  it('An item description is updated to the edited value', () => {
    let item = new Item(
      new ItemTitle('Test Title'),
      new Description('Test Description'),
      new Status(Category.TODO)
    );
    const updatedItem = new Item(
      new ItemTitle('Test Title'),
      new Description('Test Description 02'),
      new Status(Category.TODO)
    );
    item = item.update(updatedItem);
    expect(item.description.text).toBe('Test Description 02');
  });

  it('An item status is updated to the edited value', () => {
    let item = new Item(
      new ItemTitle('Test Title'),
      new Description('Test Description'),
      new Status(Category.TODO)
    );
    const updatedItem = new Item(
      new ItemTitle('Test Title'),
      new Description('Test Description'),
      new Status(Category.PROGRESS)
    );
    item = item.update(updatedItem);
    expect(item.status.category).toBe(Category.PROGRESS);
  });
});
