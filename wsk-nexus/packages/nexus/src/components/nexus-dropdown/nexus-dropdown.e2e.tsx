import { newE2EPage } from '@stencil/core/testing';

describe('nexus-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-dropdown></nexus-dropdown>');
    const element = await page.find('nexus-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});
