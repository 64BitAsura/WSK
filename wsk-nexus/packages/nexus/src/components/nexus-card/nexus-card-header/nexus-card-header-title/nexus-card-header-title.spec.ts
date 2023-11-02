import { NexusCardHeaderTitle } from './nexus-card-header-title';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-card-header-title', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusCardHeaderTitle],
      html: '<nexus-card-header-title></nexus-card-header-title>'
    });

    expect(page.root).toHaveClass('nexus-card-header-title');
  });
});
