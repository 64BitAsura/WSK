import { newE2EPage } from '@stencil/core/testing';

describe('nexus-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-search></nexus-search>');
    const element = await page.find('nexus-search');
    expect(element).toHaveClass('hydrated');
  });
});
