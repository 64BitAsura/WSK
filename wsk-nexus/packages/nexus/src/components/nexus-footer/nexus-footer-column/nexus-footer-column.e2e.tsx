import { newE2EPage } from '@stencil/core/testing';

describe('nexus-footer-column', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-footer-column></nexus-footer-column>');
    const element = await page.find('nexus-footer-column');
    expect(element).toHaveClass('hydrated');
  });
});
