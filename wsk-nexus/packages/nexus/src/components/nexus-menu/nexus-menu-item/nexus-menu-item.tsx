import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-menu-item',
  shadow: false,
  styleUrl: 'nexus-menu-item.scss'
})
export class NexusMenuItem {
  render() {
    return (
      <Host class="nexus-menu-item">
        <div class="nexus-menu-list-item">
          <slot />
        </div>
      </Host>
    );
  }
}
