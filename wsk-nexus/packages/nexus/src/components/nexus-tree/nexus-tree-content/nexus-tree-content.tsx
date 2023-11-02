import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-tree-content',
  shadow: false,
  styleUrl: 'nexus-tree-content.scss'
})
export class NexusTreeContent {
  render() {
    return (
      <Host class="nexus-tree-content">
        <div class="nexus-tree-content-inner">
          <slot />
        </div>
      </Host>
    );
  }
}
