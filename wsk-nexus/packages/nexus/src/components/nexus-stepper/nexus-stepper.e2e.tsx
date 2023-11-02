import { newE2EPage } from '@stencil/core/testing';

describe('nexus-stepper', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-stepper></nexus-stepper>');
    const element = await page.find('nexus-stepper');
    expect(element).toHaveClass('hydrated');
  });
});
