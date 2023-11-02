import { newE2EPage } from '@stencil/core/testing';

describe('nexus-tree', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-tree></nexus-tree>');
    const element = await page.find('nexus-tree');
    expect(element).toHaveClass('hydrated');
  });
});
