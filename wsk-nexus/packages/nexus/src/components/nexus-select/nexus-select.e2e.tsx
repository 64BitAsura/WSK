import { newE2EPage } from '@stencil/core/testing';

describe('nexus-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-select></nexus-select>');
    const element = await page.find('nexus-select');
    expect(element).toHaveClass('hydrated');
  });
});
