import { newE2EPage } from '@stencil/core/testing';

describe('nexus-breadcrumb', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-breadcrumb></nexus-breadcrumb>');
    const element = await page.find('nexus-breadcrumb');
    expect(element).toHaveClass('hydrated');
  });
});
