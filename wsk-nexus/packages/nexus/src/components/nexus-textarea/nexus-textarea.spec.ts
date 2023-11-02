import { newSpecPage } from '@stencil/core/testing';
import { NexusTextarea } from './nexus-textarea';

const nexTxtareaCls = 'nexus-textarea-';

describe('NexusTextarea', () => {
  it('should contain class', async () => {
    const page = await newSpecPage({
      components: [NexusTextarea],
      html: `<nexus-textarea></nexus-textarea>`
    });

    const textarea = page.root.querySelector('textarea');

    expect(textarea).toHaveClass('nexus-textarea');
  });

  it('should set a default id if none exists', async () => {
    const page = await newSpecPage({
      components: [NexusTextarea],
      html: `<nexus-textarea></nexus-textarea>`
    });

    const textarea = page.root.querySelector('textarea');

    expect(textarea.id).toContain(nexTxtareaCls);
  });

  it('should set a default id on multiple textareas if none exists', async () => {
    const page = await newSpecPage({
      components: [NexusTextarea],
      html: `<nexus-textarea></nexus-textarea><nexus-textarea></nexus-textarea>`
    });

    const textareas = page.body.querySelectorAll('textarea');

    expect(textareas[0].id).toContain(nexTxtareaCls);
    expect(textareas[1].id).toContain(nexTxtareaCls);
  });

  it('should overwrite default id if one exists', async () => {
    const page = await newSpecPage({
      components: [NexusTextarea],
      html: `<nexus-textarea attr-id="custom-id"></nexus-textarea>`
    });

    const textarea = page.root.querySelector('textarea');

    expect(textarea.id).toEqual('custom-id');
  });

  it('should set the maxlength attribute', async () => {
    const page = await newSpecPage({
      components: [NexusTextarea],
      html: `<nexus-textarea max-length="3"></nexus-textarea>`
    });

    const textarea = page.root;
    const maxLength = 3;

    expect(textarea.maxLength).toEqual(maxLength);
  });

  it('should set the minlength ', async () => {
    const page = await newSpecPage({
      components: [NexusTextarea],
      html: `<nexus-textarea min-length="3"></nexus-textarea>`
    });

    const textarea = page.root;

    const minLength = 3;

    expect(textarea.minLength).toEqual(minLength);
  });

  it('should set the disabled attribute', async () => {
    const page = await newSpecPage({
      components: [NexusTextarea],
      html: `<nexus-textarea disabled></nexus-textarea>`
    });

    const textarea = page.root;

    expect(textarea.disabled).toBeTruthy();
  });

  it('should emit the change event on input', async () => {
    const page = await newSpecPage({
      components: [NexusTextarea],
      html: `<nexus-textarea></nexus-textarea>`
    });

    const input = page.root.querySelector('textarea');

    const changeEvent = new Event('input');

    input.value = 'foo';
    input.dispatchEvent(changeEvent);

    await page.waitForChanges();

    expect(input.value).toEqual('foo');
  });

  it('should set the placeholder attribute', async () => {
    const page = await newSpecPage({
      components: [NexusTextarea],
      html: `<nexus-textarea placeholder="Please Enter Text"></nexus-textarea>`
    });

    const textarea = page.root;

    expect(textarea.placeholder).toEqual('Please Enter Text');
  });

  it('should set the required attribute', async () => {
    const page = await newSpecPage({
      components: [NexusTextarea],
      html: `<nexus-textarea required></nexus-textarea>`
    });

    const textarea = page.root;

    expect(textarea.required).toBeTruthy();
  });

  it('should set the disabled attribute', async () => {
    const disabled = false;

    const page = await newSpecPage({
      components: [NexusTextarea],
      html: `<nexus-textarea disabled=${disabled}></nexus-textarea>`
    });

    page.root.disabled = true;

    expect(page.root.disabled).toBeTruthy();
  });
});
