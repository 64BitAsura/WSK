import { newE2EPage } from '@stencil/core/testing';

describe('nexus-avatar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-avatar></nexus-avatar>');
    const element = await page.find('nexus-avatar');
    expect(element).toHaveClass('hydrated');
  });
});
