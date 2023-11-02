import { newE2EPage } from '@stencil/core/testing';

describe('nexus-accordion-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-accordion-content></nexus-accordion-content>');
    const element = await page.find('nexus-accordion-content');
    expect(element).toHaveClass('hydrated');
  });
});
