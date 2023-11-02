import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-modal-footer',
  shadow: false,
  styleUrl: 'nexus-modal-footer.scss'
})
export class NexusModalFooter {
  render() {
    return (
      <Host class="nexus-modal-footer">
        <slot />
      </Host>
    );
  }
}
