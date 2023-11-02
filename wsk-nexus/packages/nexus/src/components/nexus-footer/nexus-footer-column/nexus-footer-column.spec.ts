import { NexusFooterColumn } from './nexus-footer-column';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-footer-column', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusFooterColumn],
      html: '<nexus-footer-column></nexus-footer-column>'
    });

    expect(new NexusFooterColumn()).toBeTruthy();
    expect(page.root).toHaveClass('nexus-footer-column');
  });
});
