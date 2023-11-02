import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-card-body',
  shadow: false,
  styleUrl: 'nexus-card-body.scss'
})
export class NexusCardBody {
  render() {
    return (
      <Host class="nexus-card-body" slot="nexus-card-body">
        <slot />
      </Host>
    );
  }
}
