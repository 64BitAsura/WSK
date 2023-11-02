import { NexusModalBody } from './nexus-modal-body';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-modal-body', () => {
  it('should contain class', async () => {
    const page = await newSpecPage({
      components: [NexusModalBody],
      html: `<nexus-modal-body></nexus-modal-body>`
    });

    expect(page.root).toHaveClass('nexus-modal-body');
  });
});
