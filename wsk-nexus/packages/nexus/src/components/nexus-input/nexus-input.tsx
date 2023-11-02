import { Component, Prop, h, Event, Host, EventEmitter, Watch, Element } from '@stencil/core';

export type inputFieldType = 'date' | 'email' | 'number' | 'text' | 'password' | 'tel';

let nextUniqueId;
nextUniqueId = 0;

@Component({
  tag: 'nexus-input',
  shadow: false,
  styleUrl: 'nexus-input.scss'
})
export class NexusInput {
  @Element() private readonly element: HTMLNexusInputElement;

  private readonly _id: string;

  /**
   * The Unique identifier for the input and the label to match.
   * If none is provided one will be added by default.
   */
  @Prop() attrId: string = '';

  /**
   * Disables autocomplete
   */
  @Prop() autocomplete: 'off';

  /**
   * Whether the form control is disabled
   */
  @Prop() disabled: boolean;

  /**
   * Maximum length (number of characters) of value
   */
  @Prop() maxLength: number;

  /**
   * Minimum length (number of characters) of value
   */
  @Prop() minLength: number;

  /**
   * Minimum length (number of characters) of value
   */
  @Prop() placeholder: string;

  /**
   * Whether the form control is required
   */
  @Prop() required: boolean;

  /**
   * The type of input element
   */
  @Prop() type: inputFieldType = 'text';

  /**
   * The readonly of the input
   */
  @Prop() readonly: boolean;

  /**
   * Specify the Minimum value of the input field
   */
  @Prop() min: string;

  /**
   * Specify the Maximum value of the input field
   */
  @Prop() max: string;

  /**
   * The value of the input
   */
  @Prop() value: string = '';

  /**
   * Internal event for updating disabled form elements
   */
  @Event() _disabledChange: EventEmitter;

  @Watch('disabled')
  updateFormFieldDisabled(newValue: boolean, oldValue: boolean) {
    if (newValue === oldValue) {
      return;
    }

    this._disabledChange.emit(newValue);
  }

  constructor() {
    nextUniqueId++;
    this._id = this.attrId ? this.attrId : `nexus-input-${nextUniqueId}`;
  }

  componentWillLoad() {
    this._disabledChange.emit(this.disabled);
  }

  render() {
    const hasIcon = Boolean(this.element.querySelector('nexus-icon'));

    return (
      <Host
        class={{
          'nexus-input-with-icon': hasIcon
        }}
      >
        <input
          aria-label="nexus input"
          class="nexus-input"
          autocomplete={this.autocomplete}
          disabled={this.disabled}
          id={this._id}
          maxLength={this.maxLength}
          minLength={this.minLength}
          placeholder={this.placeholder}
          required={this.required}
          type={this.type}
          readonly={this.readonly}
          min={this.min}
          max={this.max}
          value={this.value}
        />
        <slot />
      </Host>
    );
  }
}
