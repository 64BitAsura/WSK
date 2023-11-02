import { newE2EPage } from '@stencil/core/testing';

describe('nexus-tooltip-trigger', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-tooltip-trigger></nexus-tooltip-trigger>');
    const element = await page.find('nexus-tooltip-trigger');
    expect(element).toHaveClass('hydrated');
  });
});
