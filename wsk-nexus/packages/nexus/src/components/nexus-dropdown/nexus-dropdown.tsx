import { Component, h, Host, Prop, Element, Event, State, Method, EventEmitter } from '@stencil/core';

export type dropDownTypeProp = 'basic' | 'select';
export type placementProp = 'left' | 'center' | 'right';

let nextUniqueId;
nextUniqueId = 0;
@Component({
  tag: 'nexus-dropdown',
  shadow: false,
  styleUrl: 'nexus-dropdown.scss'
})
export class NexusDropdown {
  private readonly _id: string;

  @Element() element: HTMLNexusDropdownElement;

  /**
   * Show and hide dropdown content
   */
  @Prop({ mutable: true }) show: boolean = false;

  /**
   * Whether the dropdown is basic
   */
  @Prop({ mutable: true }) dropdownType: dropDownTypeProp = 'basic';

  /**
   * Whether the select is native
   */
  @Prop({ mutable: true }) placement: placementProp = 'left';

  /**
   * Maximal width of dropdown
   */
  @Prop() width: number;

  /**
   * Maximal height of dropdown
   */
  @Prop() height: number;
  /**
   * position of the dropdown with respect to parent component.
   */

  @State() topPosition: number;
  /**
   * set the drop down position with respective offset.
   *
   * @param top
   */

  @Event() closeEvent: EventEmitter;

  constructor() {
    nextUniqueId++;
    this._id = `nexus-dropdown-${nextUniqueId}`;
  }

  @Method()
  public async setDropdownTop(top) {
    this.topPosition = await top;
    this.setTop();
  }

  componentDidLoad() {
    document.addEventListener('click', this.outsideClick.bind(this));
  }

  toggleDropDown() {
    this.show = !this.show;
  }

  outsideClick(event) {
    const dropdown = document.querySelectorAll('nexus-dropdown');
    if (this.show && !this.element.contains(event.target)) {
      dropdown.forEach((elem) => elem.removeAttribute('show'));
      //  dropdown.removeAttribute('show');
      this.show = false;
    }
    this.closeEvent.emit({ id: this._id });
  }

  setTop() {
    const dropdownContentEl: any = this.element.querySelector('.nexus-dropdown');
    if (dropdownContentEl.hasAttribute('style')) {
      dropdownContentEl.removeAttribute('style');
    }
    dropdownContentEl.setAttribute('style', `top: ${this.topPosition}px`);
  }

  render() {
    return (
      <Host
        onClick={() => this.toggleDropDown()}
        class={{
          'nexus-dropdown-basic-wraper': this.dropdownType === 'basic'
        }}
      >
        <slot name="trigerer" />
        <div
          class={{
            'nexus-dropdown': true,
            'nexus-dropdown-select': this.dropdownType === 'select',
            [`nexus-dropdown-basic-${this.placement} nexus-dropdown-basic`]:
              this.placement && this.dropdownType === 'basic'
          }}
        >
          <div
            class={{
              [`nexus-dropdown-arrow-${this.placement}`]: this.show && this.dropdownType === 'basic'
            }}
          ></div>
          <div
            style={{
              maxHeight: `${this.height}px`,
              width: `${this.width}px`
            }}
            class={{
              'nexus-dropdown-container': true,
              'nexus-dropdown-active': this.show
            }}
          >
            <slot />
          </div>
        </div>
      </Host>
    );
  }
}
