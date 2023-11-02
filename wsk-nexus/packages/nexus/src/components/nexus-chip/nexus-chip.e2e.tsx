import { newE2EPage } from '@stencil/core/testing';

describe('nexus-chip', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-chip></nexus-chip>');
    const element = await page.find('nexus-chip');
    expect(element).toHaveClass('hydrated');
  });
});
