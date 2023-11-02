import { newE2EPage } from '@stencil/core/testing';

describe('nexus-accordion', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-accordion></nexus-accordion>');
    const element = await page.find('nexus-accordion');
    expect(element).toHaveClass('hydrated');
  });
});
