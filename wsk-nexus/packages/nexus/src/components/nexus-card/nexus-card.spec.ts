import { NexusCard } from './nexus-card';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-card', () => {
  it('should contain class', async () => {
    const page = await newSpecPage({
      components: [NexusCard],
      html: '<nexus-card>Card content.</nexus-card>'
    });

    expect(page.root).toHaveClass('nexus-card');
  });

  it('should allow the entire card to be clickable', async () => {
    const page = await newSpecPage({
      components: [NexusCard],
      html: '<nexus-card clickable="true">Card content.</nexus-card>'
    });

    expect(page.root).toHaveClass('nexus-card-clickable');
  });

  it('should set the background image', async () => {
    const page = await newSpecPage({
      components: [NexusCard],
      html: '<nexus-card bg-image="image.jpg">Card content.</nexus-card>'
    });

    expect(page.root.style.backgroundImage).toBe(`url(image.jpg)`);
  });
});
