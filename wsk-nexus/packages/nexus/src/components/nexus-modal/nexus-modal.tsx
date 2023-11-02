import { Component, h, Host, Prop, Element, Watch, EventEmitter, Event } from '@stencil/core';

@Component({
  tag: 'nexus-modal',
  shadow: false,
  styleUrl: 'nexus-modal.scss'
})
export class NexusModal {
  @Element() element: HTMLNexusModalElement;
  /**
   * Whether the modal is fullscreen.
   */
  @Prop() fullscreen: boolean = false;

  /**
   * Whether to show the modal.
   */
  @Prop() show: boolean = false;

  /**
   * Adjust modal width.
   */
  @Prop() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';

  /**
   * Event fired when the modal closes.
   */
  @Event() closeEvent: EventEmitter;

  @Watch('show')
  updateShowChange(newValue: boolean, oldValue: boolean) {
    if (oldValue && !newValue) {
      this.closeEvent.emit();
    }
  }

  componentDidLoad() {
    this.element.parentElement.addEventListener('DOMNodeRemoved', this.onDestroy);
  }

  onDestroy(event) {
    if (event.target.nodeName === 'NEXUS-MODAL') {
      document.body.style.overflow = '';
    }
  }

  render() {
    document.body.style.overflow = this.show ? 'hidden' : '';

    let modalFullscreen;
    let modalSize;

    modalFullscreen = this.fullscreen;
    modalSize = this.size;

    if (this.fullscreen) {
      modalSize = 'full';
      modalFullscreen = true;
    }

    if (!this.fullscreen && this.size && this.size === 'full') {
      modalFullscreen = true;
    }

    return (
      <Host
        class={{
          'nexus-modal-overlay': true,
          'nexus-modal-overlay-hidden': modalFullscreen,
          'nexus-modal-show': this.show
        }}
      >
        <section
          class={{
            'nexus-modal': true,
            [`nexus-modal-${modalSize}`]: Boolean(modalSize)
          }}
        >
          <slot />
        </section>
      </Host>
    );
  }
}
