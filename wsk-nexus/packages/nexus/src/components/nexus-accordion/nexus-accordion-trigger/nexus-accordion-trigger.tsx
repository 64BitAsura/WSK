import { Component, h, Event, EventEmitter, Prop, State } from '@stencil/core';
import ContentIcAdd24px from '../../../assets/icons/content/ic_add_24px.svg';
import ContentIcRemove24px from '../../../assets/icons/content/ic_remove_24px.svg';

@Component({
  tag: 'nexus-accordion-trigger',
  shadow: false,
  styleUrl: 'nexus-accordion-trigger.scss'
})
export class NexusAccordionTrigger {
  /**
   * Trigger accordion toggle events upon clicking the toggle button.
   */
  @Event() private readonly _triggerClick: EventEmitter;
  /**
   * Align header content.
   */
  @Prop() align: 'start' | 'center' | 'end' = 'start';

  /**
   * Manage open and close states for accordion.
   */
  @State() open: boolean = false;

  handleTrigger(event) {
    this.open = !this.open;
    this._triggerClick.emit(event);
  }

  render() {
    return (
      <button type="button" class="nexus-accordion-trigger" onClick={(event) => this.handleTrigger(event)}>
        <div class="nexus-accordion-icons">
          <nexus-icon content={ContentIcAdd24px} class="nexus-accordion-expand-icon"></nexus-icon>
          <nexus-icon content={ContentIcRemove24px} class="nexus-accordion-collapse-icon"></nexus-icon>
        </div>
        <div
          class={{
            'nexus-accordion-title-content': true,
            [`show-content-at-${this.align}`]: true
          }}
        >
          <slot />
        </div>
      </button>
    );
  }
}
