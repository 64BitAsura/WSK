import { newE2EPage } from '@stencil/core/testing';

describe('nexus-search-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-search-list></nexus-search-list>');
    const element = await page.find('nexus-search-list');
    expect(element).toHaveClass('hydrated');
  });
});
