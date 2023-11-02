import { Component, h, Host, State, Element, Listen } from '@stencil/core';

@Component({
  tag: 'nexus-form-field',
  shadow: false,
  styleUrl: 'nexus-form-field.scss'
})
export class NexusFormField {
  @Element() private readonly element: HTMLNexusFormFieldElement;

  @State() disabled: boolean;

  @State() focus: boolean;

  @State() value: string;

  @Listen('_disabledChange')
  onDisabledChange(value: CustomEvent) {
    this.disabled = value.detail;
  }

  componentDidLoad() {
    this.doDomUpdates();

    const config = {
      attributes: true,
      childList: true,
      subtree: true
    };

    const mutationCb = (mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList') {
          this.setErrorClass();
        }
      });
    };

    const observer = new MutationObserver(mutationCb);
    observer.observe(this.element, config);
  }

  componentDidUpdate() {
    this.doDomUpdates();
  }

  render() {
    const classes = {
      'nexus-form-field': true,
      'nexus-disabled': this.disabled
    };

    return (
      <Host class={classes}>
        <slot />
      </Host>
    );
  }

  private doDomUpdates() {
    const inputEl = this.element.querySelector('input');
    const selectEl = this.element.querySelector('select');
    const textareaEl = this.element.querySelector('textarea');

    const childEl = inputEl || selectEl || textareaEl;

    if (!childEl) {
      return;
    }

    this.setLabelForText(childEl);
    this.setErrorClass();
  }

  private setSelectClass() {
    const labelEl = this.element.querySelector('label');

    if (labelEl) {
      labelEl.classList.add('nexus-label-for-select');
    }
  }

  private setErrorClass() {
    const errorMsgEl = this.element.querySelector('nexus-error-message');

    errorMsgEl ? this.element.classList.add('nexus-invalid') : this.element.classList.remove('nexus-invalid');
  }

  private setLabelForText(element) {
    if (element.type === 'file') {
      return;
    }

    const labelEl = this.element.querySelector('label');
    const selectEl = this.element.querySelector('select');

    if (selectEl) {
      this.setSelectClass();
    }

    if (labelEl) {
      labelEl.htmlFor = element.id;
    }
  }
}
