import { newE2EPage } from '@stencil/core/testing';

describe('nexus-footer-content-title', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-footer-content-title></nexus-footer-content-title>');
    const element = await page.find('nexus-footer-content-title');
    expect(element).toHaveClass('hydrated');
  });
});
