import { Component, h, Prop, Host, Method, State } from '@stencil/core';
import completeIcon from '../../../assets/icons/steppericons/complete.svg';
import AlertIcWarning24px from '../../../assets/icons/alert/ic_warning_24px.svg';
import errorIcon from '../../../assets/icons/steppericons/error.svg';

@Component({
  tag: 'nexus-stepper-item',
  shadow: false,
  styleUrl: 'nexus-stepper-item.scss'
})
export class NexusStepperItem {
  /**
   * Type of the Stepper (row / column) - Default is row. colummn is in Development
   */
  @State() steppertype: string = 'row';

  /**
   * current status of the step
   */
  @Prop({ mutable: true }) status: 'complete' | 'active' | 'warning' | 'error' | 'default' | 'skipped' = 'default';

  @State() stepIndex: Number;

  @Method()
  public async setPropsValue(value, index) {
    this.steppertype = await value.steppertype;
    this.stepIndex = index;
  }

  renderIcons() {
    if (this.status === 'complete') {
      return (
        <nexus-icon
          aria-hidden={'true'}
          alt="completed"
          title={'completed'}
          size="md"
          size-lock={true}
          content={completeIcon}
          class="icon-complete"
        />
      );
    }
    if (this.status === 'error') {
      return (
        <nexus-icon
          aria-hidden={'true'}
          alt="error"
          title={'error'}
          size="md"
          size-lock={true}
          content={errorIcon}
          class="icon-error"
        />
      );
    }
    if (this.status === 'warning') {
      return (
        <nexus-icon
          aria-hidden={'true'}
          alt="warning"
          title={'warning'}
          size="md"
          size-lock={true}
          content={AlertIcWarning24px}
          class="icon-warning"
        />
      );
    }
  }

  renderStep() {
    return (
      <Host
        class={{
          [`stepper-item`]: true,
          [`step-${this.steppertype}`]: true,
          [`stepcolor-${this.steppertype} ${this.status}`]: this.steppertype === 'row'
        }}
        role={'listitem'}
      >
        <div
          class={{
            [`nexus-stepper-item`]: true,
            [`step-counter-column`]: this.steppertype === 'column',
            [`stepcolor-${this.steppertype} ${this.status}`]: this.steppertype === 'column'
          }}
        >
          {['default', 'active', 'skipped'].includes(this.status) ? (
            <div
              aria-hidden={'true'}
              title={`${this.stepIndex ?? '-'}`}
              class={{
                [`step-counter ${this.status}`]: true
              }}
            >
              {this.stepIndex}
            </div>
          ) : (
            this.renderIcons()
          )}
          <slot />
        </div>
      </Host>
    );
  }

  render() {
    return this.renderStep();
  }
}
