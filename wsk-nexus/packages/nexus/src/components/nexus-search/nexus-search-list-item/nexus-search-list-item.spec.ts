import { NexusSearchListItem } from './nexus-search-list-item';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-search-list-item', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusSearchListItem],
      html: '<nexus-search-list-item></nexus-search-list-item>'
    });

    expect(new NexusSearchListItem()).toBeTruthy();
    expect(page.root).toHaveClass('nexus-search-list-item');
  });
});
