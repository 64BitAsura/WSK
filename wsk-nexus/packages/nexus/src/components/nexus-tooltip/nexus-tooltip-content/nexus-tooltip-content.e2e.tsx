import { newE2EPage } from '@stencil/core/testing';

describe('nexus-tooltip-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-tooltip-content></nexus-tooltip-content>');
    const element = await page.find('nexus-tooltip-content');
    expect(element).toHaveClass('hydrated');
  });
});
