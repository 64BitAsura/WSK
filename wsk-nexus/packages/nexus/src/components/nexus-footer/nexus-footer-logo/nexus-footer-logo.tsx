import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-footer-logo',
  shadow: false,
  styleUrl: 'nexus-footer-logo.scss'
})
export class NexusFooterLogo {
  render() {
    return (
      <Host class="nexus-footer-logo" slot="footer-logo">
        <slot />
      </Host>
    );
  }
}
