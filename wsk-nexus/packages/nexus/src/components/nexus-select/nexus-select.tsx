/* eslint-disable complexity */
import { Component, h, Prop, Watch, EventEmitter, Event, Host, Element, State, Listen } from '@stencil/core';

let nextUniqueId;
nextUniqueId = 0;

@Component({
  tag: 'nexus-select',
  shadow: false,
  styleUrl: 'nexus-select.scss'
})
export class NexusSelect {
  private readonly _id: string;

  @Element() element: HTMLNexusSelectElement;

  /**
   * The Unique identifier for the select and the label to match.
   * If none is provided one will be added by default.
   */
  @Prop() attrId: string;

  /**
   * Whether the select is disabled.
   */
  @Prop() disabled: boolean;

  /**
   * Whether the select is required.
   */
  @Prop() required: boolean;

  /**
   * The default selected option.
   */
  @Prop({ mutable: true }) value: string;

  /**
   * Multipe option selection.
   */
  @Prop() multiple: boolean = false;

  /**
   * Whether the select is native
   */
  @Prop() type: 'native' | 'custom' = 'native';

  /**
   * The default selected option.
   */
  @Prop() delimiter: string;

  /**
   * Short hint that describes the expected value of an input
   */
  @Prop() placeholder: string;

  /**
   * Internal event for updating disabled form elements
   */
  @Event() _disabledChange: EventEmitter;

  /**
   * Event for updating selected option
   */
  @Event({ bubbles: false }) triggerSelection: EventEmitter;
  /**
   * Event emited when clicked outside of select
   */
  @Event() closeEvent: EventEmitter;

  @State() showDropDown: boolean = false;

  @State() labels: any[] = [];

  @State() currentIdx = -1;

  @State() optionElements: any = [];

  @State() dropdownElement: any;

  constructor() {
    nextUniqueId++;
    this._id = this.attrId || `nexus-select-${nextUniqueId}`;
  }

  @Watch('disabled')
  updateFormFieldDisabled(newValue: boolean, oldValue: boolean) {
    if (newValue === oldValue) {
      return;
    }

    this._disabledChange.emit(newValue);
  }

  @Watch('showDropDown')
  updateShowDropDown(newValue: boolean, oldValue: boolean) {
    if (newValue && !oldValue) {
      const clientRect = this.element.getBoundingClientRect();
      const dropdownSize = clientRect.width;
      const selectTopPosition = clientRect.top;
      // eslint-disable-next-line no-magic-numbers
      const dropdownHeight = this.multiple ? 145 : 143;
      const isDropdownAtBottom =
        dropdownSize + selectTopPosition > window.innerHeight && window.innerHeight > window.outerHeight;
      if (isDropdownAtBottom && !isDropdownAtBottom) {
        const top = -1 * dropdownHeight;
        this.dropdownElement.setDropdownTop(top);
      }
    }
  }

  @Listen('triggerOptionSelected', { capture: true })
  onTriggerSelectedOption(event: CustomEvent) {
    event.preventDefault();
    if (!this.multiple) {
      this.toggleDropDown();
    }
    this.handleOptionSelection(event);
  }

  @Watch('value')
  updateValue(newValue: string) {
    this.labels = this.value.indexOf(this.delimiter) > -1 ? this.value.split(this.delimiter) : [];

    const selectEl = this.element.querySelector('select');

    if (selectEl) {
      selectEl.value = newValue;
    }
  }

  componentDidLoad() {
    document.addEventListener('click', this.outsideClick.bind(this));
    this.element.parentElement.addEventListener('DOMNodeRemoved', this.onDestroy);

    if (this.type === 'custom') {
      this.element.addEventListener('keydown', (event) => {
        const key = event.code.trim();
        switch (key) {
          case 'Enter':
            this.toggleDropDown();
            break;
          case 'Space':
            this.showDropDown = true;
            break;
          case 'Escape':
          case 'Tab':
            this.showDropDown = false;
            break;
          case 'ArrowDown':
          case 'ArrowRight':
            event.preventDefault();
            this.changeSelectedValue(true);
            break;
          case 'ArrowUp':
          case 'ArrowLeft':
            event.preventDefault();
            this.changeSelectedValue(false);
            break;
          default:
            break;
        }
      });
    }
  }

