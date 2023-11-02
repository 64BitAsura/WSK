import { NexusTooltipContent } from './nexus-tooltip-content';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-tooltip-content', () => {
  it('should contain class', async () => {
    const page = await newSpecPage({
      components: [NexusTooltipContent],
      html: `<nexus-tooltip-content></nexus-tooltip-content>`
    });

    expect(page.root).toHaveClass('nexus-tooltip-content');
  });
});
