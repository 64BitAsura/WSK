import { newE2EPage } from '@stencil/core/testing';

describe('nexus-footer-logo', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-footer-logo></nexus-footer-logo>');
    const element = await page.find('nexus-footer-logo');
    expect(element).toHaveClass('hydrated');
  });
});
