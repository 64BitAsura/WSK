import { Component, h } from '@stencil/core';

@Component({
  tag: 'nexus-chip-group',
  shadow: false,
  styleUrl: 'nexus-chip-group.scss'
})
export class NexusChipGroup {
  render() {
    return (
      <div class="nexus-chip-group">
        <slot />
      </div>
    );
  }
}
