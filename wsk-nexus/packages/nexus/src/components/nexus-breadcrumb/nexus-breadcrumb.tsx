import { Component, h, Host, Prop, Element } from '@stencil/core';

@Component({
  tag: 'nexus-breadcrumb',
  shadow: false,
  styleUrl: 'nexus-breadcrumb.scss'
})
export class NexusBreadcrumb {
  @Element() element: HTMLNexusBreadcrumbElement;
  /**
   * The separation between the breadcrumb items. Can pass any character.
   */
  @Prop({ mutable: true }) separator: string = '/';

  setBreadcrumbItemProps() {
    const breadcrumbEl = Array.from(this.element.getElementsByClassName('nexus-breadcrumb-item'));
    breadcrumbEl.slice(1, breadcrumbEl.length).forEach((value) => {
      const spanTag = value.getElementsByTagName('span');
      spanTag[0].innerHTML = this.separator;
    });
  }

  componentDidLoad() {
    this.setBreadcrumbItemProps();
  }

  render() {
    return (
      <Host class="nexus-breadcrumb">
        <ol class="nexus-breadcrumb-list">
          <slot />
        </ol>
      </Host>
    );
  }
}
