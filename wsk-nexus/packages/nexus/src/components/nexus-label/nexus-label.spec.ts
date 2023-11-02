import { NexusLabel } from './nexus-label';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-label', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusLabel],
      html: `<nexus-label></nexus-label>`
    });

    const label = page.root.querySelector('label');

    expect(label).toHaveClass(`nexus-label`);
  });
});
