import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-modal-header-subtitle',
  shadow: false,
  styleUrl: 'nexus-modal-header-subtitle.scss'
})
export class NexusModalHeaderSubtitle {
  render() {
    return (
      <Host class="nexus-modal-header-subtitle" slot="nexus-modal-header-subtitle">
        <slot />
      </Host>
    );
  }
}
