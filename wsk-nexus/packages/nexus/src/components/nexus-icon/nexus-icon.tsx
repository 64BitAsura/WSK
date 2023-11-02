import { Component, h, Prop, State, Host, Watch, Build, Element } from '@stencil/core';
import fetchIcon from './utils';

export type propSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '';

@Component({
  tag: 'nexus-icon',
  shadow: false,
  styleUrl: 'nexus-icon.scss'
})
export class NexusIcon {
  @Element() element: HTMLElement;
  /**
   * Alternative text for accessibility.
   */
  @Prop() alt: string = '';

  /**
   * The path to the svg. Will request the SVG.
   */
  @Prop() src: string;
  /**
   * Adjust the icon size (xs = 12px, sm = 16px, md = 24px, lg = 48px, xl = 64px).
   */
  @Prop() size: propSize = '';

  /**
   * Making applied size can't changed upon re-layouting of parent container by applying min width and height value as its specified in width and height
   */
  @Prop() sizeLock: boolean = false;

  /**
   * Enables to load the icons using img markup, Improves performance since it uses browser cache
   * to save image and reduces repeated calls.
   */
  @Prop() type: 'svg' | 'img' = 'svg';

  /**
   * The precompiled content of the svg.
   */
  @Prop() content: string;

  /**
   *  svg meta data information is loaded to contents.
   */
  @State() contents: string = '';

  /**
   *  Check if the icon is in bowsers visible context. This is for lazy loading.
   */
  @State() private visible = false;

  private intersectionObserver: IntersectionObserver;

  @Watch('src') private async fetchIconMetadata(): Promise<void> {
    if (this.type.toLowerCase() === 'svg') {
      const icon = this.src;
      const { visible } = this;
      if (!Build.isBrowser || !icon || !visible) {
        return;
      }
      this.contents = await fetchIcon({
        icon,
        iconPath: this.src
      });
    }
  }

  connectedCallback(): void {
    this.waitUntilVisible(() => {
      this.visible = true;
      this.fetchIconMetadata();
    });
  }

  disconnectedCallback(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
      this.intersectionObserver = null;
    }
  }

  async componentWillLoad(): Promise<void> {
    if (this.type.toLowerCase() === 'svg') {
      await this.fetchIconMetadata();
    }
  }

  private waitUntilVisible(callback: () => void): void {
    if (!Build.isBrowser || typeof window === 'undefined' || !window.IntersectionObserver) {
      callback();

      return;
    }
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.intersectionObserver.disconnect();
            this.intersectionObserver = null;
            callback();
          }
        });
      },
      // The root margin limit before lazy loading of icons.
      { rootMargin: '50px' }
    );

    this.intersectionObserver.observe(this.element);
  }

  render() {
    return (
      <Host
        class={{
          'nexus-icon': true,
          [`nexus-icon-${this.size}`]: this.size !== '',
          'size-locked': this.sizeLock
        }}
        alt={this.alt}
        innerHTML={this.type.toLowerCase() === 'svg' ? this.content || this.contents : null}
      >
        {this.type.toLowerCase() === 'img' ? <img src={this.src} alt={this.alt} /> : null}
      </Host>
    );
  }
}
