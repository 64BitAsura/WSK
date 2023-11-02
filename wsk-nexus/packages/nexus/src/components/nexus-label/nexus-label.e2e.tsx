import { newE2EPage } from '@stencil/core/testing';

describe('nexus-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-label></nexus-label>');
    const element = await page.find('nexus-label');
    expect(element).toHaveClass('hydrated');
  });
});
