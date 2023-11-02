import { NexusAccordionTrigger } from './nexus-accordion-trigger';
import { newSpecPage } from '@stencil/core/testing';

const nexAccClass = 'nexus-accordion-trigger';

const declrComp = (htmlString: string) => {
  const page = newSpecPage({
    components: [NexusAccordionTrigger],
    html: htmlString
  });

  return page;
};

describe('check nexus-accordion-trigger', () => {
  it('should contain class', async () => {
    const page = await declrComp('<nexus-accordion-trigger></nexus-accordion-trigger>');
    expect(page.root.querySelector('button')).toHaveClass(nexAccClass);
    expect(page.root.querySelectorAll('.show-content-at-start').length).toEqual(1);
  });

  it('should contain class show-content-at-center', async () => {
    const page = await declrComp('<nexus-accordion-trigger align="center"></nexus-accordion-trigger>');
    expect(page.root.querySelectorAll('.show-content-at-center').length).toEqual(1);
  });

  it('should contain class show-content-at-right', async () => {
    const page = await declrComp('<nexus-accordion-trigger align="end"></nexus-accordion-trigger>');
    expect(page.root.querySelectorAll('.show-content-at-end').length).toEqual(1);
  });
});
