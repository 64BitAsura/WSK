import { NexusCardFooter } from './nexus-card-footer';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-card-footer', () => {
  it('should contain class', async () => {
    const page = await newSpecPage({
      components: [NexusCardFooter],
      html: '<nexus-card-footer>Card footer content.</nexus-card-footer>'
    });

    expect(page.root).toHaveClass('nexus-card-footer');
  });
});
