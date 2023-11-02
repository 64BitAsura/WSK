import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-search-list',
  shadow: false,
  styleUrl: 'nexus-search-list.scss'
})
export class NexusSearchList {
  render() {
    return (
      <Host class="nexus-search-list">
        <ul class="nexus-search-ul">
          <slot />
        </ul>
      </Host>
    );
  }
}
