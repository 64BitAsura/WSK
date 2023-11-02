import { newE2EPage } from '@stencil/core/testing';

describe('nexus-chip-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-chip-group></nexus-chip-group>');
    const element = await page.find('nexus-chip-group');
    expect(element).toHaveClass('hydrated');
  });
});
