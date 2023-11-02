import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-card-body-image',
  shadow: false,
  styleUrl: 'nexus-card-body-image.scss'
})
export class NexusCardBodyImage {
  render() {
    return (
      <Host class="nexus-card-body-image">
        <slot />
      </Host>
    );
  }
}
