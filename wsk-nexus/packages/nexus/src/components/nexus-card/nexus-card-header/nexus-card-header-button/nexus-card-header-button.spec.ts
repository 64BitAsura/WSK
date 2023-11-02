import { NexusCardHeaderButton } from './nexus-card-header-button';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-card-header-button', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusCardHeaderButton],
      html: '<nexus-card-header-button></nexus-card-header-button>'
    });

    expect(page.root).toHaveClass('nexus-card-header-button');
  });
});
