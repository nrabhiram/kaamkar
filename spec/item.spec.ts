import { describe, expect, it } from 'vitest';
import { Description } from '../src/description';
import { Item } from '../src/item';
import { ItemTitle } from '../src/itemTitle';
import { Status } from '../src/utils';

describe('Item', () => {
  it('An item title is updated to “Untitled Item” when edited to a blank', () => {
    let item = new Item(
      new ItemTitle('Test Title'),
      new Description('Test Description'),
      Status.TODO
    );
    item = item.update(
      new Item(
        new ItemTitle(''),
        new Description('Test Description'),
        Status.TODO
      )
    );
    expect(item.title).toEqual(new ItemTitle('Untitled Item'));
  });

  it('An item title is updated to edited text when edited to a blank', () => {
    let item = new Item(
      new ItemTitle('Test Title'),
      new Description('Test Description'),
      Status.TODO
    );
    item = item.update(
      new Item(
        new ItemTitle('Test Title 2'),
        new Description('Test Description'),
        Status.TODO
      )
    );
    expect(item.title.text).toBe('Test Title 2');
  });
});
