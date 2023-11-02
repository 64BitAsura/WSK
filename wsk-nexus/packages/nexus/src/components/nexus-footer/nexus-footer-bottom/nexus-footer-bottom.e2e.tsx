import { newE2EPage } from '@stencil/core/testing';

describe('nexus-footer-bottom', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-footer-bottom></nexus-footer-bottom>');
    const element = await page.find('nexus-footer-bottom');
    expect(element).toHaveClass('hydrated');
  });
});
