import { newE2EPage } from '@stencil/core/testing';

describe('nexus-form-field', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<nexus-form-field></nexus-form-field>');
    const element = await page.find('nexus-form-field');
    expect(element).toHaveClass('hydrated');
  });
});
