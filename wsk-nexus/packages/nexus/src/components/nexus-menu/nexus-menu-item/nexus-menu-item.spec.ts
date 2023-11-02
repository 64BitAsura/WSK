import { NexusMenuItem } from './nexus-menu-item';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-menu', () => {
  it('should have class', async () => {
    const page = await newSpecPage({
      components: [NexusMenuItem],
      html: '<nexus-menu-item></nexus-menu-item>'
    });

    expect(page.root).toHaveClass('nexus-menu-item');
  });
});
