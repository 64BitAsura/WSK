import { NexusToggle } from './nexus-toggle';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-toggle', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusToggle],
      html: '<nexus-toggle></nexus-toggle>'
    });

    const toggle = page.body.querySelector('input');

    expect(toggle).toHaveClass('nexus-toggle-input');
  });

  it('renders class for button type', async () => {
    const page = await newSpecPage({
      components: [NexusToggle],
      html: '<nexus-toggle type="button"></nexus-toggle>'
    });

    expect(page.root.querySelectorAll('.nexus-toggle-button-wrapper').length).toEqual(1);
  });

  it('should have toggled attribute', async () => {
    const toggled = true;

    const page = await newSpecPage({
      components: [NexusToggle],
      html: `<nexus-toggle toggled="${toggled}"></nexus-toggle>`
    });

    const checkbox = page.root.querySelector('input');

    expect(checkbox.checked).toBeTruthy();
  });

  it('should render the disabled toggle', async () => {
    const page = await newSpecPage({
      components: [NexusToggle],
      html: `<nexus-toggle disabled></nexus-toggle>`
    });

    const toggle = page.root.querySelector('input');

    expect(toggle.disabled).toBeTruthy();
    expect(toggle.value).toEqual('');
  });

  it('should set the disabled attribute', async () => {
    const disabled = true;

    const page = await newSpecPage({
      components: [NexusToggle],
      html: `<nexus-toggle disabled="${disabled}"></nexus-toggle>`
    });

    const toggle = page.root.querySelector('input');

    expect(toggle.disabled).toBeTruthy();
    expect(toggle.value).toEqual('');
  });

  it('should add the required attribute', async () => {
    const required = true;

    const page = await newSpecPage({
      components: [NexusToggle],
      html: `<nexus-toggle required="${required}"></nexus-toggle>`
    });

    const toggle = page.root.querySelector('input');

    expect(toggle.required).toBeTruthy();
  });

  it('should set the id', async () => {
    const id = `custom-id`;

    const page = await newSpecPage({
      components: [NexusToggle],
      html: `<nexus-toggle attr-id="${id}"></nexus-toggle>`
    });

    const toggle = page.root.querySelector('input');

    expect(toggle.id).toBe(id);
  });

  it('should toggle true on change', async () => {
    const page = await newSpecPage({
      components: [NexusToggle],
      html: `<nexus-toggle></nexus-toggle>`
    });

    const toggle = page.root.querySelector('input');

    expect(toggle.checked).toBeFalsy();

    const changeEvent = new Event('change');

    toggle.checked = true;
    toggle.dispatchEvent(changeEvent);

    await page.waitForChanges();

    expect(toggle.checked).toBeTruthy();
  });

  it('should toggle false on change', async () => {
    const page = await newSpecPage({
      components: [NexusToggle],
      html: `<nexus-toggle toggled></nexus-toggle>`
    });

    const toggle = page.root.querySelector('input');

    expect(toggle.checked).toBeTruthy();

    const changeEvent = new Event('change');

    toggle.checked = false;
    toggle.dispatchEvent(changeEvent);

    await page.waitForChanges();

    expect(toggle.checked).toBeFalsy();
  });

  it('should not toggle true when disabled on change', async () => {
    const page = await newSpecPage({
      components: [NexusToggle],
      html: `<nexus-toggle disabled></nexus-toggle>`
    });

    const toggle = page.root.querySelector('input');

    expect(toggle.checked).toBeFalsy();

    toggle.click();

    await page.waitForChanges();

    expect(toggle.checked).toBeFalsy();
  });

  it('should set the toggle to true when clicked on label and toggle back', async () => {
    const page = await newSpecPage({
      components: [NexusToggle],
      html: `<nexus-toggle label-inactive="off" label-active="on"></nexus-toggle>`
    });

    const toggleLabelToActivate = page.root.querySelector('.nexus-toggle-label-right') as HTMLElement;
    const toggle = page.root.querySelector('input');

    expect(toggle.checked).toBeFalsy();
    toggleLabelToActivate.click();

    await page.waitForChanges();
    expect(toggle.checked).toBeTruthy();

    const toggleLabelToDeActivate = page.root.querySelector('.nexus-toggle-label-left') as HTMLElement;
    toggleLabelToDeActivate.click();

    await page.waitForChanges();
    expect(toggle.checked).toBeFalsy();
  });

  it('should not show labels when label properties are not passed to the component', async () => {
    const page = await newSpecPage({
      components: [NexusToggle],
      html: `<nexus-toggle></nexus-toggle>`
    });

    const toggleLabelToActivate = page.root.querySelector('.nexus-toggle-label-right') as HTMLElement;
    const toggle = page.root.querySelector('input');
    const toggleLabelToDeActivate = page.root.querySelector('.nexus-toggle-label-left') as HTMLElement;

    expect(toggleLabelToActivate).toEqual(null);
    expect(toggleLabelToDeActivate).toEqual(null);

    expect(toggle.checked).toBeFalsy();
    toggle.click();

    const changeEvent = new Event('change');

    toggle.checked = true;
    toggle.dispatchEvent(changeEvent);

    await page.waitForChanges();

    expect(toggle.checked).toBeTruthy();
  });
});

describe('nexus-toggle keyboard events', () => {
  it('should call handleClick on space', async () => {
    const page = await newSpecPage({
      components: [NexusToggle],
      html: '<nexus-toggle></nexus-toggle>'
    });
    const toggle = page.root.querySelector('input');
    expect(toggle.checked).toBeFalsy();
    const event = new KeyboardEvent('keydown', { key: 'Space', bubbles: true });
    toggle.checked = true;
    toggle.dispatchEvent(event);
    await page.waitForChanges();
    expect(toggle.checked).toBeTruthy();
    toggle.addEventListener('keydown', jest.fn());

    const enterEvent = new KeyboardEvent('keydown', { code: 'Enter' });
    page.root.dispatchEvent(enterEvent);
    await page.waitForChanges();
    expect(page.rootInstance.toggled).toBeTruthy();
  });
});
