import { Component, h, Host, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'nexus-progress-bar',
  shadow: false,
  styleUrl: 'nexus-progress-bar.scss'
})
export class NexusProgressBar {
  /* eslint-disable no-magic-numbers */
  private static readonly DEGREE_MULTIPLIER = 3.6;
  private static readonly PERCENT_MAX = 100;
  private static readonly PERCENT_INCREMENT_RATE = 15;
  /* eslint-enable no-magic-numbers */

  private interval: number;

  /**
   * Sets the current progress percentage out of 100 for the bar.
   */
  @Prop({ mutable: true }) value = 0;

  /**
   * Indicates if progress value should be ignored and the value indeterminate.
   */
  @Prop({ mutable: true }) indeterminate: boolean = false;

  /**
   * Indicates if the progress bar should present its error state.
   */
  @Prop({ mutable: true }) error: boolean = false;

  /**
   * Indicates if the progress indicator should be a circle instead of a bar.
   */
  @Prop({ mutable: true }) circle: boolean = false;

  @State() width: number;

  @State() hasError: boolean;

  @State() isIndeterminate: boolean;

  @State() isCircle: boolean;

  @Watch('error')
  setError(newValue: boolean, oldValue: boolean) {
    if (newValue === oldValue) {
      return;
    }

    this.hasError = newValue;
  }

  @Watch('indeterminate')
  setIndeterminate(newValue: boolean, oldValue: boolean) {
    if (newValue === oldValue) {
      return;
    }

    this.isIndeterminate = newValue;
    this.checkValue();
  }

  @Watch('value')
  setWidth(newValue: number, oldValue: number) {
    if (newValue === oldValue || this.isIndeterminate) {
      return;
    }

    this.width = newValue;
  }

  @Watch('circle')
  setCircle(newValue: boolean, oldValue: boolean) {
    if (newValue === oldValue) {
      return;
    }

    this.isCircle = newValue;
    this.checkValue();
  }

  checkValue() {
    if (this.isIndeterminate && this.isCircle) {
      this.updateValue();
    } else if (this.interval) {
      window.clearInterval(this.interval);
    }
  }

  updateValue() {
    this.interval = window.setInterval(() => {
      if (this.value === NexusProgressBar.PERCENT_MAX) {
        this.value = 0;
      } else {
        this.value++;
      }
    }, NexusProgressBar.PERCENT_INCREMENT_RATE);
  }

  componentWillLoad() {
    this.hasError = this.error;
    this.isIndeterminate = this.indeterminate;
    this.width = this.isIndeterminate ? 0 : this.value;
    this.isCircle = this.circle;
    this.checkValue();
  }

  progressBar() {
    return (
      <Host class="nexus-progress-bar">
        <slot />
        <div class="nexus-progress-bar-meter-container">
          <div
            class={{
              'nexus-progress-bar-meter': true,
              'nexus-progress-bar-meter-indeterminate': this.isIndeterminate,
              'nexus-progress-bar-meter-error': this.hasError
            }}
            style={{
              width: `${this.width}%`
            }}
          ></div>
        </div>
      </Host>
    );
  }

  progressCircle() {
    return (
      <Host class="nexus-progress-bar nexus-progress-bar-circle">
        <div
          class={{
            'nexus-progress-bar-pie': true,
            'nexus-progress-bar-hide-right': this.value <= NexusProgressBar.PERCENT_MAX / 2,
            'nexus-progress-bar-error': this.hasError
          }}
        >
          <div
            class="nexus-progress-bar-half-circle"
            style={{
              transform: `rotate(${this.value * NexusProgressBar.DEGREE_MULTIPLIER}deg)`
            }}
          />
          <div
            class={{
              'nexus-progress-bar-left-hidden': this.value <= NexusProgressBar.PERCENT_MAX / 2
            }}
          />
          <slot />
          <div class="nexus-progress-bar-right-side nexus-progress-bar-half-circle" />
        </div>

        <div class="nexus-progress-bar-shadow" />
      </Host>
    );
  }

  render() {
    return this.isCircle ? this.progressCircle() : this.progressBar();
  }
}
