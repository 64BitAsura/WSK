import { newE2EPage } from '@stencil/core/testing';

describe('nexus-progress-bar-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-progress-bar-label></nexus-progress-bar-label>');
    const element = await page.find('nexus-progress-bar-label');
    expect(element).toHaveClass('hydrated');
  });
});
