import { newE2EPage } from '@stencil/core/testing';

describe('nexus-card-header-details', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-card-header-details></nexus-card-header-details>');
    const element = await page.find('nexus-card-header-details');
    expect(element).toHaveClass('hydrated');
  });
});
