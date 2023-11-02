import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-card-avatar',
  shadow: false,
  styleUrl: 'nexus-card-avatar.scss'
})
export class NexusCardAvatar {
  render() {
    return (
      <Host class="nexus-card-avatar" slot="nexus-card-avatar">
        <slot />
      </Host>
    );
  }
}
