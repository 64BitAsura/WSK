import { Component, h, Host, Element, Prop, State } from '@stencil/core';
import 'tocca';

import { debounceLoad } from '../../utils';

import ArrowLeft from '../../assets/icons/hardware/ic_keyboard_arrow_left_24px.svg';
import ArrowRight from '../../assets/icons/hardware/ic_keyboard_arrow_right_24px.svg';

export interface Config {
  breakpoint?: number;
  overlapSize?: number;
  slidesToShow?: number;
  showButtons?: boolean;
  showButtonsOnHover?: boolean;
}

@Component({
  tag: 'nexus-carousel',
  shadow: false,
  styleUrl: 'nexus-carousel.scss'
})
export class NexusCarousel {
  @Element() element: HTMLNexusCarouselElement;

  /**
   * Configuration options
   */
  @Prop({ mutable: true }) options: Config[];

  @State() currentSlide: number = 0;
  @State() innerWidth: number = 0;
  @State() itemLength: number;

  public itemWidth: number = 0;

  private readonly defaultOption: Config = {
    breakpoint: 0,
    showButtons: true,
    slidesToShow: 1,
    overlapSize: 0,
    showButtonsOnHover: true
  };

  private items;
  private option: Config;

  componentWillLoad() {
    if (this.options) {
      [this.option] = this.options;
    } else {
      this.options = [this.defaultOption];
      this.option = this.defaultOption;
    }
  }

  componentDidLoad() {
    const itemLength = this.element.querySelectorAll('.nexus-carousel-item').length;
    const slider = this.element.querySelector('.nexus-carousel-inner');

    this.items = this.element.querySelectorAll('.nexus-carousel-item');

    const resize = () => {
      this.setup(itemLength);
    };

    const debounceTime = 250;

    debounceLoad(this.setup(itemLength), debounceTime);

    window.addEventListener('resize', debounceLoad(resize, debounceTime));

    slider.addEventListener('swipeleft', () => {
      this.next(itemLength);
    });

    slider.addEventListener('swiperight', () => {
      this.prev();
    });
  }

  render() {
    const itemLength = this.items ? this.items.length : 0;

    return (
      <Host
        class={{
          'nexus-carousel': true,
          'nexus-carousel-show-btns-hover': true
        }}
      >
        <div
          class="nexus-carousel-inner"
          style={{
            width: `${this.innerWidth}px`,
            transform: `translateX(-${this.scrollDistance(
              this.itemWidth,
              itemLength,
              this.option.slidesToShow,
              this.option.overlapSize
            )}px)`
          }}
        >
          <slot />
        </div>
        <div class="nexus-carousel-buttons">
          <button
            type="button"
            class={{
              'nexus-btn-primary': true,
              'nexus-carousel-button-prev': true,
              'nexus-carousel-button-disabled': this.currentSlide === 0
            }}
            onClick={() => this.prev()}
          >
            <nexus-icon content={ArrowLeft}></nexus-icon>
            <span class="nexus-visually-hidden">Settings</span>
          </button>
          <button
            type="button"
            class={{
              'nexus-btn-primary': true,
              'nexus-carousel-button-next': true,
              'nexus-carousel-button-disabled': Boolean(this.currentSlide >= itemLength - this.option.slidesToShow)
            }}
            onClick={() => {
              this.next(itemLength);
            }}
          >
            <nexus-icon content={ArrowRight}></nexus-icon>
            <span class="nexus-visually-hidden">Settings</span>
          </button>
        </div>
      </Host>
    );
  }

  private setup(itemLength) {
    this.currentSlide = 0;

    const option = this.getCurrentOption();

    this.option = {
      breakpoint: option.breakpoint || this.defaultOption.breakpoint,
      overlapSize: option.overlapSize || this.defaultOption.overlapSize,
      showButtons:
        Object.prototype.hasOwnProperty.call(option, 'showButtons') && option.showButtons.toString() === 'false'
          ? false
          : this.defaultOption.showButtons,
      slidesToShow: option.slidesToShow || this.defaultOption.slidesToShow
    };

    this.setInnerWidth(this.element.parentElement.offsetWidth || 0, itemLength);

    this.setItemWidth(this.items, this.innerWidth, itemLength, this.option);
  }

  private getCurrentOption() {
    const viewportWidth = document.documentElement.clientWidth;

    const breakpoints = this.options.filter((option) => option.breakpoint && option.breakpoint < viewportWidth);

    return breakpoints[breakpoints.length - 1] || this.options[0];
  }

  private prev() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  private next(itemLength) {
    if (this.currentSlide < itemLength - this.option.slidesToShow) {
      this.currentSlide++;
    }
  }

  private setInnerWidth(parentWidth, itemLength): void {
    this.innerWidth = parentWidth * itemLength;
  }

  private scrollDistance(itemWidth, itemLength, slidesToShow, overlapSize = 0): number {
    const minScroll = 0;

    const slideWidth = this.currentSlide * itemWidth;
    const overlap = overlapSize / 2;

    const translate = slideWidth - overlap;

    if (translate < minScroll) {
      return 0;
    }
    if (this.currentSlide >= Math.floor((itemLength - 1) / slidesToShow)) {
      return slideWidth - overlapSize;
    }

    return slideWidth - overlap;
  }

  private setItemWidth(items, innerWidth, itemLength, option: Config) {
    if (!items || !items.length) {
      return;
    }

    const itemWidth = innerWidth / itemLength;

    this.itemWidth = (itemWidth - (option.overlapSize || 0)) / option.slidesToShow;

    items.forEach((item) => {
      item.style.width = `${this.itemWidth}px`;
    });
  }
}
