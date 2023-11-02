import { NexusCardHeaderDetails } from './nexus-card-header-details';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-card-header-details', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusCardHeaderDetails],
      html: '<nexus-card-header-details></nexus-card-header-details>'
    });

    expect(page.root).toHaveClass('nexus-card-header-details');
  });
});
