import { newE2EPage } from '@stencil/core/testing';

describe('nexus-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-header></nexus-header>');
    const element = await page.find('nexus-header');
    expect(element).toHaveClass('hydrated');
  });
});
