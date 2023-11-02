import { newE2EPage } from '@stencil/core/testing';

describe('nexus-modal-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-modal-header></nexus-modal-header>');
    const element = await page.find('nexus-modal-header');
    expect(element).toHaveClass('hydrated');
  });
});
