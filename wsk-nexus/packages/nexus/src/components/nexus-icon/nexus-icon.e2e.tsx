import { newE2EPage } from '@stencil/core/testing';

describe('nexus-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nexus-icon src="/assets/icons/action/ic_3d_rotation_24px.svg"></nexus-icon>');
    const element = await page.find('nexus-icon');
    expect(element).toHaveClass('hydrated');
  });
});
