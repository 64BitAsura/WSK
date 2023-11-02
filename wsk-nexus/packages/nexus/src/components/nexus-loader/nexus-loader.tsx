import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'nexus-loader',
  shadow: false,
  styleUrl: 'nexus-loader.scss'
})
export class NexusLoader {
  /**
   * Whether the loader is shown.
   */
  @Prop() show: boolean = false;

  /**
   * Whether the loader is fullscreen.
   */
  @Prop() fullscreen: boolean = false;

  render() {
    return (
      <Host
        class={{
          'nexus-loader': true,
          'nexus-loader-container': true,
          'nexus-loader-fullscreen': this.fullscreen,
          'nexus-loader-show': this.show
        }}
      >
        <div class="nexus-loader-content">
          <div class="nexus-loader-square" />
          <div class="nexus-loader-square" />
          <div class="nexus-loader-square" />
          <div class="nexus-loader-square" />
        </div>
      </Host>
    );
  }
}
