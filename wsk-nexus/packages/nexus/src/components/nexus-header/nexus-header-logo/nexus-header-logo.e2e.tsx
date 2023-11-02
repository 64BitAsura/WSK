import { newE2EPage } from '@stencil/core/testing';

describe('nexus-header-logo', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-header-logo></nexus-header-logo>');
    const element = await page.find('nexus-header-logo');
    expect(element).toHaveClass('hydrated');
  });
});
