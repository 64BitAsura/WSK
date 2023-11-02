import { NexusSearchList } from './nexus-search-list';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-search-list', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusSearchList],
      html: '<nexus-search-list></nexus-search-list>'
    });

    expect(new NexusSearchList()).toBeTruthy();
    expect(page.root).toHaveClass('nexus-search-list');
  });
});
