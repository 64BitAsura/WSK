import { newE2EPage } from '@stencil/core/testing';

describe('nexus-toggle', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-toggle></nexus-toggle>');
    const element = await page.find('nexus-toggle');
    expect(element).toHaveClass('hydrated');
  });
});
