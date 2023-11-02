import { newE2EPage } from '@stencil/core/testing';

describe('nexus-card-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-card-header></nexus-card-header>');
    const element = await page.find('nexus-card-header');
    expect(element).toHaveClass('hydrated');
  });
});
