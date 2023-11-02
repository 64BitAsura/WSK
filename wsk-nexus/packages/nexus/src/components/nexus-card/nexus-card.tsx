import { Component, h, Host, Element, Prop } from '@stencil/core';

import { updateCustomSlots } from '../../utils';

@Component({
  tag: 'nexus-card',
  shadow: false,
  styleUrl: 'nexus-card.scss'
})
export class NexusCard {
  @Element() private element: HTMLElement;

  /**
   * Background color of the card
   */
  @Prop() bgColor: string;

  /**
   * Background image path of the card
   */
  @Prop() bgImage: string;

  /**
   * The height to the card
   */
  @Prop() height: string;

  /**
   * If set to `true` the entire card will be clickable based on the anchor tag found inside the component.
   */
  @Prop() clickable: boolean;

  componentDidLoad() {
    updateCustomSlots(this.element);

    if (this.clickable) {
      let mousedown;
      let mouseup;
      const CLICKTIME = 200;
      const link = this.element.querySelector('a');

      this.element.style.cursor = 'pointer';
      this.element.onmousedown = () => {
        mousedown = Number(new Date());
      };
      this.element.onmouseup = () => {
        mouseup = Number(new Date());
        if (mouseup - mousedown < CLICKTIME) {
          link.click();
        }
      };
    }
  }

  render() {
    return (
      <Host
        class={{
          'nexus-card': true,
          'nexus-card-clickable': this.clickable,
          'nexus-card-with-bg-image': Boolean(this.bgImage),
          'nexus-card-with-bg-color': Boolean(this.bgColor)
        }}
        style={{
          'background-color': this.bgColor,
          'background-image': this.bgImage ? `url(${this.bgImage})` : null,
          height: this.height
        }}
      >
        <div class="nexus-row">
          <div class="nexus-col-xs-3">
            <div class="nexus-card-header-wrap">
              <div slot-name="nexus-card-avatar"></div>
              <div slot-name="nexus-card-header"></div>
            </div>
          </div>
          <div class="nexus-col-xs-1">
            <div slot-name="nexus-card-header-button"></div>
          </div>
        </div>

        <div slot-name="nexus-card-body"></div>

        <div slot-name="nexus-card-footer"></div>
      </Host>
    );
  }
}
