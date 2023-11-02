import { Component, h } from '@stencil/core';

@Component({
  tag: 'nexus-message',
  shadow: false,
  styleUrl: 'nexus-message.scss'
})
export class NexusMessage {
  render() {
    return (
      <p class="nexus-message">
        <slot />
      </p>
    );
  }
}
