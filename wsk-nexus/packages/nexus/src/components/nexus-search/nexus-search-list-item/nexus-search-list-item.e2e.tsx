import { newE2EPage } from '@stencil/core/testing';

describe('nexus-search-list-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-search-list-item></nexus-search-list-item>');
    const element = await page.find('nexus-search-list-item');
    expect(element).toHaveClass('hydrated');
  });
});
