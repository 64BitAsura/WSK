import { newE2EPage } from '@stencil/core/testing';

describe('nexus-error-message', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-error-message></nexus-error-message>');
    const element = await page.find('nexus-error-message');
    expect(element).toHaveClass('hydrated');
  });
});
