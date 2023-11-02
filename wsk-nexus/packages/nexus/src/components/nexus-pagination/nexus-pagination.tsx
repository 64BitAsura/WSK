import { Component, h, Host, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';

import NavigationIcFirstPage24px from '../../assets/icons/navigation/ic_first_page_24px.svg';
import NavigationIcChevronLeft24px from '../../assets/icons/navigation/ic_chevron_left_24px.svg';
import NavigationIcChevronRight24px from '../../assets/icons/navigation/ic_chevron_right_24px.svg';
import NavigationIcLastPage24px from '../../assets/icons/navigation/ic_last_page_24px.svg';

@Component({
  tag: 'nexus-pagination',
  shadow: false,
  styleUrl: 'nexus-pagination.scss'
})
export class NexusPagination {
  /**
   * Max number of pages
   */
  @Prop({ mutable: true }) max: number;

  /**
   * Current Page
   */
  @Prop({ mutable: true }) current: number;

  /**
   * Input Width
   */
  @State() width: number = 1;

  /**
   * Event fired when page is changed.
   */
  @Event() changeEvent: EventEmitter;

  @Watch('current')
  setWidth(newValue: string, oldValue: string) {
    if (newValue === oldValue) {
      return;
    }

    this.width = newValue.toString().length || 1;
  }

  componentWillLoad() {
    this.current = this.current && this.current > 0 ? this.current : 1;
    this.max = this.max && this.max > 0 ? this.max : 1;
    this.width = this.current.toString().length || 1;
    this.current = this.current > this.max ? this.max : this.current;
  }

  render() {
    return (
      <Host class="nexus-pagination">
        <button
          type="button"
          class="nexus-btn nexus-btn-icon"
          onClick={() => this.handleChange(1)}
          disabled={this.current <= 1}
        >
          <nexus-icon content={NavigationIcFirstPage24px}></nexus-icon>
          <span class="nexus-visually-hidden">First Page</span>
        </button>

        <button
          type="button"
          class="nexus-btn nexus-btn-icon"
          onClick={() => this.handleChange(this.current - 1)}
          disabled={this.current <= 1}
        >
          <nexus-icon content={NavigationIcChevronLeft24px}></nexus-icon>
          <span class="nexus-visually-hidden">Previous Page</span>
        </button>

        <div class="nexus-pagination-count">
          <input
            aria-label="Page Number"
            type="number"
            min="1"
            max={this.max || 1}
            value={this.current || 1}
            class="nexus-pagination-count-input"
            style={{
              width: `calc(${this.width}ch + (${this.width} * -0.05rem))`
            }}
            onInput={(event: any) => this.setCurrent(event.target.value)}
            onChange={(event: any) => this.handleChange(event.target.value)}
          />
          /<span class="nexus-number-of-pages">{this.max || 1}</span>
        </div>

        <button
          type="button"
          class="nexus-btn nexus-btn-icon"
          onClick={() => this.handleChange(this.current + 1)}
          disabled={this.current >= this.max}
        >
          <nexus-icon content={NavigationIcChevronRight24px}></nexus-icon>
          <span class="nexus-visually-hidden">Next Page</span>
        </button>

        <button
          type="button"
          class="nexus-btn nexus-btn-icon"
          onClick={() => this.handleChange(this.max)}
          disabled={this.current >= this.max}
        >
          <nexus-icon content={NavigationIcLastPage24px}></nexus-icon>
          <span class="nexus-visually-hidden">Last Page</span>
        </button>
      </Host>
    );
  }

  private handleChange(val) {
    const min = val < 1;
    const max = val > this.max;

    if (min || max) {
      return;
    }

    this.changeEvent.emit(val);
  }

  private setCurrent(val) {
    this.current = val > this.max ? this.max : val;
  }
}
