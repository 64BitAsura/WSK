import { NexusErrorMessage } from './nexus-error-message';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-error-message', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusErrorMessage],
      html: '<nexus-error-message></nexus-error-message>'
    });

    const paragraph = page.root.querySelector('p');

    expect(paragraph).toHaveClass('nexus-error-message');
  });
});
