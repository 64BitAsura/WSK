import { newE2EPage } from '@stencil/core/testing';

describe('nexus-accordion-trigger', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-accordion-trigger></nexus-accordion-trigger>');
    const element = await page.find('nexus-accordion-trigger');
    expect(element).toHaveClass('hydrated');
  });
});
