import { newE2EPage } from '@stencil/core/testing';

describe('nexus-file-upload', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-file-upload></nexus-file-upload>');
    const element = await page.find('nexus-file-upload');
    expect(element).toHaveClass('hydrated');
  });
});
