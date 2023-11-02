import { newE2EPage } from '@stencil/core/testing';

describe('nexus-card-header-title', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-card-header-title></nexus-card-header-title>');
    const element = await page.find('nexus-card-header-title');
    expect(element).toHaveClass('hydrated');
  });
});
