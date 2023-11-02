import { Component, h, Host, Listen, State } from '@stencil/core';
import MenuIcon from '../../../assets/icons/navigation/ic_menu_24px.svg';

@Component({
  tag: 'nexus-header-menu',
  shadow: false,
  styleUrl: 'nexus-header-menu.scss'
})
export class NexusHeaderMenu {
  /**
   * State fired when the menu is closed
   */
  @State() open: boolean = false;

  @Listen('closeEvent')
  handleClose() {
    this.open = false;
  }

  render() {
    return (
      <Host class="nexus-header-menu">
        <button
          type="button"
          class="nexus-btn nexus-btn-icon nexus-hamburger-icon"
          onClick={() => {
            this.open = !this.open;
          }}
        >
          <nexus-icon content={MenuIcon}></nexus-icon>
          <span class="nexus-visually-hidden">Close Menu</span>
        </button>
        <nexus-menu open={this.open}>
          <slot />
        </nexus-menu>
      </Host>
    );
  }
}
