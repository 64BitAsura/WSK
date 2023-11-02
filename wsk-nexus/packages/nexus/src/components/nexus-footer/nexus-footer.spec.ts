import { NexusFooter } from './nexus-footer';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-footer', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusFooter],
      html: '<nexus-footer></nexus-footer>'
    });

    expect(new NexusFooter()).toBeTruthy();
    expect(page.root).toHaveClass('nexus-footer');
  });
});
