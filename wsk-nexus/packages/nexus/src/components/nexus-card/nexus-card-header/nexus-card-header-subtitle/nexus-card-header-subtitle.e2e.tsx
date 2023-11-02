import { newE2EPage } from '@stencil/core/testing';

describe('nexus-card-header-subtitle', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-card-header-subtitle></nexus-card-header-subtitle>');
    const element = await page.find('nexus-card-header-subtitle');
    expect(element).toHaveClass('hydrated');
  });
});
