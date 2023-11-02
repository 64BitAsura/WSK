import { newE2EPage } from '@stencil/core/testing';

describe('nexus-radio', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-radio></nexus-radio>');
    const element = await page.find('nexus-radio');
    expect(element).toHaveClass('hydrated');
  });
});
