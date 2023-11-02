import { newE2EPage } from '@stencil/core/testing';

describe('nexus-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-menu></nexus-menu>');
    const element = await page.find('nexus-menu');
    expect(element).toHaveClass('hydrated');
  });
});
