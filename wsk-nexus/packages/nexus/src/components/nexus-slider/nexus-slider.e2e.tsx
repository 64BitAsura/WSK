import { newE2EPage } from '@stencil/core/testing';

describe('nexus-slider', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-slider></nexus-slider>');
    const element = await page.find('nexus-slider');
    expect(element).toHaveClass('hydrated');
  });
});