  outsideClick(event) {
    if (this.showDropDown && !this.element.contains(event.target)) {
      this.showDropDown = false;
    }
    this.closeEvent.emit({ id: this._id });
  }

  onDestroy(event) {
    if (event.target.nodeName === 'NEXUS-SELECT-CUSTOM') {
      document.removeEventListener('click', this.outsideClick);
    }
  }

  componentWillLoad() {
    this._disabledChange.emit(this.disabled);
    this.optionElements = this.element.querySelectorAll('nexus-option');
    this.dropdownElement = this.element.querySelector('nexus-dropdown');
  }

  componentDidRender() {
    const selectEl = this.element.querySelector('select');
    if (selectEl) {
      selectEl.value = this.value;
    }
    this.setChildElementProps();
  }

  toggleDropDown() {
    this.showDropDown = !this.showDropDown;
  }

  handleOptionSelection(event) {
    this.triggerSelection.emit(event.detail);
  }

  setChildElementProps() {
    const props = {
      multiple: this.multiple,
      selectId: this._id
    };
    this.optionElements.forEach((optionEl) => {
      optionEl.setPropsValue(props);
    });
  }

  getSelectedIndex() {
    this.optionElements.forEach((optionEl, idx) => {
      const isSelected = optionEl.getAttribute('selected');
      const hasAttribute = optionEl.hasAttribute('selected');
      if (hasAttribute && isSelected === '') {
        this.currentIdx = idx;
      }
    });
  }

  checkForValidChange(key) {
    let idx;
    idx = key ? this.currentIdx + 1 : this.currentIdx - 1;
    const currentOption = this.optionElements[idx];
    const isDisabled = currentOption && currentOption.hasAttribute('disabled');
    if (isDisabled) {
      idx = key ? idx + 1 : idx - 1;
    }
    const isLastOption = key && idx + 1 > this.optionElements.length;
    const isStartOption = !key && idx < 0;
    if (isLastOption || isStartOption) {
      return true;
    }
    this.currentIdx = idx;

    return false;
  }

  changeSelectedValue(key) {
    if (this.currentIdx <= -1) {
      this.getSelectedIndex();
    }
    if (this.multiple && !this.showDropDown) {
      this.showDropDown = true;
    } else {
      if (this.checkForValidChange(key)) {
        return;
      }
      this.optionElements.forEach((optionEl) => {
        if (this.multiple) {
          optionEl.setAttribute('keyhover', 'false');
        } else {
          optionEl.setAttribute('selected', 'false');
        }
      });
      const optionElement = this.optionElements[this.currentIdx];
      const checkboxE = optionElement.querySelector('input');
      if (this.multiple) {
        optionElement.setAttribute('keyhover', 'true');
        checkboxE.tabIndex = -1;
        checkboxE.focus();
      } else {
        optionElement.setAttribute('selected', 'true');
        this.value = optionElement.getAttribute('label') || optionElement.getAttribute('value');
      }
    }
  }

  getDisplayValueTemplate() {
    return this.labels.length > 0 ? this.labels.join(', ') : this.value;
  }

  render() {
    return (
      <Host for={this._id}>
        {this.type === 'custom' ? (
          <div>
            <div class="nexus-select-custom" onClick={() => this.toggleDropDown()}>
              <nexus-input
                class="select-input"
                value={this.getDisplayValueTemplate()}
                readonly
                placeholder={this.placeholder}
              ></nexus-input>
            </div>
            <nexus-dropdown show={this.showDropDown} dropdown-type="select">
              <slot />
            </nexus-dropdown>
          </div>
        ) : (
          <select
            class="nexus-select"
            multiple={this.multiple}
            disabled={this.disabled}
            required={this.required}
            id={this._id}
          >
            <slot />
          </select>
        )}
      </Host>
    );
  }
}
