import { newE2EPage } from '@stencil/core/testing';

describe('nexus-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-input></nexus-input>');
    const element = await page.find('nexus-input');
    expect(element).toHaveClass('hydrated');
  });
});
