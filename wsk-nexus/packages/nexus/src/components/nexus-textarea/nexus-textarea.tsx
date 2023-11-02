import { Component, Prop, h, Event, Host, EventEmitter, Watch } from '@stencil/core';

let nextUniqueId;
nextUniqueId = 0;

@Component({
  tag: 'nexus-textarea',
  shadow: false,
  styleUrl: 'nexus-textarea.scss'
})
export class NexusTextarea {
  private readonly _id: string;

  /**
   * The unique identifier for the input and the label to match.
   * If none is provided one will be added by default.
   */
  @Prop() attrId: string = '';

  /**
   * Set the property disabled as true to stop editing the text area
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
   * Specifies the visible width of a text area
   */
  @Prop() cols: number;

  /**
   * Specifies the visible number of lines in a text area
   */
  @Prop() rows: number;

  /**
   * Placehlder text for the textarea
   */
  @Prop() placeholder: string;

  /**
   * Whether the form control is required
   */
  @Prop() required: boolean;

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
    if (this.attrId) {
      this._id = this.attrId;
    } else {
      nextUniqueId++;
      this._id = `nexus-textarea-${nextUniqueId}`;
    }
  }

  componentWillLoad() {
    this._disabledChange.emit(this.disabled);
  }

  render() {
    return (
      <Host>
        <textarea
          class={{
            'nexus-textarea': true,
            'textarea-cols': !this.cols || this.cols === 0,
            'textarea-rows': !this.rows || this.rows === 0
          }}
          disabled={this.disabled}
          id={this._id}
          maxlength={this.maxLength}
          minLength={this.minLength}
          cols={this.cols}
          rows={this.rows}
          placeholder={this.placeholder}
          required={this.required}
          value={this.value}
        />
      </Host>
    );
  }
}
