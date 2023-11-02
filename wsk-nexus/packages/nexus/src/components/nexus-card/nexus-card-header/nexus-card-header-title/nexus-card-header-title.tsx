import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-card-header-title',
  shadow: false,
  styleUrl: 'nexus-card-header-title.scss'
})
export class NexusCardHeaderTitle {
  render() {
    return (
      <Host class="nexus-card-header-title nexus-h4" slot="nexus-card-header-title">
        <slot />
      </Host>
    );
  }
}
