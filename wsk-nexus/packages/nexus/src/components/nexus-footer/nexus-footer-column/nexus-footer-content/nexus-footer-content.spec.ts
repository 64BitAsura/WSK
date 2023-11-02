import { NexusFooterContent } from './nexus-footer-content';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-footer-content', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusFooterContent],
      html: '<nexus-footer-content></nexus-footer-content>'
    });

    expect(new NexusFooterContent()).toBeTruthy();
    expect(page.root).toHaveClass('nexus-footer-content');
  });
});
