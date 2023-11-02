import { Component, h, Host, Listen, Element, Prop } from '@stencil/core';

@Component({
  tag: 'nexus-accordion-group',
  shadow: false,
  styleUrl: 'nexus-accordion-group.scss'
})
export class NexusAccordionGroup {
  @Element() private readonly element: HTMLElement;

  /**
   * Disable/Enable accordion collapse of an already open accordion when a new accordion open is triggered.
   */
  @Prop({ mutable: true }) alwaysOpen: boolean = false;

  @Listen('toggleEvent')
  handleCollapse() {
    const element = this.element.querySelector('.nexus-accordion-open');
    if (element && !this.alwaysOpen) {
      element.setAttribute('open', 'false');
    }
  }

  render() {
    return (
      <Host class="nexus-accordion-group">
        <slot />
      </Host>
    );
  }
}
