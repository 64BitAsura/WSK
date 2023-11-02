import { newE2EPage } from '@stencil/core/testing';

describe('nexus-card-body', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-card-body></nexus-card-body>');
    const element = await page.find('nexus-card-body');
    expect(element).toHaveClass('hydrated');
  });
});
