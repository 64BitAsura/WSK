import { NexusCardBodyImage } from './nexus-card-body-image';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-card-body-image', () => {
  it('should contain class', async () => {
    const page = await newSpecPage({
      components: [NexusCardBodyImage],
      html: '<nexus-card-body-image><img src="./assets/images/card-image.jpg" alt="woman on glacier with EY in the center" /></nexus-card-body-image>'
    });

    expect(page.root).toHaveClass('nexus-card-body-image');
  });
});
