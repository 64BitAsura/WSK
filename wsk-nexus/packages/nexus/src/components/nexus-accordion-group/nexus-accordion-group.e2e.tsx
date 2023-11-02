import { newE2EPage } from '@stencil/core/testing';

describe('nexus-accordion-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-accordion-group></nexus-accordion-group>');
    const element = await page.find('nexus-accordion-group');
    expect(element).toHaveClass('hydrated');
  });
});
