import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-modal-body',
  shadow: false,
  styleUrl: 'nexus-modal-body.scss'
})
export class NexusModalBody {
  render() {
    return (
      <Host class="nexus-modal-body">
        <slot />
      </Host>
    );
  }
}
