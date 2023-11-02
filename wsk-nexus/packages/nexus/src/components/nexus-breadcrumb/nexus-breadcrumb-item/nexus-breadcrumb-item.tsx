import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  tag: 'nexus-breadcrumb-item',
  shadow: false,
  styleUrl: 'nexus-breadcrumb-item.scss'
})
export class NexusBreadcrumbItem {
  /**
   * Whether the breadcrumb item is disabled.
   */
  @Prop({ mutable: true }) disabled: boolean = false;

  render() {
    return (
      <Host aria-hidden="true" class="nexus-breadcrumb-item">
        <li
          class={{
            'nexus-breadcrumb-item-disabled': this.disabled
          }}
        >
          <span class="nexus-breadcrumb-item-separator"></span>
          <slot />
        </li>
      </Host>
    );
  }
}
