import { newE2EPage } from '@stencil/core/testing';

describe('nexus-modal-body', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-modal-body></nexus-modal-body>');
    const element = await page.find('nexus-modal-body');
    expect(element).toHaveClass('hydrated');
  });
});
