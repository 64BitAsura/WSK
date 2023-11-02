import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'nexus-radio',
  shadow: false,
  styleUrl: 'nexus-radio.scss'
})
export class NexusRadio {
  /**
   * Whether the radio is checked.
   */
  @Prop() checked: boolean;

  /**
   * Whether the radio is disabled.
   */
  @Prop() disabled: boolean;

  /**
   * The unique id of the radio.
   */
  @Prop() attrId: string;

  /**
   * The name of the radio group.
   */
  @Prop() name: string;

  /**
   * The value of the radio.
   */
  @Prop() value: string;

  /**
   * Whether the radio is required.
   */
  @Prop() required: boolean;

  render() {
    const classes = {
      'nexus-radio': true,
      'nexus-disabled': this.disabled
    };

    return (
      <label class={classes}>
        <input
          class="nexus-radio-input"
          type="radio"
          checked={this.checked}
          disabled={this.disabled}
          id={this.attrId}
          name={this.name}
          required={this.required}
          value={this.value}
        />

        <div class="nexus-radio-custom">
          <div class="nexus-radio-custom-checked" />
        </div>

        <span class="nexus-radio-label" aria-disabled={this.disabled}>
          <slot />
        </span>
      </label>
    );
  }
}
