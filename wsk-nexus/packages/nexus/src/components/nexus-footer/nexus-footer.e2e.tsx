import { newE2EPage } from '@stencil/core/testing';

describe('nexus-footer', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-footer></nexus-footer>');
    const element = await page.find('nexus-footer');
    expect(element).toHaveClass('hydrated');
  });
});
