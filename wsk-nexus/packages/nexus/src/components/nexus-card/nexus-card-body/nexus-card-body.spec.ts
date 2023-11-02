import { NexusCardBody } from './nexus-card-body';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-card-body', () => {
  it('should contain class', async () => {
    const page = await newSpecPage({
      components: [NexusCardBody],
      html: '<nexus-card-body>Card body content.</nexus-card-body>'
    });

    expect(page.root).toHaveClass('nexus-card-body');
  });
});
