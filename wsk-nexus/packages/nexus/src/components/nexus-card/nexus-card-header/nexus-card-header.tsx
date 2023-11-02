import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-card-header',
  shadow: false,
  styleUrl: 'nexus-card-header.scss'
})
export class NexusCardHeader {
  render() {
    return (
      <Host class="nexus-card-header" slot="nexus-card-header">
        <slot />
      </Host>
    );
  }
}
