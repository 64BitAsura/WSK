import { Component, h, Host, Prop, Element, Event, EventEmitter } from '@stencil/core';

import ActionIcInfo24px from '../../assets/icons/action/ic_info_24px.svg';
import ActionIcCheckCircle24px from '../../assets/icons/action/ic_check_circle_24px.svg';
import AlertIcError24px from '../../assets/icons/alert/ic_error_24px.svg';
import HardwareIcClose24px from '../../assets/icons/navigation/ic_close_24px.svg';
import AlertIcWarning24px from '../../assets/icons/alert/ic_warning_24px.svg';

export type typVariant1 = 'error' | 'info' | 'warning' | 'success' | 'custom';

const icons = {
  error: AlertIcError24px,
  info: ActionIcInfo24px,
  success: ActionIcCheckCircle24px,
  warning: AlertIcWarning24px
};

@Component({
  tag: 'nexus-toast',
  shadow: false,
  styleUrl: 'nexus-toast.scss'
})
export class NexusToast {
  @Element() element: HTMLNexusToastElement;

  /**
   * Whether the toast can be closed.
   */
  @Prop() closeable: boolean = false;

  /**
   * The style of the toast.
   */
  @Prop() variant: typVariant1 = 'info';

  /**
   * The position of the toast
   */
  @Prop() position: 'top' | 'bottom' | 'default';

  /**
   * Event fired when the tooltip close button is clicked.
   */
  @Event() closeEvent: EventEmitter;

  /**
   *  custom icon for toast
   */
  @Prop() iconSrc: string = '';

  /**
   *  Trigger automatic close of toast after n milli-seconds
   */
  @Prop() autoClose: number;

  /**
   * Hide toasts when set to false.
   */
  @Prop({ mutable: true }) show: boolean = true;

  constructor() {
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidLoad() {
    if (this.autoClose) {
      setTimeout((event) => {
        this.handleClose(event);
      }, this.autoClose);
    }
  }

  private handleClose(event) {
    this.show = false;
    this.closeEvent.emit(event);
  }

  private getIconTemplate() {
    if (this.variant.toLowerCase() === 'custom') {
      return <nexus-icon src={this.iconSrc}></nexus-icon>;
    }

    return <nexus-icon content={icons[this.variant]}></nexus-icon>;
  }

  render() {
    return (
      <Host
        class={{
          'nexus-toast': true,
          [`nexus-toast-${this.variant}`]: true,
          [`nexus-toast-${this.position}`]: true,
          'nexus-toast-hidden': !this.show
        }}
      >
        <div class="nexus-toast-content">
          {this.getIconTemplate()}
          <slot />
        </div>
        {this.closeable && (
          <button type="button" class="nexus-btn nexus-btn-icon nexus-toast-close-btn" onClick={this.handleClose}>
            <nexus-icon content={HardwareIcClose24px} class="nexus-toast-close-button"></nexus-icon>
            <span class="nexus-visually-hidden">Close</span>
          </button>
        )}
      </Host>
    );
  }
}
