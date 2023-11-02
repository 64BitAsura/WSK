import { Component, Prop, h, Host, EventEmitter, Event, Element, Watch, State } from '@stencil/core';

let nextUniqueId;
nextUniqueId = 0;
const ONE_HUNDRED = 100;

@Component({
  tag: 'nexus-slider',
  shadow: false,
  styleUrl: 'nexus-slider.scss'
})
export class NexusSlider {
  @Element() private readonly element: HTMLNexusInputElement;

  private readonly _id: string;
  private _rangeProgress: HTMLInputElement;
  private _sliderValueProgress: HTMLLabelElement;

  /**
   * A unique identifier for the slider and the label to match.
   * If none is provided one will be added by default.
   */
  @Prop() attrId: string = '';

  /**
   * Whether the form control is disabled
   */
  @Prop() disabled: boolean;

  /**
   * Maximum length of slider value
   */
  @Prop() max: number = ONE_HUNDRED;

  /**
   * Minimum length of slider value
   */
  @Prop() min: number = 0;

  /**
   * Whether the form control is required
   */
  @Prop() required: boolean;

  /**
   * The state value of the input
   */
  @State() value: number;

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

  calculateProgress() {
    const total = this.max - this.min;
    const adjustedValue = this.value - this.min;
    // eslint-disable-next-line no-magic-numbers
    const res = Number((adjustedValue * ONE_HUNDRED) / total);

    return res;
  }

  handleOnInput(event) {
    this.value = event.target.value;
    const percent = this.calculateProgress();
    this._rangeProgress.style.setProperty('--rangeProgressPercent', `${percent}%`);
    this._sliderValueProgress.style.setProperty('--sliderValueProgressPercent', `${percent}%`);
  }

  constructor() {
    if (this.attrId) {
      this._id = this.attrId;
    } else {
      nextUniqueId++;
      this._id = `nexus-slider-${nextUniqueId}`;
    }
    this._disabledChange.emit(this.disabled);
  }

  componentDidLoad() {
    this._rangeProgress = this.element.querySelector('input');
    this._sliderValueProgress = this.element.querySelector('label');
    this._rangeProgress.style.setProperty('--rangeProgressPercent', `${'50'}%`);
    this._sliderValueProgress.style.setProperty('--sliderValueProgressPercent', `${'50'}%`);
    this.value = Number((this.max - this.min) / 2) + this.min;
  }

  render() {
    return (
      <Host class="nexus-slider">
        <input
          class="nexus-slider-input"
          disabled={this.disabled}
          id={this._id}
          max={this.max}
          min={this.min}
          required={this.required}
          type="range"
          onInput={(event) => this.handleOnInput(event)}
          value={this.value}
        />
        <div class="nexus-slider-wrap">
          <label class="nexus-slider-current-value-top">{this.value || this.min}</label>
        </div>
        <span class="nexus-slider-min-value">{this.min}</span>
        <span class="nexus-slider-max-value">{this.max}</span>

        <slot />
      </Host>
    );
  }
}
