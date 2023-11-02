import { newE2EPage } from '@stencil/core/testing';

describe('nexus-header-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-header-menu></nexus-header-menu>');
    const element = await page.find('nexus-header-menu');
    expect(element).toHaveClass('hydrated');
  });
});
