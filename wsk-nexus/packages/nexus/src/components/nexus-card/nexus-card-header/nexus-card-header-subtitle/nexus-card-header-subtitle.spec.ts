import { NexusCardHeaderSubtitle } from './nexus-card-header-subtitle';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-card-header-subtitle', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusCardHeaderSubtitle],
      html: '<nexus-card-header-subtitle></nexus-card-header-subtitle>'
    });

    expect(page.root).toHaveClass('nexus-card-header-subtitle');
  });
});
