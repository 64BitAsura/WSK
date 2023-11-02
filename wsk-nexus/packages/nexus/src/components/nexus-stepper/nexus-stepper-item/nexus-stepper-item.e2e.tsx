import { newE2EPage } from '@stencil/core/testing';

describe('nexus-stepper-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-stepper-item></nexus-stepper-item>');
    const element = await page.find('nexus-stepper-item');
    expect(element).toHaveClass('hydrated');
  });
});
