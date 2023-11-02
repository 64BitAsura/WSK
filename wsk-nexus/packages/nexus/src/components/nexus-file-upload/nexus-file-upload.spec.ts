import { NexusFileUpload } from './nexus-file-upload';
import { newSpecPage } from '@stencil/core/testing';

const nexFilUpldCls = 'nexus-file-upload-drag-over';
describe('nexus-file-upload', () => {
  it('should have class', async () => {
    const page = await newSpecPage({
      components: [NexusFileUpload],
      html: '<nexus-file-upload></nexus-file-upload>'
    });

    expect(page.root).toHaveClass('nexus-file-upload');
  });

  it('should set the multiple attribute', async () => {
    const page = await newSpecPage({
      components: [NexusFileUpload],
      html: `<nexus-file-upload multiple></nexus-file-upload>`
    });

    const input = page.root.querySelector('input');

    expect(input.multiple).toBeTruthy();
  });

  it('should set the disabled attribute', async () => {
    const page = await newSpecPage({
      components: [NexusFileUpload],
      html: `<nexus-file-upload disabled></nexus-file-upload>`
    });

    const input = page.root.querySelector('input');

    expect(input.disabled).toBeTruthy();
  });

  it('should set the required attribute', async () => {
    const page = await newSpecPage({
      components: [NexusFileUpload],
      html: `<nexus-file-upload required></nexus-file-upload>`
    });

    const input = page.root.querySelector('input');

    expect(input.required).toBeTruthy();
  });

  it('should set a default id if none exists', async () => {
    const page = await newSpecPage({
      components: [NexusFileUpload],
      html: `<nexus-file-upload></nexus-file-upload>`
    });

    const input = page.root.querySelector('input');

    expect(input.id).toContain('nexus-file-upload-');
  });

  it('should overwrite default id if one exists', async () => {
    const page = await newSpecPage({
      components: [NexusFileUpload],
      html: `<nexus-file-upload attr-id="custom-id"></nexus-file-upload>`
    });

    const input = page.root.querySelector('input');

    expect(input.id).toEqual('custom-id');
  });

  it('should add and remove classes on drag events', async () => {
    const page = await newSpecPage({
      components: [NexusFileUpload],
      html: `<nexus-file-upload></nexus-file-upload>`
    });

    const label = page.root.querySelector('label');

    const dragenterEvent = new Event('dragenter', {
      bubbles: true
    });

    const dragoverEvent = new Event('dragover', {
      bubbles: true
    });

    const dragleaveEvent = new Event('dragleave', {
      bubbles: true
    });

    const dropEvent = new Event('drop', {
      bubbles: true
    });

    label.dispatchEvent(dragenterEvent);
    label.dispatchEvent(dragoverEvent);
    expect(page.root).toHaveClass(nexFilUpldCls);

    label.dispatchEvent(dragleaveEvent);
    expect(page.root).not.toHaveClass(nexFilUpldCls);

    label.dispatchEvent(dragenterEvent);
    expect(page.root).toHaveClass(nexFilUpldCls);

    label.dispatchEvent(dropEvent);
    expect(page.root).not.toHaveClass(nexFilUpldCls);
  });

  it('should dispatch the change event', async () => {
    const page = await newSpecPage({
      components: [NexusFileUpload],
      html: `<nexus-file-upload></nexus-file-upload>`
    });

    const input = page.root.querySelector('input');

    page.waitForChanges();

    jest.spyOn(input, 'dispatchEvent');
    page.rootInstance.handleDrop({
      preventDefault: () => null,
      dataTransfer: {
        files: []
      }
    });

    expect(input.dispatchEvent).toHaveBeenCalled();
  });
});
