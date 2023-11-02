import { Component, h, Host, Prop } from '@stencil/core';

export type propSize2 = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  tag: 'nexus-accordion-content',
  shadow: false,
  styleUrl: 'nexus-accordion-content.scss'
})
export class NexusAccordionContent {
  /**
   * Adjust content padding left right.
   */
  @Prop() size: propSize2 = 'md';

  render() {
    return (
      <Host class="nexus-accordion-content" tabindex="0">
        <div
          class={{
            'nexus-accordion-content-inner': true,
            [`nexus-accordion-content-inner-${this.size}`]: true
          }}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
