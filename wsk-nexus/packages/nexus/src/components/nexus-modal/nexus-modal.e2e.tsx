import { newE2EPage } from '@stencil/core/testing';

describe('nexus-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-modal></nexus-modal>');
    const element = await page.find('nexus-modal');
    expect(element).toHaveClass('hydrated');
  });
});
