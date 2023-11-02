import { Component, EventEmitter, h, Host, Prop, Event, Method, Element } from '@stencil/core';

@Component({
  tag: 'nexus-option',
  shadow: false,
  styleUrl: 'nexus-option.scss'
})
export class NexusOption {
  @Element() private readonly element: HTMLNexusOptionElement;
  /**
   * Is the option selected
   */
  @Prop({ reflect: true }) selected: boolean;

  /**
   * Is the option disabled
   */
  @Prop({ reflect: true }) disabled: boolean;

  /**
   *
   * Value for the option selected.
   */
  @Prop({ reflect: true }) value: string | number | boolean;

  /**
   *
   * Label for the option.
   */
  @Prop({ reflect: true }) label: string | number | boolean;

  /**
   *
   * Multipe option selection.
   */
  @Prop({ mutable: true }) multiple: boolean;

  /**
   * Add hover effect if keydown is pressed
   */
  @Prop() keyhover: boolean;

  /**
   * Event fired when the option is clicked.
   */
  @Event() triggerOptionSelected: EventEmitter;

  /**
   * set the Prop values for option
   */
  @Method()
  public async setPropsValue(value) {
    this.multiple = await value.multiple;
  }

  constructor() {
    this.handleSelectedOption = this.handleSelectedOption.bind(this);
  }

  componentDidLoad() {
    this.element.addEventListener('keydown', (event) => {
      if (event.code.trim() === 'Space') {
        event.stopPropagation();
        const checkboxEl = this.element.querySelector('nexus-checkbox');
        checkboxEl.click();
      }
    });
  }

  handleSelectedOption(event) {
    const eventData = {
      label: this.label || this.value,
      key: this.value,
      status: event.target.checked
    };
    if (event.type === 'click' && (!this.multiple || typeof event.target.checked !== 'undefined')) {
      this.triggerOptionSelected.emit(eventData);
    }
  }

  render() {
    return (
      <Host>
        <div
          class={{
            'nexus-option': true,
            'nexus-option-selected': this.selected,
            'nexus-option-disabled': this.disabled,
            'nexus-single-select': !this.multiple,
            'nexus-option-hover': this.keyhover
          }}
          onClick={(event) => this.handleSelectedOption(event)}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
