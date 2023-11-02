import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-footer-content',
  shadow: false,
  styleUrl: 'nexus-footer-content.scss'
})
export class NexusFooterContent {
  render() {
    return (
      <Host class="nexus-footer-content" slot="footer-content">
        <ul>
          <li>
            <slot />
          </li>
        </ul>
      </Host>
    );
  }
}
