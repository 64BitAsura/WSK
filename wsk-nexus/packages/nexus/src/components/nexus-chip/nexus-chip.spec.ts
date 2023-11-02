import { NexusChip } from './nexus-chip';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-chip', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusChip],
      html: '<nexus-chip></nexus-chip>'
    });

    expect(page.root).toEqualHtml('<nexus-chip><button class="nexus-chip" type="button"></button></nexus-chip>');
  });

  it('should have the global class', async () => {
    const page = await newSpecPage({
      components: [NexusChip],
      html: '<nexus-chip></nexus-chip>'
    });

    const button = page.root.querySelector('button');

    expect(button).toHaveClass('nexus-chip');
  });

  it('should add the success attribute', async () => {
    const success = true;

    const page = await newSpecPage({
      components: [NexusChip],
      html: `<nexus-chip success="${success}"></nexus-chip>`
    });

    const button = page.root.querySelector('button');

    expect(button).toHaveClass('nexus-success');
  });

  it('should add the removable attribute', async () => {
    const removable = true;

    const page = await newSpecPage({
      components: [NexusChip],
      html: `<nexus-chip removable="${removable}"></nexus-chip>`
    });

    const button = page.root.querySelector('nexus-icon');

    expect(button).toHaveClass('nexus-close-icon');
  });

  it('emits triggerRemovableClick onclick of removable icon', async () => {
    const removable = true;

    const page = await newSpecPage({
      components: [NexusChip],
      html: `<nexus-chip removable="${removable}"></nexus-chip>`
    });

    const chip = page.rootInstance;
    const button = page.root.querySelector('nexus-icon');
    const event = new Event('click', {
      bubbles: true
    });
    jest.spyOn(chip.triggerRemovableClick, 'emit');
    await page.waitForChanges();
    button.dispatchEvent(event);
    await page.waitForChanges();
    expect(chip.triggerRemovableClick.emit).toHaveBeenCalled();
  });
});
