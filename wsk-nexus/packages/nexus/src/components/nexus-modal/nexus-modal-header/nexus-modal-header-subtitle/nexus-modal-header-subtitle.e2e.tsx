import { newE2EPage } from '@stencil/core/testing';

describe('nexus-modal-header-subtitle', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-modal-header-subtitle></nexus-modal-header-subtitle>');
    const element = await page.find('nexus-modal-header-subtitle');
    expect(element).toHaveClass('hydrated');
  });
});
