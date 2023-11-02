import { NexusCarouselItem } from './nexus-carousel-item';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-carousel-item', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusCarouselItem],
      html: '<nexus-carousel-item></nexus-carousel-item>'
    });

    expect(new NexusCarouselItem()).toBeTruthy();
    expect(page.root).toHaveClass('nexus-carousel-item');
  });
});
