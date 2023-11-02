import { Component, h, Host, Prop, State } from '@stencil/core';

@Component({
  tag: 'nexus-avatar',
  shadow: false,
  styleUrl: 'nexus-avatar.scss'
})
export class NexusAvatar {
  @State() initials;

  /**
   * The Prop 'userName' will be deprecated. Kindly use the 'label' Prop.
   */
  @Prop() userName: string = '';

  /**
   * The Prop 'avatarImageSrc' will be deprecated. Kindly use the 'src' and 'type' Prop.
   */
  @Prop() avatarImageSrc: string = '';

  /**
   * Specify a custom class to override styles of the Avatar component.The Prop 'avatarClassName' will be deprecated.
   */
  @Prop() avatarClassName: string = '';

  /**
   * The Prop 'avatarSize' will be deprecated. Kindly use the 'size' Prop.
   */
  @Prop() avatarSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  /**
   * The Prop 'avatarStatus' will be deprecated. Kindly use the 'status' Prop.
   */
  @Prop() avatarStatus: 'online' | 'inactive' | '' = '';

  /**
   * The Prop 'description' will be deprecated. Kindly use the 'alt' Prop.
   */
  @Prop() description: string = '';

  /**
   * The Prop 'avatarNotification' will be deprecated. Kindly use the slot content with the notification.
   */
  @Prop() avatarNotification: string = '';

  /**
   * The Prop 'avatarLogoIcon' will be deprecated. Kindly use the 'src' and 'type' Prop.
   */
  @Prop() avatarLogoIcon: string = '';

  /**
   *The Prop 'avatarNameDisplay' will be deprecated.
   */
  @Prop() avatarNameDisplay: boolean = true;

  /**
   * The Prop 'avatarDark' will be deprecated.
   */
  @Prop() avatarDark: boolean = false;

  /**
   * Alternative text for accessibility.
   */
  @Prop() alt: string = '';

  /**
   * The path to the svg/img when the 'type' value is selected as 'svg' or 'img' .
   */
  @Prop() src: string;
  /**
   * Adjust the avatar size (xs = 12px, sm = 16px, md = 24px, lg = 48px, xl = 64px).
   */
  @Prop() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  /**
   * Enables to load the avatar logo/image using img markup, Improves performance since it uses browser cache to save image and reduces repeated calls. type = "img" | "svg" | "text"
   */
  @Prop() type: 'svg' | 'img' | 'text' = 'text';
  /**
   * Avatar connection status is 'none' by default. Valid options are status = "none" | "default" | "error" | "success" | "warning" | "info"
   */
  @Prop() status: 'none' | 'default' | 'error' | 'success' | 'warning' | 'info' = 'none';
  /**
   * Will be used as a description and formated as initials in case no src is provided and the 'type' value is selected as 'text'.
   */
  @Prop() label: string = '';

  componentWillLoad() {
    this.initials = this.userName
      .split(' ')
      .map((name) => name[0])
      .join('');
  }

  darkModeHandler() {
    if (this.avatarDark === true) {
      return 'dark-mode';
    }

    return 'light-mode';
  }

  render() {
    return (
      <Host>
        <div
          class={
            this.avatarClassName
              ? `nexus-avatar avatar-size-${this.avatarSize}${this.avatarClassName}`
              : `nexus-avatar avatar${this.darkModeHandler()}
              avatar-size-${this.avatarSize}`
          }
        >
          {this.avatarImageSrc ? <img src={this.avatarImageSrc} class="avatar-image" alt={this.description} /> : ''}
          {this.avatarLogoIcon ? (
            <nexus-icon
              src={this.avatarLogoIcon}
              class={`avatar-logo-${this.avatarSize} avatar-logo ${this.darkModeHandler()}`}
              alt="avatar logo"
            ></nexus-icon>
          ) : (
            <span class={`initials ${this.darkModeHandler()}`}>{this.initials}</span>
          )}
          {this.avatarStatus ? (
            <div class={`avatar-status-${this.avatarSize} avatar-status avatar-status-${this.avatarStatus}`}></div>
          ) : (
            ''
          )}
          {this.avatarNotification ? (
            <div class={`avatar-notification-${this.avatarSize} avatar-notification`}>
              {' '}
              <span class="notification-text">{this.avatarNotification}</span>
            </div>
          ) : (
            ''
          )}
        </div>
        {this.avatarNameDisplay ? <span class={`user-name user-name-${this.avatarSize}`}>{this.userName}</span> : ''}
      </Host>
    );
  }
}
