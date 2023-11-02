import { NexusModalHeader } from './nexus-modal-header';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-modal-header', () => {
  it('should contain class', async () => {
    const page = await newSpecPage({
      components: [NexusModalHeader],
      html: `<nexus-modal-header></nexus-modal-header>`
    });

    expect(page.root).toHaveClass('nexus-modal-header');
  });

  it('should emit a close event', async () => {
    const page = await newSpecPage({
      components: [NexusModalHeader],
      html: `<nexus-modal-header></nexus-modal-header>`
    });

    const header = page.rootInstance;
    jest.spyOn(header.closeEvent, 'emit');

    page.waitForChanges();

    const button = page.root.querySelector('button');

    const event = new Event('click', {
      bubbles: true
    });

    button.dispatchEvent(event);

    expect(header.closeEvent.emit).toHaveBeenCalled();
  });
});
