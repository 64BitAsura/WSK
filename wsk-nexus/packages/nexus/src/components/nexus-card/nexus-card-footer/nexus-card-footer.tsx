import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-card-footer',
  shadow: false,
  styleUrl: 'nexus-card-footer.scss'
})
export class NexusCardFooter {
  render() {
    return (
      <Host class="nexus-card-footer" slot="nexus-card-footer">
        <slot />
      </Host>
    );
  }
}
