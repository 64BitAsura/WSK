import { NexusFooterBottom } from './nexus-footer-bottom';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-footer-bottom', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusFooterBottom],
      html: '<nexus-footer-bottom></nexus-footer-bottom>'
    });

    expect(new NexusFooterBottom()).toBeTruthy();
    expect(page.root).toHaveClass('nexus-footer-bottom');
  });
});
