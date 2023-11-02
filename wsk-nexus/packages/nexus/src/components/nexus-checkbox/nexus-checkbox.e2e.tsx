import { newE2EPage } from '@stencil/core/testing';

describe('nexus-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-checkbox></nexus-checkbox>');
    const element = await page.find('nexus-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});
