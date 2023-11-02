import { NexusAccordion } from './nexus-accordion';
import { NexusAccordionTrigger } from './nexus-accordion-trigger/nexus-accordion-trigger';
import { NexusAccordionContent } from './nexus-accordion-content/nexus-accordion-content';
import { newSpecPage } from '@stencil/core/testing';

const nexAccCls = 'nexus-accordion';

describe('nexus-accordion', () => {
  it('should contain class', async () => {
    const page = await newSpecPage({
      components: [NexusAccordion],
      html: '<nexus-accordion></nexus-accordion>'
    });

    expect(page.root).toHaveClass(nexAccCls);
  });

  it('should handle the toggle event', async () => {
    const page = await newSpecPage({
      components: [NexusAccordion, NexusAccordionTrigger, NexusAccordionContent],
      html: `<nexus-accordion>
        <nexus-accordion-trigger>Trigger</nexus-accordion-trigger>
        <nexus-accordion-content>Content</nexus-accordion-content>
      </nexus-accordion>`
    });

    const accordion = page.rootInstance;

    jest.spyOn(accordion, 'handleToggle');

    page.waitForChanges();

    const button = page.root.querySelector('button');

    const event = new Event('click', {
      bubbles: true
    });

    button.dispatchEvent(event);

    expect(accordion.handleToggle).toHaveBeenCalled();
  });

  it('should call collapse() on click if open is false', async () => {
    const page = await newSpecPage({
      components: [NexusAccordion, NexusAccordionTrigger, NexusAccordionContent],
      html: `<nexus-accordion open="true">
        <nexus-accordion-trigger></nexus-accordion-trigger>
        <nexus-accordion-content>Content</nexus-accordion-content>
      </nexus-accordion>`
    });

    const accordion = page.rootInstance;
    const accordionEl = page.doc.querySelector(nexAccCls);

    jest.spyOn(accordion, 'collapse');

    await page.waitForChanges();

    accordionEl.setAttribute('open', 'false');

    expect(accordion.collapse).toHaveBeenCalled();
  });

  it('should call expand() on click if open is false', async () => {
    const page = await newSpecPage({
      components: [NexusAccordion, NexusAccordionTrigger, NexusAccordionContent],
      html: `<nexus-accordion>
        <nexus-accordion-trigger></nexus-accordion-trigger>
        <nexus-accordion-content>Content</nexus-accordion-content>
      </nexus-accordion>`
    });

    const accordion = page.rootInstance;
    const accordionEl = page.doc.querySelector(nexAccCls);

    jest.spyOn(accordion, 'expand');

    await page.waitForChanges();

    accordionEl.setAttribute('open', 'true');

    expect(accordion.expand).toHaveBeenCalled();
  });
});
