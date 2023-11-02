import { NexusProgressBarLabel } from './nexus-progress-bar-label';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-progress-bar-label', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusProgressBarLabel],
      html: '<nexus-progress-bar-label></nexus-progress-bar-label>'
    });

    expect(new NexusProgressBarLabel()).toBeTruthy();
    expect(page.root).toHaveClass('nexus-progress-bar-label');
  });
});
