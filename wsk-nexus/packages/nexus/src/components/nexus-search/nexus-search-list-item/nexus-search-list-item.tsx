import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-search-list-item',
  shadow: false,
  styleUrl: 'nexus-search-list-item.scss'
})
export class NexusSearchListItem {
  render() {
    return (
      <Host class="nexus-search-list-item">
        <li class="nexus-search-list-li">
          <slot />
        </li>
      </Host>
    );
  }
}
