import { Component, h, Element, Host } from '@stencil/core';
import { updateCustomSlots } from '../../utils';

@Component({
  tag: 'nexus-footer',
  shadow: false,
  styleUrl: 'nexus-footer.scss'
})
export class NexusFooter {
  @Element() private readonly element: HTMLElement;

  componentDidRender() {
    updateCustomSlots(this.element);
  }

  render() {
    return (
      <Host class="nexus-footer">
        <div class="nexus-container">
          <div class="nexus-row">
            <div class="nexus-col-xs-4 nexus-col-sm-1 nexus-col-md-2 nexus-col-lg-2">
              <div slot-name="footer-logo" />
            </div>
            <div class="nexus-col-xs-4 nexus-col-sm-3 nexus-col-md-6 nexus-col-lg-10">
              <div class="nexus-row nexus-footer-row-content">
                <div slot-name="footer-column" />
              </div>
            </div>
          </div>
        </div>
        <div slot-name="footer-bottom" />
      </Host>
    );
  }
}
