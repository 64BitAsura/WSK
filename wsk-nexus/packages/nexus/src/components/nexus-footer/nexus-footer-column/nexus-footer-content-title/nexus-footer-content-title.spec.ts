import { NexusFooterContentTitle } from './nexus-footer-content-title';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-footer-content-title', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusFooterContentTitle],
      html: '<nexus-footer-content-title></nexus-footer-content-title>'
    });

    expect(new NexusFooterContentTitle()).toBeTruthy();
    expect(page.root).toHaveClass('nexus-footer-content-title');
  });
});
