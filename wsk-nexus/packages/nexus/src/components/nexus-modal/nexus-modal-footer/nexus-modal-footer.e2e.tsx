import { newE2EPage } from '@stencil/core/testing';

describe('nexus-modal-footer', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-modal-footer></nexus-modal-footer>');
    const element = await page.find('nexus-modal-footer');
    expect(element).toHaveClass('hydrated');
  });
});
