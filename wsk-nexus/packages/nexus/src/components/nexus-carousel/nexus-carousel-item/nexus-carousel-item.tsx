import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-carousel-item',
  shadow: false,
  styleUrl: 'nexus-carousel-item.scss'
})
export class NexusCarouselItem {
  render() {
    return (
      <Host
        class={{
          'nexus-carousel-item': true
        }}
      >
        <slot />
      </Host>
    );
  }
}
