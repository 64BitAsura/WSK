import { Component, h, Host, State, Element, Prop } from '@stencil/core';
const DEBOUNCE_INTERVAL = 30;

@Component({
  tag: 'nexus-search',
  shadow: false,
  styleUrl: 'nexus-search.scss'
})
export class NexusSearch {
  @Element() private readonly element: HTMLElement;

  @State() currentIdx: number = -1;
  @State() open: boolean;

  /**
   * time interval for the event listner.
   */

  @Prop({ mutable: true }) debounceInterval = DEBOUNCE_INTERVAL;

  private options: any = [];

  componentDidLoad() {
    this.element.addEventListener('keydown', (event) => {
      this.handleKeyDown(event);
    });

    const input = this.element.querySelector('input');

    if (!input) {
      return;
    }

    input.addEventListener('change', () => {
      setTimeout(() => {
        this.updateEventListener();
      }, this.debounceInterval);
    });

    input.addEventListener('focus', () => {
      this.open = true;
    });

    input.addEventListener('click', () => {
      this.open = true;
    });

    document.addEventListener('click', this.clickOutside.bind(this));
    document.addEventListener('mousedown', this.clickOutside.bind(this));
    this.updateEventListener();

    this.element.parentElement.addEventListener('DOMNodeRemoved', this.onDestroy);
  }

  render() {
    return (
      <Host
        class={{
          'nexus-search': true,
          'nexus-open': this.open
        }}
      >
        <slot />
      </Host>
    );
  }

  private clickOutside(event) {
    if (!this.element.contains(event.target)) {
      this.open = false;
    }
    if (this.open && !this.element.contains(event.target)) {
      this.open = false;
    }
  }

  private readonly getCurrentKey = (event) => event.key.toLowerCase();

  private keyArrowDown(event) {
    event.preventDefault();
    if (this.currentIdx + 1 < this.options.length) {
      this.currentIdx += 1;

      this.setSelected(this.currentIdx);
    }
  }

  private keyArrowUp(event) {
    event.preventDefault();
    if (this.currentIdx - 1 > -1) {
      this.currentIdx -= 1;

      this.setSelected(this.currentIdx);
    }
  }

  private keyEnter() {
    this.element.querySelector('input').value = this.options[this.currentIdx].innerText.trim();

    this.open = false;
  }

  private keyTab() {
    this.open = false;
  }

  private handleKeyDown(event) {
    const key = this.getCurrentKey(event);

    switch (key) {
      case 'arrowdown':
        this.keyArrowDown(event);
        break;

      case 'arrowup':
        this.keyArrowUp(event);
        break;

      case 'enter':
        this.keyEnter();
        break;

      case 'tab':
        this.keyTab();
        break;

      default:
        break;
    }
  }

  private onDestroy(event) {
    if (event.target.nodeName === 'NEXUS-SEARCH') {
      document.removeEventListener('click', this.clickOutside);
      document.removeEventListener('mousedown', this.clickOutside);
    }
  }

  private setSelected(currentIdx) {
    const selectedClass = 'nexus-selected';
    this.open = true;
    this.options.forEach((element) => {
      element.classList.remove(selectedClass);
    });

    this.options[currentIdx].classList.add(selectedClass);
  }

  private updateEventListener() {
    this.options = this.element.querySelectorAll('.nexus-search-list-li');
    this.options.forEach((element) => {
      element.addEventListener('click', (event) => {
        this.element.querySelector('input').value = event.target.innerText.trim();
        this.open = false;
      });
    });
  }
}
