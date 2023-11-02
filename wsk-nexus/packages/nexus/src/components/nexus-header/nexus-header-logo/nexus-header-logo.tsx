import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-header-logo',
  shadow: false,
  styleUrl: 'nexus-header-logo.scss'
})
export class NexusHeaderLogo {
  render() {
    return (
      <Host class="nexus-header-logo">
        <slot />
      </Host>
    );
  }
}
