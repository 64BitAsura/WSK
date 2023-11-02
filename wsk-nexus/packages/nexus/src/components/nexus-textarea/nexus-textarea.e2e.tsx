import { newE2EPage } from '@stencil/core/testing';

describe('nexus-textarea', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-textarea></nexus-textarea>');
    const element = await page.find('nexus-textarea');
    expect(element).toHaveClass('hydrated');
  });
});
