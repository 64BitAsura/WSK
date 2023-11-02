import { newE2EPage } from '@stencil/core/testing';

describe('nexus-breadcrumb-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-breadcrumb-item></nexus-breadcrumb-item>');
    const element = await page.find('nexus-breadcrumb-item');
    expect(element).toHaveClass('hydrated');
  });
});
