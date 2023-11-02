import { NexusAccordionContent } from './nexus-accordion-content';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-accordion-content', () => {
  it('should contain class', async () => {
    const page = await newSpecPage({
      components: [NexusAccordionContent],
      html: '<nexus-accordion-content></nexus-accordion-content>'
    });

    expect(page.root).toHaveClass('nexus-accordion-content');
  });
});
