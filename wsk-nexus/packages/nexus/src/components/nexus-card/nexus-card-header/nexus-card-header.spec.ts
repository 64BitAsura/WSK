import { NexusCardHeader } from './nexus-card-header';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-card-header', () => {
  it('should contain class', async () => {
    const page = await newSpecPage({
      components: [NexusCardHeader],
      html: '<nexus-card-header>Card header content.</nexus-card-header>'
    });

    expect(page.root).toHaveClass('nexus-card-header');
  });
});
