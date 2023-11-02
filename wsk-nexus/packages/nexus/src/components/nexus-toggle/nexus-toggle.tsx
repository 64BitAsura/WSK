import { Component, h, Prop, Host, Element } from '@stencil/core';

export type typSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  tag: 'nexus-toggle',
  shadow: false,
  styleUrl: 'nexus-toggle.scss'
})
export class NexusToggle {
  /**
   * Whether the toggle is on or off.
   */
  @Prop({ mutable: true }) toggled: boolean;

  /**
   * Whether the toggle is disabled.
   */
  @Prop() disabled: boolean;

  /**
   * The unique identifier of the toggle.
   */
  @Prop() attrId: string;

  /**
   * Whether the toggle is required.
   */
  @Prop() required: boolean;

  /**
   * Set size for the toggle.
   * size variants represented as width x height [
   * xs = 32px x 16px,
   * sm = 48px x 24px,
   * md = 80px x 40px,
   * lg = 112px x 56px,
   * xl = 128px x 64px ]
   */
  @Prop() size: typSize = 'md';

  /**
   * Set label to be dispayed on left hand side of toggle.
   */
  @Prop() labelInactive: string = null;

  /**
   * Set label to be dispayed on right hand side of toggle.
   */
  @Prop() labelActive: string = null;

  /**
   * Set the value for toggle based on toggle identifier.
   */
  @Prop({ mutable: true }) value = '';

  /**
   * Toggle type, switch by default.
   */
  @Prop() type: 'switch' | 'button' = 'switch';

  /**
   * Unique toggle element identyfier.
   */
  @Element() element: HTMLNexusToggleElement;

  handleChange(event) {
    this.toggled = event.target.checked;
    this.value = this.toggled && !this.disabled ? this.labelActive : this.labelInactive;
  }

  handleClick(toggleIndicator: string) {
    this.toggled = toggleIndicator === this.labelActive;
    this.value = this.toggled && !this.disabled ? this.labelActive : this.labelInactive;
  }

  componentDidLoad() {
    this.element.addEventListener('keydown', (event) => {
      const key = event.code.trim();
      switch (key) {
        case 'Enter':
          this.toggled = !this.toggled;
          break;
        default:
          break;
      }
    });
  }

  render() {
    const ariaChecked = this.toggled ? 'true' : 'false';
    const isTypeButton = this.type === 'button';
    const toggleRole = this.type === 'button' ? 'button' : '';

    return (
      <Host class="nexus-toggle">
        <div
          class={{
            'nexus-toggle-align-center': true,
            'nexus-toggle-button-wrapper': isTypeButton
          }}
        >
          {this.labelInactive === null ? (
            this.labelInactive
          ) : (
            <span
              role={toggleRole}
              class={{
                'nexus-toggle-labels': true,
                'nexus-toggle-label-left': true,
                'nexus-toggle-label-selected': !this.toggled,
                [`nexus-toggle-button-${this.size}`]: isTypeButton
              }}
              onClick={() => this.handleClick(this.labelInactive)}
            >
              {this.labelInactive}
            </span>
          )}

          <label
            class={{
              'nexus-toggle-label': true,
              [`nexus-toggle-label-${this.size}`]: true
            }}
          >
            <input
              aria-checked={ariaChecked}
              id={this.attrId}
              type="checkbox"
              class={{
                'nexus-toggle-input': true,
                [`nexus-toggle-input-${this.size}`]: true
              }}
              checked={this.toggled}
              disabled={this.disabled}
              required={this.required}
              onChange={(event) => this.handleChange(event)}
            />
            <span
              class={{
                'nexus-toggle-slider': true,
                [`nexus-toggle-slider-${this.size}`]: true
              }}
            />
          </label>

          {this.labelActive === null ? (
            this.labelActive
          ) : (
            <span
              role={toggleRole}
              class={{
                'nexus-toggle-labels': true,
                'nexus-toggle-label-right': true,
                'nexus-toggle-label-selected': this.toggled,
                [`nexus-toggle-button-${this.size}`]: isTypeButton
              }}
              onClick={() => this.handleClick(this.labelActive)}
            >
              {this.labelActive}
            </span>
          )}
        </div>
      </Host>
    );
  }
}
