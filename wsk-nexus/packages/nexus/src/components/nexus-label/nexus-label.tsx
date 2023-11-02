import { Component, h } from '@stencil/core';

@Component({
  tag: 'nexus-label',
  shadow: false,
  styleUrl: 'nexus-label.scss'
})
export class NexusLabel {
  render() {
    return (
      <label class="nexus-label">
        <slot />
      </label>
    );
  }
}
