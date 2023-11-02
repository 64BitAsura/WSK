import { NexusMessage } from './nexus-message';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-message', () => {
  it('should have class', async () => {
    const page = await newSpecPage({
      components: [NexusMessage],
      html: '<nexus-message></nexus-message>'
    });

    expect(page.root.querySelector('p')).toHaveClass('nexus-message');
  });
});
