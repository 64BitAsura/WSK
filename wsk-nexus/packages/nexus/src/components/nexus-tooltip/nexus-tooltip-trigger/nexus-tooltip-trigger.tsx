import { Component, h, Host, Element } from '@stencil/core';

@Component({
  tag: 'nexus-tooltip-trigger',
  shadow: false,
  styleUrl: 'nexus-tooltip-trigger.scss'
})
export class NexusTooltipTrigger {
  @Element() element: HTMLNexusTooltipTriggerElement;

  render() {
    return (
      <Host
        class={{
          'nexus-tooltip-trigger': true,
          'nexus-tooltip-trigger-with-icon': Boolean(this.element.querySelectorAll('nexus-icon').length)
        }}
      >
        <button type="button" class="nexus-btn nexus-btn-icon">
          <slot />
        </button>
      </Host>
    );
  }
}
