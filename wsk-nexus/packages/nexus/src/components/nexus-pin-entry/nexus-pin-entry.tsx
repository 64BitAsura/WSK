/* eslint-disable no-extra-parens */
import { Component, h, Host, Prop, Event, EventEmitter, Element } from '@stencil/core';

@Component({
  tag: 'nexus-pin-entry',
  shadow: false,
  styleUrl: 'nexus-pin-entry.scss'
})
export class NexusPinEntry {
  private arrInputs: HTMLCollectionOf<Element>;
  private currIndex: number = 0;
  private pin: Array<string>;

  @Element() private readonly element: HTMLElement;
  /**
   *  Whether the pin is disabled
   */
  @Prop({ mutable: true }) disabled: boolean = false;

  /**
   *  Length of pin entry
   */
  @Prop({ mutable: true }) length: number = 1;

  /**
   *  Type for pin entry, e.g. text, password
   */
  @Prop({ mutable: true }) type: 'text' | 'password' | 'tel' = 'text';

  /**
   * Event fired when pin is entered.
   */
  @Event() pinEvent: EventEmitter;

  private handleOnKeyDown(event) {
    const { key } = event;

    if (key === 'Backspace' || key === 'Delete') {
      if (this.currIndex !== 0 && !this.pin[this.currIndex]) {
        this.backwards(this.arrInputs);
      }
    }
  }

  private handleOnInput(event, index) {
    const { value } = event.target;

    this.currIndex = index;
    this.pin.splice(index, 1, value || null);
    const cleanPin = this.pin.join('');

    this.pinEvent.emit(cleanPin);

    if (value !== '') {
      this.advance(index, this.arrInputs);
    }
  }

  private handleFocus(index) {
    this.currIndex = index;
  }

  private advance(index, arrInputs) {
    const nextIndex = (index + 1) % Math.abs(this.length);

    if (nextIndex !== 0) {
      const nextPin = arrInputs[nextIndex];
      if (!this.pin[nextIndex]) {
        nextPin.focus();
        this.currIndex = nextIndex;
      }
    }
  }

  private backwards(arrInputs) {
    this.currIndex -= 1;
    arrInputs[this.currIndex].focus();
    this.pin.splice(this.currIndex, 1, null);
  }

  componentDidLoad() {
    this.arrInputs = this.element.getElementsByClassName('nexus-input');
  }

  render() {
    this.pin = [...Array<string>(Math.abs(this.length))];

    return (
      <Host class="nexus-pin-entry">
        <div class="nexus-pin-entry-wrapper">
          {this.pin.map((_value, index) => (
            <nexus-input
              // aria-label="pin entry input"
              class={`nexus-pin-entry-input nexus-pin-entry-input-${index}`}
              disabled={this.disabled}
              maxLength={1}
              onKeyDown={(event) => this.handleOnKeyDown(event)}
              onFocus={() => this.handleFocus(index)}
              onInput={(event) => this.handleOnInput(event, index)}
              type={this.type}
              value={this.pin[index]}
            />
          ))}
        </div>
      </Host>
    );
  }
}
