import { NexusHeaderLogo } from './nexus-header-logo';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-header', () => {
  it('builds', () => {
    expect(new NexusHeaderLogo()).toBeTruthy();
  });

  it('should have class', async () => {
    const page = await newSpecPage({
      components: [NexusHeaderLogo],
      html: '<nexus-header-logo></nexus-header-logo>'
    });

    expect(page.root).toHaveClass('nexus-header-logo');
  });
});
