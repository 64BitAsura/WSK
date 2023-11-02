import { NexusTabBar } from './nexus-tab-bar';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-tab-bar', () => {
  it('should have class', async () => {
    const page = await newSpecPage({
      components: [NexusTabBar],
      html: '<nexus-tab-bar></nexus-tab-bar>'
    });

    expect(page.root).toHaveClass('nexus-tab-bar');
  });
});
