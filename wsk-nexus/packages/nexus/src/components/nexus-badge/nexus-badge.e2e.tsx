import { newE2EPage } from '@stencil/core/testing';

describe('nexus-badge', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-badge></nexus-badge>');
    const element = await page.find('nexus-badge');
    expect(element).toHaveClass('hydrated');
  });
});
