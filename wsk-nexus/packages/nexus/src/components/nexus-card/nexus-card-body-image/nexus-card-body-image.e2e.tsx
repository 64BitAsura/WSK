import { newE2EPage } from '@stencil/core/testing';

describe('nexus-card-body-image', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-card-body-image></nexus-card-body-image>');
    const element = await page.find('nexus-card-body-image');
    expect(element).toHaveClass('hydrated');
  });
});
