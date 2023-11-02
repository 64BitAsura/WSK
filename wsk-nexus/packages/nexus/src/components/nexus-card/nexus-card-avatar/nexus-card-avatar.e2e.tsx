import { newE2EPage } from '@stencil/core/testing';

describe('nexus-card-avatar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-card-avatar></nexus-card-avatar>');
    const element = await page.find('nexus-card-avatar');
    expect(element).toHaveClass('hydrated');
  });
});
