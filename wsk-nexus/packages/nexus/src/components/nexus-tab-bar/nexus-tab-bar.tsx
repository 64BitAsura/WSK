import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-tab-bar',
  shadow: false,
  styleUrl: 'nexus-tab-bar.scss'
})
export class NexusTabBar {
  render() {
    return (
      <Host class="nexus-tab-bar">
        <slot />
      </Host>
    );
  }
}
