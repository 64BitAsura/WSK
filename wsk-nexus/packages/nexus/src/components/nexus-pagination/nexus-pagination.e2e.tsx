import { newE2EPage } from '@stencil/core/testing';

describe('nexus-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-pagination></nexus-pagination>');
    const element = await page.find('nexus-pagination');
    expect(element).toHaveClass('hydrated');
  });
});
