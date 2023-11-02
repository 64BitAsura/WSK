import { newE2EPage } from '@stencil/core/testing';

describe('nexus-carousel-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-carousel-item></nexus-carousel-item>');
    const element = await page.find('nexus-carousel-item');
    expect(element).toHaveClass('hydrated');
  });
});
