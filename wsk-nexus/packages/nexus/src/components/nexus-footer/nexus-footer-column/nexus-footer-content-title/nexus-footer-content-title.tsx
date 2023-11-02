import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-footer-content-title',
  shadow: false,
  styleUrl: 'nexus-footer-content-title.scss'
})
export class NexusFooterContentTitle {
  render() {
    return (
      <Host class="nexus-footer-content-title" slot="footer-content-title">
        <ul>
          <li>
            <slot />
          </li>
        </ul>
      </Host>
    );
  }
}
