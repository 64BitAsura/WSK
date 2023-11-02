import { newE2EPage } from '@stencil/core/testing';

describe('nexus-option', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-option></nexus-option>');
    const element = await page.find('nexus-option');
    expect(element).toHaveClass('hydrated');
  });
});
