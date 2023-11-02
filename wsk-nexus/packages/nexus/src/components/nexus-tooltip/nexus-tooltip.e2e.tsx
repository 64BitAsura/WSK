import { newE2EPage } from '@stencil/core/testing';

describe('nexus-tooltip', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-tooltip></nexus-tooltip>');
    const element = await page.find('nexus-tooltip');
    expect(element).toHaveClass('hydrated');
  });
});
