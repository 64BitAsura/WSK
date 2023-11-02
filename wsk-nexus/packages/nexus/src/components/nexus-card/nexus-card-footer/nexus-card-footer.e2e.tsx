import { newE2EPage } from '@stencil/core/testing';

describe('nexus-card-footer', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-card-footer></nexus-card-footer>');
    const element = await page.find('nexus-card-footer');
    expect(element).toHaveClass('hydrated');
  });
});
