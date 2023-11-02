import { NexusNotification } from './nexus-notification';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-notification', () => {
  it('should have class', async () => {
    const page = await newSpecPage({
      components: [NexusNotification],
      html: '<nexus-notification></nexus-notification>'
    });

    expect(page.root).toHaveClass('nexus-notification');
  });
});
