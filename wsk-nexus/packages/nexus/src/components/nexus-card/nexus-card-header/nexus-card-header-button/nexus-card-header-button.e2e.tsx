import { newE2EPage } from '@stencil/core/testing';

describe('nexus-card-header-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-card-header-button></nexus-card-header-button>');
    const element = await page.find('nexus-card-header-button');
    expect(element).toHaveClass('hydrated');
  });
});
