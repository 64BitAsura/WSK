import { Component, h } from '@stencil/core';
import alertIcWarning24px from '../../assets/icons/alert/ic_warning_24px.svg';

@Component({
  tag: 'nexus-error-message',
  shadow: false,
  styleUrl: 'nexus-error-message.scss'
})
export class NexusErrorMessage {
  render() {
    return (
      <p class="nexus-error-message">
        <nexus-icon class="nexus-error-icon" content={alertIcWarning24px}></nexus-icon>
        <slot />
      </p>
    );
  }
}
