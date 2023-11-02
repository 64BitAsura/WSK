import { Component, h, Host, Prop, Element, Listen } from '@stencil/core';

@Component({
  tag: 'nexus-tree',
  shadow: false,
  styleUrl: 'nexus-tree.scss'
})
export class NexusTree {
  @Element() element: HTMLNexusTreeElement;

  /**
   * Whether the tree is open
   */
  @Prop({ mutable: true }) open: boolean = false;

  @Listen('_toggleTree', { capture: true })
  _toggle() {
    this.open = !this.open;

    this.updateHeight(this.open);
  }

  private updateHeight(expand) {
    const element = this.element.querySelector('nexus-tree-content');
    element.style.height = expand ? `${element.scrollHeight}px` : '0';
  }

  componentDidLoad() {
    const content = this.element.querySelector('nexus-tree-content');
    if (content) {
      content.style.height = this.open ? `${content.scrollHeight}px` : '0';
    }
  }

  render() {
    return (
      <Host
        class={{
          'nexus-tree': true,
          'nexus-tree-content-visible': this.open
        }}
      >
        <slot />
      </Host>
    );
  }
}
