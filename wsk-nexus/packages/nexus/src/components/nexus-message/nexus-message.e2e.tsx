import { newE2EPage } from '@stencil/core/testing';

describe('nexus-message', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-message></nexus-message>');
    const element = await page.find('nexus-message');
    expect(element).toHaveClass('hydrated');
  });
});
