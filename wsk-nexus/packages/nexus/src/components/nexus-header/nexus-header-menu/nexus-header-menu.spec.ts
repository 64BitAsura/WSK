import { NexusHeaderMenu } from './nexus-header-menu';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-header-menu', () => {
  it('builds', () => {
    expect(new NexusHeaderMenu()).toBeTruthy();
  });

  it('should have class', async () => {
    const page = await newSpecPage({
      components: [NexusHeaderMenu],
      html: '<nexus-header-menu></nexus-header-menu>'
    });

    expect(new NexusHeaderMenu()).toBeTruthy();
    expect(page.root).toHaveClass('nexus-header-menu');
  });
});
