import { NexusRadio } from './nexus-radio';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-radio', () => {
  it('should have the global class', async () => {
    const page = await newSpecPage({
      components: [NexusRadio],
      html: '<nexus-radio></nexus-radio>'
    });
    const label = page.root.querySelector('label');

    expect(label).toHaveClass('nexus-radio');
  });

  it('should set the name', async () => {
    const name = 'custom-name';

    const page = await newSpecPage({
      components: [NexusRadio],
      html: `<nexus-radio name="${name}"></nexus-radio>`
    });
    const input = page.root.querySelector('input');

    expect(input.name).toEqual(name);
  });

  it('should set the id', async () => {
    const id = 'custom-id';

    const page = await newSpecPage({
      components: [NexusRadio],
      html: `<nexus-radio attr-id="${id}"></nexus-radio>`
    });
    const input = page.root.querySelector('input');

    expect(input.id).toEqual(id);
  });

  it('should set the value', async () => {
    const value = 'custom-value';

    const page = await newSpecPage({
      components: [NexusRadio],
      html: `<nexus-radio value="${value}"></nexus-radio>`
    });
    const input = page.root.querySelector('input');

    expect(input.value).toEqual(value);
  });

  it('should set the checked state', async () => {
    const checked = true;

    const page = await newSpecPage({
      components: [NexusRadio],
      html: `<nexus-radio checked="${checked}"></nexus-radio>`
    });
    const input = page.root.querySelector('input');

    expect(input.checked).toEqual(checked);
  });

  it('should set the required state', async () => {
    const required = true;

    const page = await newSpecPage({
      components: [NexusRadio],
      html: `<nexus-radio required="${required}"></nexus-radio>`
    });
    const input = page.root.querySelector('input');

    expect(input.required).toEqual(required);
  });

  it('should set the disabled state', async () => {
    const disabled = true;

    const page = await newSpecPage({
      components: [NexusRadio],
      html: `<nexus-radio disabled="${disabled}"></nexus-radio>`
    });
    const input = page.root.querySelector('input');

    expect(input.disabled).toEqual(disabled);
  });
});
