import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import NavigationIcClose24px from '../../assets/icons/navigation/ic_close_24px.svg';

@Component({
  tag: 'nexus-chip',
  shadow: false,
  styleUrl: 'nexus-chip.scss'
})
export class NexusChip {
  /**
   * Whether the chip is disabled, making it unusable and unclickable.
   */
  @Prop() disabled: boolean = false;

  /**
   * Whether the chip is in a error state
   */
  @Prop() error: boolean = false;

  /**
   * Whether the chip contains the "X" icon, notifying the user that they can remove that chip.
   */
  @Prop() removable: boolean = false;

  /**
   * Whether a green border is added to the chip, showing success state.
   */
  @Prop() success: boolean = false;

  /**
   * Trigger removable icon click event.
   */
  @Event() triggerRemovableClick: EventEmitter;

  render() {
    return (
      <button
        type="button"
        disabled={this.disabled}
        class={{
          'nexus-chip': true,
          'nexus-success': this.success,
          'nexus-error': this.error
        }}
      >
        {this.removable && (
          <nexus-icon
            content={NavigationIcClose24px}
            class="nexus-close-icon"
            onClick={() => this.triggerRemovableClick.emit()}
          ></nexus-icon>
        )}
        <slot />
      </button>
    );
  }
}
