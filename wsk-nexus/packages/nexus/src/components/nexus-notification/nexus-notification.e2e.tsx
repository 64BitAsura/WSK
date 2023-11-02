import { newE2EPage } from '@stencil/core/testing';

describe('nexus-notification', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-notification></nexus-notification>');
    const element = await page.find('nexus-notification');
    expect(element).toHaveClass('hydrated');
  });
});
