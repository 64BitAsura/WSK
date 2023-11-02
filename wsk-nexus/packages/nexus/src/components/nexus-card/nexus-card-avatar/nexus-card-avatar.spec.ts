import { NexusCardAvatar } from './nexus-card-avatar';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-card-avatar', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusCardAvatar],
      html: '<nexus-card-avatar></nexus-card-avatar>'
    });

    expect(page.root).toHaveClass('nexus-card-avatar');
  });
});
