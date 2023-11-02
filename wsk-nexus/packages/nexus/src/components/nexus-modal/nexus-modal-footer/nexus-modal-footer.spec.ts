import { NexusModalFooter } from './nexus-modal-footer';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-modal-footer', () => {
  it('should contain class', async () => {
    const page = await newSpecPage({
      components: [NexusModalFooter],
      html: '<nexus-modal-footer></nexus-modal-footer>'
    });

    expect(page.root).toHaveClass('nexus-modal-footer');
  });
});
