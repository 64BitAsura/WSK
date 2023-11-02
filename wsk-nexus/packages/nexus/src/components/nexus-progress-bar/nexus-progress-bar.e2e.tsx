import { newE2EPage } from '@stencil/core/testing';

describe('nexus-progress-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-progress-bar></nexus-progress-bar>');
    const element = await page.find('nexus-progress-bar');
    expect(element).toHaveClass('hydrated');
  });
});
