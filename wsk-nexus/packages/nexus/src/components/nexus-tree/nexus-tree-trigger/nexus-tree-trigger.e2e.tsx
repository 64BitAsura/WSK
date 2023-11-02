import { newE2EPage } from '@stencil/core/testing';

describe('nexus-tree-trigger', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-tree-trigger></nexus-tree-trigger>');
    const element = await page.find('nexus-tree-trigger');
    expect(element).toHaveClass('hydrated');
  });
});
