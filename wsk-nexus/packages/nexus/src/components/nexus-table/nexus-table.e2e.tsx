import { newE2EPage } from '@stencil/core/testing';

describe('nexus-table', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-table></nexus-table>');
    const element = await page.find('nexus-table');
    expect(element).toHaveClass('hydrated');
  });
});
