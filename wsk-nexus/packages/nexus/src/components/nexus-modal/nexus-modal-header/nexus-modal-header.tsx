import { Component, h, Host, Event, EventEmitter, Element } from '@stencil/core';

import HardwareIcClose24px from '../../../assets/icons/navigation/ic_close_24px.svg';
import { updateCustomSlots } from '../../../utils/index';

@Component({
  tag: 'nexus-modal-header',
  shadow: false,
  styleUrl: 'nexus-modal-header.scss'
})
export class NexusModalHeader {
  @Element() private readonly element: HTMLElement;

  componentDidLoad() {
    updateCustomSlots(this.element);
  }

  /**
   * Event fired when the close icon button is clicked.
   */
  @Event() closeEvent: EventEmitter;

  private handleClose(event) {
    this.closeEvent.emit(event);
  }

  render() {
    return (
      <Host class="nexus-modal-header">
        <p class="header-text">
          <slot />
        </p>
        <button
          type="button"
          class="nexus-btn nexus-btn-icon nexus-modal-header-close-btn"
          onClick={(event) => this.handleClose(event)}
        >
          <nexus-icon content={HardwareIcClose24px}></nexus-icon>
          <span class="nexus-visually-hidden">Close</span>
        </button>
        <p class="nexus-body-sm header-subtext">
          <span slot-name="nexus-modal-header-subtitle" />
        </p>
      </Host>
    );
  }
}
