import { NexusTooltipTrigger } from './nexus-tooltip-trigger';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-tooltip-trigger', () => {
  it('should contain class', async () => {
    const page = await newSpecPage({
      components: [NexusTooltipTrigger],
      html: `<nexus-tooltip-trigger></nexus-tooltip-trigger>`
    });

    expect(page.root).toHaveClass('nexus-tooltip-trigger');
  });
});
