import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-card-header-details',
  shadow: false,
  styleUrl: 'nexus-card-header-details.scss'
})
export class NexusCardHeaderDetails {
  render() {
    return (
      <Host class="nexus-card-header-details nexus-caption-copy" slot="nexus-card-header-details">
        <slot />
      </Host>
    );
  }
}
