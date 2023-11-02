/* eslint-disable no-console */
import { Component, Host, Prop, Element, Event, EventEmitter, Watch, Listen, h } from '@stencil/core';
export type propSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  tag: 'nexus-accordion',
  shadow: false,
  styleUrl: 'nexus-accordion.scss'
})
export class NexusAccordion {
  @Watch('open')
  watchHandler() {
    this.open ? this.expand() : this.collapse();
  }

  /**
   * Event fired when the accordion header button is clicked.
   */
  @Event() toggleEvent: EventEmitter;

  @Element() private readonly element: HTMLElement;

  @Listen('_triggerClick')
  onTriggerClick(event: CustomEvent) {
    this.handleToggle(event);
  }

  /**
   * Whether the accordion is open.
   */
  @Prop() open: boolean = false;

  /**
   * Adjust Accordion inner content padding left and right.
   */
  @Prop() size: propSize = 'md';

  private collapse() {
    this.updateHeight(false);
  }

  private expand() {
    this.updateHeight(true);
  }

  private updateHeight(expand) {
    const element = this.element.querySelector('nexus-accordion-content');
    element.style.height = expand ? `${element.scrollHeight}px` : '0';
  }

  handleToggle(event) {
    this.toggleEvent.emit(event);
  }

  componentDidRender() {
    const content = this.element.querySelector('nexus-accordion-content');
    if (content) {
      content.style.height = this.open ? 'auto' : '0';
      content.setAttribute('size', this.size);
    }
  }

  render() {
    return (
      <Host
        class={{
          'nexus-accordion': true,
          'nexus-accordion-open': this.open
        }}
      >
        <slot />
      </Host>
    );
  }
}
