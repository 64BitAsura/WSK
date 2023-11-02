import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-header',
  shadow: false,
  styleUrl: 'nexus-header.scss'
})
export class NexusHeader {
  render() {
    return (
      <Host class="nexus-header">
        <div class="nexus-container">
          <div class="nexus-header-inner">
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
