import { newE2EPage } from '@stencil/core/testing';

describe('nexus-carousel', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-carousel></nexus-carousel>');
    const element = await page.find('nexus-carousel');
    expect(element).toHaveClass('hydrated');
  });
});
