import { Component, h, Host, Prop, State, Element } from '@stencil/core';

@Component({
  tag: 'nexus-stepper',
  shadow: false,
  styleUrl: 'nexus-stepper.scss'
})
export class NexusStepper {
  /**
   * Type of the Stepper (row / column) - Default is row. colummn is in Development
   */
  @Prop({ mutable: true }) steppertype: 'row' | 'column' = 'row';

  @State() stepperItemElements: any = [];
  @Element() element: HTMLNexusSelectElement;

  componentWillLoad() {
    this.stepperItemElements = this.element.querySelectorAll('nexus-stepper-item');
  }

  componentDidRender() {
    this.setChildElementProps();
  }

  setChildElementProps() {
    const props = {
      steppertype: this.steppertype
    };
    this.stepperItemElements.forEach((stepperitemEl, index) => {
      stepperitemEl.setPropsValue(props, index + 1);
    });
  }

  render() {
    return (
      <Host>
        <nav
          role={'navigation'}
          class={{
            [`stepper-${this.steppertype}`]: true,
            'nexus-mt-2': true,
            'nexus-mb-2': true
          }}
        >
          <ol>
            <slot />
          </ol>
        </nav>
      </Host>
    );
  }
}
