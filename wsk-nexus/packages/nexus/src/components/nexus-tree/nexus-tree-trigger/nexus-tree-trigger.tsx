import { Component, h, Host, Event, EventEmitter } from '@stencil/core';

import ContentIcAdd24px from '../../../assets/icons/content/ic_add_24px.svg';
import ContentIcRemove24px from '../../../assets/icons/content/ic_remove_24px.svg';

@Component({
  tag: 'nexus-tree-trigger',
  shadow: false,
  styleUrl: 'nexus-tree-trigger.scss'
})
export class NexusTreeTrigger {
  /**
   * Private event fired when the tree is toggled
   */
  @Event() _toggleTree: EventEmitter;

  render() {
    return (
      <Host class="nexus-tree-trigger">
        <button
          type="button"
          class="nexus-btn nexus-btn-icon"
          onClick={(event) => this._toggleTree.emit(event)}
          disabled={false}
        >
          <nexus-icon
            content={ContentIcAdd24px}
            class="nexus-tree-trigger-icon nexus-tree-trigger-icon-expand"
          ></nexus-icon>
          <nexus-icon
            content={ContentIcRemove24px}
            class="nexus-tree-trigger-icon nexus-tree-trigger-icon-hide"
          ></nexus-icon>
          <slot />
        </button>
      </Host>
    );
  }
}
