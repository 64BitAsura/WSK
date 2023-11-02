import { NexusFooterLogo } from './nexus-footer-logo';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-footer-logo', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusFooterLogo],
      html: '<nexus-footer-logo></nexus-footer-logo>'
    });

    expect(new NexusFooterLogo()).toBeTruthy();
    expect(page.root).toHaveClass('nexus-footer-logo');
  });
});
