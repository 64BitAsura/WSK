import { Component, h, Element, Host } from '@stencil/core';
import { updateCustomSlots } from '../../../utils';

@Component({
  tag: 'nexus-footer-column',
  shadow: false,
  styleUrl: 'nexus-footer-column.scss'
})
export class NexusFooterColumn {
  @Element() private readonly element: HTMLElement;

  componentDidRender() {
    updateCustomSlots(this.element);
  }

  render() {
    return (
      <Host class="nexus-footer-column" slot="footer-column">
        <div class="nexus-col-xs-4 nexus-col-md-8 nexus-footer-column-list">
          <div slot-name="footer-content-title" />
          <div slot-name="footer-content" />
        </div>
      </Host>
    );
  }
}
