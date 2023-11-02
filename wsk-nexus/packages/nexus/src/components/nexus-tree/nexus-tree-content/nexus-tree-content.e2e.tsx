import { newE2EPage } from '@stencil/core/testing';

describe('nexus-tree-content', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-tree-content></nexus-tree-content>');
    const element = await page.find('nexus-tree-content');
    expect(element).toHaveClass('hydrated');
  });
});
