import { NexusCheckbox } from './nexus-checkbox';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-checkbox', () => {
  it('should have the global class', async () => {
    const page = await newSpecPage({
      components: [NexusCheckbox],
      html: '<nexus-checkbox></nexus-checkbox>'
    });

    const label = page.root.querySelector('label');

    expect(label).toHaveClass('nexus-checkbox');
  });

  it('should have checked attribute', async () => {
    const checked = true;

    const page = await newSpecPage({
      components: [NexusCheckbox],
      html: `<nexus-checkbox checked="${checked}"></nexus-checkbox>`
    });

    const checkbox = page.root.querySelector('input');

    expect(checkbox.checked).toBeTruthy();
  });

  it('should set the id', async () => {
    const id = `custom-id`;

    const page = await newSpecPage({
      components: [NexusCheckbox],
      html: `<nexus-checkbox attr-id="${id}"></nexus-checkbox>`
    });

    const checkbox = page.root.querySelector('input');

    expect(checkbox.id).toBe(id);
  });

  it('should have the indeterminate class', async () => {
    const indeterminate = true;

    const page = await newSpecPage({
      components: [NexusCheckbox],
      html: `<nexus-checkbox checked="${indeterminate}" indeterminate="${indeterminate}"></nexus-checkbox>`
    });

    const label = page.root.querySelector('label');

    expect(label).toHaveClass('nexus-checkbox-indeterminate');
  });

  it('should add the required attribute', async () => {
    const required = true;

    const page = await newSpecPage({
      components: [NexusCheckbox],
      html: `<nexus-checkbox required="${required}"></nexus-checkbox>`
    });

    const checkbox = page.root.querySelector('input');

    expect(checkbox.required).toBeTruthy();
  });

  it('should add the disabled attribute', async () => {
    const disabled = true;

    const page = await newSpecPage({
      components: [NexusCheckbox],
      html: `<nexus-checkbox disabled="${disabled}"></nexus-checkbox>`
    });

    const checkbox = page.root.querySelector('input');

    expect(checkbox.disabled).toBeTruthy();
  });

  it('should rerender on change', async () => {
    const page = await newSpecPage({
      components: [NexusCheckbox],
      html: `<nexus-checkbox></nexus-checkbox>`
    });

    const input = page.root.querySelector('input');

    expect(input.checked).toBeFalsy();

    const changeEvent = new Event('change');

    input.checked = true;
    input.dispatchEvent(changeEvent);

    await page.waitForChanges();

    expect(input.checked).toBeTruthy();
  });
});
