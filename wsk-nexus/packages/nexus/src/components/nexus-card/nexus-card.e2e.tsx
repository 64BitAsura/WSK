import { newE2EPage } from '@stencil/core/testing';

describe('nexus-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-card></nexus-card>');
    const element = await page.find('nexus-card');
    expect(element).toHaveClass('hydrated');
  });
});
