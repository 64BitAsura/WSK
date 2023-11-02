import { newE2EPage } from '@stencil/core/testing';

describe('nexus-footer-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-footer-content></nexus-footer-content>');
    const element = await page.find('nexus-footer-content');
    expect(element).toHaveClass('hydrated');
  });
});
