import { NexusTreeContent } from './nexus-tree-content';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-tree-content', () => {
  it('should have class', async () => {
    const page = await newSpecPage({
      components: [NexusTreeContent],
      html: '<nexus-tree-content></nexus-tree-content>'
    });

    expect(page.root).toHaveClass('nexus-tree-content');
  });
});
