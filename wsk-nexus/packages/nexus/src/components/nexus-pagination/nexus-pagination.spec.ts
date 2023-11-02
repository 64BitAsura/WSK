/* eslint-disable no-magic-numbers */
import { NexusPagination } from './nexus-pagination';
import { newSpecPage } from '@stencil/core/testing';

const templtStr = '<nexus-pagination current="1" max="3"></nexus-pagination>';

describe('nexus-pagination', () => {
  it('should have class', async () => {
    const page = await newSpecPage({
      components: [NexusPagination],
      html: '<nexus-pagination></nexus-pagination>'
    });

    expect(page.root).toHaveClass('nexus-pagination');
  });

  it('should emit the correct page number when a button is clicked', async () => {
    const page = await newSpecPage({
      components: [NexusPagination],
      html: templtStr
    });

    const instance = page.rootInstance;

    jest.spyOn(instance.changeEvent, 'emit');

    page.waitForChanges();

    const [first, prev, next, last] = page.root.querySelectorAll('button');

    const event = new Event('click', {
      bubbles: true
    });

    first.dispatchEvent(event);
    expect(instance.changeEvent.emit).toHaveBeenCalled();
    expect(instance.changeEvent.emit).toHaveBeenCalledWith(1);

    prev.dispatchEvent(event);
    expect(instance.changeEvent.emit).toHaveBeenCalledWith(1);

    next.dispatchEvent(event);
    expect(instance.changeEvent.emit).toHaveBeenCalledWith(2);

    last.dispatchEvent(event);
    expect(instance.changeEvent.emit).toHaveBeenCalledWith(2);
  });

  it('should emit the correct page number when entered as input', async () => {
    const page = await newSpecPage({
      components: [NexusPagination],
      html: templtStr
    });

    const instance = page.rootInstance;

    jest.spyOn(instance.changeEvent, 'emit');

    page.waitForChanges();

    const input = page.root.querySelector('input');

    const event = new Event('change', {
      bubbles: true
    });

    input.dispatchEvent(event);
    expect(instance.changeEvent.emit).toHaveBeenCalled();
  });

  it('should not emit an event when min or max is passed', async () => {
    const page = await newSpecPage({
      components: [NexusPagination],
      html: templtStr
    });

    const instance = page.rootInstance;

    jest.spyOn(instance.changeEvent, 'emit');
    instance.handleChange(7);

    expect(instance.changeEvent.emit).not.toHaveBeenCalled();
  });
});
