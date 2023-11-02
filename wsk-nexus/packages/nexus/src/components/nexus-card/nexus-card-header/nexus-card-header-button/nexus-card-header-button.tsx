import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-card-header-button',
  shadow: false,
  styleUrl: 'nexus-card-header-button.scss'
})
export class NexusCardHeaderButton {
  render() {
    return (
      <Host class="nexus-card-header-button" slot="nexus-card-header-button">
        <slot />
      </Host>
    );
  }
}
