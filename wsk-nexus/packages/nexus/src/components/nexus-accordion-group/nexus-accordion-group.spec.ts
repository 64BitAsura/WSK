import { NexusAccordionGroup } from './nexus-accordion-group';
import { newSpecPage } from '@stencil/core/testing';
import { NexusAccordion } from '../nexus-accordion/nexus-accordion';
import { NexusAccordionTrigger } from '../nexus-accordion/nexus-accordion-trigger/nexus-accordion-trigger';
import { NexusAccordionContent } from '../nexus-accordion/nexus-accordion-content/nexus-accordion-content';

const nagVar = 'nexus-accordion-group';
describe('check nexus-accordion-group class', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusAccordionGroup],
      html: '<nexus-accordion-group></nexus-accordion-group>'
    });

    expect(new NexusAccordionGroup()).toBeTruthy();
    expect(page.root).toHaveClass(nagVar);
  });

  it('Create and accordion group with multiple accordion elements.', async () => {
    const page = await newSpecPage({
      components: [NexusAccordionGroup, NexusAccordion, NexusAccordionTrigger, NexusAccordionContent],
      html: `
      <nexus-accordion-group>
        <nexus-accordion size="md">
          <nexus-accordion-trigger>
            <h1 class="nexus-body">Accordion Title - 1</h1>
          </<nexus-accordion-trigger>
          <nexus-accordion-content>
            <span>Accordion Content</span>
          </nexus-accordion-content>
        </nexus-accordion>
        
        <nexus-accordion open size="md">
          <nexus-accordion-trigger>
            <h1 class="nexus-body">Accordion Title - 2</h1>
          </<nexus-accordion-trigger>
          <nexus-accordion-content>
            <span>Accordion Content</span>
          </nexus-accordion-content>
        </nexus-accordion>
      </nexus-accordion-group>`
    });

    await page.waitForChanges();
    expect(page.root).toHaveClass(nagVar);

    const accordionElement = page.body.querySelectorAll('nexus-accordion');
    expect(accordionElement).toBeDefined();
    expect(accordionElement.length).toEqual(2);

    const accordionTrigger = page.body.querySelectorAll('.nexus-accordion-trigger');
    expect(accordionTrigger).toBeDefined();
    expect(accordionTrigger.length).toEqual(2);

    const accordionContent = page.body.querySelectorAll('.nexus-accordion-content');
    expect(accordionContent).toBeDefined();
    expect(accordionTrigger.length).toEqual(2);

    const element = page.body.querySelectorAll('nexus-accordion');
    await page.waitForChanges();
    element[0].setAttribute('open', 'true');
    const accordionElementOpen = page.body.querySelectorAll('.nexus-accordion');
    expect(accordionElementOpen[0].getAttribute('open')).toBeTruthy();

    const accordionButton = page.body.querySelectorAll('button');
    const event = new Event('click', { bubbles: true });

    const accordion = page.rootInstance;
    jest.spyOn(accordion, 'handleCollapse');
    accordionButton[1].dispatchEvent(event);
    await page.waitForChanges();
    expect(accordion.handleCollapse).toHaveBeenCalled();
  });
});
