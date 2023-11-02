import { Component, h, Prop } from '@stencil/core';

import NavigationIcCheck24px from '../../assets/icons/navigation/ic_check_24px.svg';
import ContentIcRemove24px from '../../assets/icons/content/ic_remove_24px.svg';

@Component({
  tag: 'nexus-checkbox',
  shadow: false,
  styleUrl: 'nexus-checkbox.scss'
})
export class NexusCheckbox {
  /**
   * Whether the input is checked.
   */
  @Prop({ mutable: true }) checked: boolean = false;

  /**
   * Whether the input is disabled.
   */
  @Prop() disabled: boolean = false;

  /**
   * The unique identifier of the checkbox.
   */
  @Prop() attrId: string = 'attrId';

  /**
   * Whether the input is in an indeterminate state.
   */
  @Prop() indeterminate: boolean = false;

  /**
   * Whether the input is required.
   */
  @Prop() required: boolean = false;

  constructor() {
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.checked = event.target.checked;
  }

  render() {
    const classes = {
      'nexus-checkbox': true,
      'nexus-checkbox-label-wrap': true,
      'nexus-checkbox-checked': this.checked,
      'nexus-checkbox-disabled': this.disabled,
      'nexus-checkbox-indeterminate': this.checked && this.indeterminate
    };

    let ariaChecked;

    if (this.checked && this.indeterminate) {
      ariaChecked = 'mixed';
    } else if (this.checked) {
      ariaChecked = 'true';
    } else {
      ariaChecked = 'false';
    }

    return (
      <label class={classes}>
        <input
          aria-checked={ariaChecked}
          id={this.attrId}
          type="checkbox"
          class="nexus-checkbox-input"
          checked={this.checked}
          disabled={this.disabled}
          required={this.required}
          onChange={(event) => this.handleChange(event)}
        />

        <div class="nexus-checkbox-custom">
          <nexus-icon content={NavigationIcCheck24px} class="nexus-checkbox-checked-icon"></nexus-icon>
          <nexus-icon content={ContentIcRemove24px} class="nexus-checkbox-indeterminate-icon"></nexus-icon>
        </div>

        <span class="nexus-checkbox-label" aria-disabled={this.disabled}>
          <slot />
        </span>
      </label>
    );
  }
}
