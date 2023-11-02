import { newE2EPage } from '@stencil/core/testing';

describe('nexus-tab-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-tab-bar></nexus-tab-bar>');
    const element = await page.find('nexus-tab-bar');
    expect(element).toHaveClass('hydrated');
  });
});
