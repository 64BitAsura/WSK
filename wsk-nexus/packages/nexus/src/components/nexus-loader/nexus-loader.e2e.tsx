import { newE2EPage } from '@stencil/core/testing';

describe('nexus-loader', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-loader></nexus-loader>');
    const element = await page.find('nexus-loader');
    expect(element).toHaveClass('hydrated');
  });
});
