import { NexusBadge } from './nexus-badge';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-badge', () => {
  it('should contain class', async () => {
    const page = await newSpecPage({
      components: [NexusBadge],
      html: '<nexus-badge></nexus-badge>'
    });

    expect(page.root).toHaveClass('nexus-badge');
  });

  it('should contain the overlap class as specified', async () => {
    const page = await newSpecPage({
      components: [NexusBadge],
      html: '<nexus-badge overlap="true"></nexus-badge>'
    });

    expect(page.root).toHaveClass('nexus-badge-overlap');
  });
});
