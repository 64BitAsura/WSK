import { NexusTreeTrigger } from './nexus-tree-trigger';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-tree-trigger', () => {
  it('should have class', async () => {
    const page = await newSpecPage({
      components: [NexusTreeTrigger],
      html: '<nexus-tree-trigger></nexus-tree-trigger>'
    });

    expect(page.root).toHaveClass('nexus-tree-trigger');
  });
});
