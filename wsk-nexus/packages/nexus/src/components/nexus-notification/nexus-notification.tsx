import { Component, h, Host, Prop } from '@stencil/core';

import ActionIcInfo24px from '../../assets/icons/action/ic_info_24px.svg';
import ActionIcCheckCircle24px from '../../assets/icons/action/ic_check_circle_24px.svg';
import AlertIcError24px from '../../assets/icons/alert/ic_error_24px.svg';
import AlertIcWarning24px from '../../assets/icons/alert/ic_warning_24px.svg';

export type typVariant = 'error' | 'info' | 'success' | 'warning';

@Component({
  tag: 'nexus-notification',
  shadow: false,
  styleUrl: 'nexus-notification.scss'
})
export class NexusNotification {
  /**
   * The type of notification
   */
  @Prop() variant: typVariant = 'info';

  render() {
    const icons = {
      error: AlertIcError24px,
      info: ActionIcInfo24px,
      success: ActionIcCheckCircle24px,
      warning: AlertIcWarning24px
    };

    return (
      <Host
        class={{
          'nexus-notification': true,
          [`nexus-notification-${this.variant}`]: true
        }}
      >
        <div class="nexus-notification-content">
          <nexus-icon content={icons[this.variant]}></nexus-icon>
          <slot />
        </div>
      </Host>
    );
  }
}
