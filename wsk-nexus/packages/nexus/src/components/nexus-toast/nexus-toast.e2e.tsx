import { newE2EPage } from '@stencil/core/testing';

describe('nexus-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-toast></nexus-toast>');
    const element = await page.find('nexus-toast');
    expect(element).toHaveClass('hydrated');
  });
});
