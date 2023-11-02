import { NexusHeader } from './nexus-header';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-header', () => {
  it('builds', () => {
    expect(new NexusHeader()).toBeTruthy();
  });

  it('should have class', async () => {
    const page = await newSpecPage({
      components: [NexusHeader],
      html: '<nexus-header></nexus-header>'
    });

    expect(page.root).toHaveClass('nexus-header');
  });
});
