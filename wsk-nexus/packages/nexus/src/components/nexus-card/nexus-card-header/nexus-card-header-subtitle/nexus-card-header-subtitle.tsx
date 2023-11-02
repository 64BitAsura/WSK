import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-card-header-subtitle',
  shadow: false,
  styleUrl: 'nexus-card-header-subtitle.scss'
})
export class NexusCardHeaderSubtitle {
  render() {
    return (
      <Host class="nexus-card-header-subtitle" slot="nexus-card-header-subtitle">
        <slot />
      </Host>
    );
  }
}
