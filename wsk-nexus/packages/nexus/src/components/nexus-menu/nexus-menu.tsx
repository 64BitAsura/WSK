import { Component, h, Host, Prop, EventEmitter, Event } from '@stencil/core';
import NavigationcClose24px from '../../assets/icons/navigation/ic_close_24px.svg';

@Component({
  tag: 'nexus-menu',
  shadow: false,
  styleUrl: 'nexus-menu.scss'
})
export class NexusMenu {
  /**
   * Side of the viewport to open the menu from
   */
  @Prop() position: 'left' | 'right' = 'right';

  /**
   * Whether the menu is open
   */
  @Prop() open: boolean = false;

  /**
   * Event fired when the menu is closed
   */
  @Event() closeEvent: EventEmitter;

  render() {
    return (
      <Host
        class={{
          'nexus-menu': true,
          [`nexus-menu-${this.position}`]: true,
          'nexus-menu-open': this.open
        }}
      >
        <button type="button" class="nexus-btn nexus-btn-icon" onClick={(event) => this.closeEvent.emit(event)}>
          <nexus-icon content={NavigationcClose24px}></nexus-icon>
          <span class="nexus-visually-hidden">Close Menu</span>
        </button>

        <nav class="nexus-menu-nav">
          <div class="nexus-menu-list">
            <slot />
          </div>
        </nav>
      </Host>
    );
  }
}
