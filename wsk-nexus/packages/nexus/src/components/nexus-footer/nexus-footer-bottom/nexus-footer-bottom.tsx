import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'nexus-footer-bottom',
  shadow: false,
  styleUrl: 'nexus-footer-bottom.scss'
})
export class NexusFooterBottom {
  render() {
    return (
      <Host slot="footer-bottom" class="nexus-footer-bottom">
        <div class="nexus-container">
          <div class="nexus-row">
            <div class="nexus-col-xs-4 nexus-col-md-8 nexus-col-lg-12 nexus-footer-bottom-content">
              <slot />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
