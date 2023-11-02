import { newE2EPage } from '@stencil/core/testing';

describe('nexus-menu-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-menu-item></nexus-menu-item>');
    const element = await page.find('nexus-menu-item');
    expect(element).toHaveClass('hydrated');
  });
});
