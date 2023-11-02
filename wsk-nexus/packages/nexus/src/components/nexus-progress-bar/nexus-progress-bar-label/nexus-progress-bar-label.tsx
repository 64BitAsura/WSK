import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-progress-bar-label',
  shadow: false,
  styleUrl: 'nexus-progress-bar-label.scss'
})
export class NexusProgressBarLabel {
  render() {
    return (
      <Host class="nexus-progress-bar-label">
        <slot />
      </Host>
    );
  }
}
