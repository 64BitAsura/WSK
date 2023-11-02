import { newE2EPage } from '@stencil/core/testing';

describe('nexus-pin-entry', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-pin-entry></nexus-pin-entry>');
    const element = await page.find('nexus-pin-entry');
    expect(element).toHaveClass('hydrated');
  });
});
