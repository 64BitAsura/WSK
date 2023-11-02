import { NexusMenu } from './nexus-menu';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-menu', () => {
  it('should have class', async () => {
    const page = await newSpecPage({
      components: [NexusMenu],
      html: '<nexus-menu></nexus-menu>'
    });

    expect(page.root).toHaveClass('nexus-menu');
  });

  it('should emit a close event', async () => {
    const page = await newSpecPage({
      components: [NexusMenu],
      html: `<nexus-menu></nexus-menu>`
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
