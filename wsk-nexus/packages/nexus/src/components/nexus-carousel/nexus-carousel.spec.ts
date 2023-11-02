/* eslint-disable no-magic-numbers */
import { NexusCarousel } from './nexus-carousel';
import { newSpecPage } from '@stencil/core/testing';
import { NexusCarouselItem } from './nexus-carousel-item/nexus-carousel-item';

const nexCaroClass = '.nexus-carousel-inner';
const htmlTemplate = `<nexus-carousel>
<nexus-carousel-item></nexus-carousel-item>
<nexus-carousel-item></nexus-carousel-item>
<nexus-carousel-item></nexus-carousel-item>
</nexus-carousel>`;

describe('Check nexus-carousel', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusCarousel],
      html: '<nexus-carousel></nexus-carousel>'
    });

    expect(new NexusCarousel()).toBeTruthy();
    expect(page.root).toHaveClass('nexus-carousel');
  });

  it('should set the width of each item', async () => {
    let slidesToShow;

    const page = await newSpecPage({
      components: [NexusCarousel, NexusCarouselItem],
      html: `
        <nexus-carousel slidesToShow=${slidesToShow}>
          <nexus-carousel-item></nexus-carousel-item>
          <nexus-carousel-item></nexus-carousel-item>
          <nexus-carousel-item></nexus-carousel-item>
        </nexus-carousel>
      `
    });

    page.rootInstance.options = [
      {
        slidesToShow: 1,
        overlapSize: 60
      }
    ];

    const item: HTMLElement = page.root.querySelector('.nexus-carousel-item');

    const parentWidth = 300;

    Object.defineProperties(page.root.parentElement, {
      offsetWidth: {
        get: function get() {
          return parentWidth;
        },
        configurable: true
      }
    });

    page.rootInstance.componentDidLoad();

    await page.waitForChanges();

    expect(item.style.width).toBe('240px');

    page.rootInstance.options = [
      {
        slidesToShow: 1
      },
      {
        breakpoint: 768,
        slidesToShow: 2
      }
    ];
    Object.defineProperties(page.doc.documentElement, {
      clientWidth: {
        get: function get() {
          return 800;
        },
        configurable: true
      }
    });

    Object.defineProperties(page.root.parentElement, {
      offsetWidth: {
        get: () => 800,
        configurable: true
      }
    });

    page.rootInstance.componentDidLoad();

    await page.waitForChanges();

    expect(item.style.width).toBe('400px');
  });
});

describe('nexus-carousel', () => {
  it('should set the width of the card container', async () => {
    const page = await newSpecPage({
      components: [NexusCarousel, NexusCarouselItem],
      html: htmlTemplate
    });

    const wrap: HTMLElement = page.root.querySelector(nexCaroClass);

    Object.defineProperties(page.root.parentElement, {
      offsetWidth: {
        get: () => 900,
        configurable: true
      }
    });

    page.rootInstance.componentDidLoad();

    await page.waitForChanges();

    expect(wrap.style.width).toBe('2700px');
  });

  it('should move 1 card on swipe', async () => {
    const page = await newSpecPage({
      components: [NexusCarousel, NexusCarouselItem],
      html: htmlTemplate
    });

    const slider = page.root.querySelector(nexCaroClass);
    const swipeleft = new Event('swipeleft');
    const swiperight = new Event('swiperight');

    await page.waitForChanges();

    expect(page.rootInstance.currentSlide).toBe(0);

    // Swipe Left
    slider.dispatchEvent(swipeleft);
    await page.waitForChanges();
    expect(page.rootInstance.currentSlide).toBe(1);

    // Swipe Left
    slider.dispatchEvent(swipeleft);
    await page.waitForChanges();
    expect(page.rootInstance.currentSlide).toBe(2);

    // Swipe Right
    slider.dispatchEvent(swiperight);
    await page.waitForChanges();
    expect(page.rootInstance.currentSlide).toBe(1);

    // Swipe Right
    slider.dispatchEvent(swiperight);
    await page.waitForChanges();
    expect(page.rootInstance.currentSlide).toBe(0);
  });

  it('should set the scroll distance', async () => {
    const page = await newSpecPage({
      components: [NexusCarousel, NexusCarouselItem],
      html: htmlTemplate
    });

    const itemLength = 3;
    const itemWidth = 300;

    let overlap;
    let slidesToShow;

    // no overlap
    page.rootInstance.currentSlide = 0;
    overlap = 0;
    slidesToShow = 1;
    expect(page.rootInstance.scrollDistance(itemWidth, itemLength, slidesToShow, overlap)).toBe(0);

    page.rootInstance.currentSlide = 1;
    expect(page.rootInstance.scrollDistance(itemWidth, itemLength, slidesToShow, overlap)).toBe(300);

    page.rootInstance.currentSlide = 2;
    expect(page.rootInstance.scrollDistance(itemWidth, itemLength, slidesToShow, overlap)).toBe(600);

    // overlap
    page.rootInstance.currentSlide = 0;
    overlap = 60;
    expect(page.rootInstance.scrollDistance(itemWidth, itemLength, slidesToShow, overlap)).toBe(0);

    page.rootInstance.currentSlide = 1;
    expect(page.rootInstance.scrollDistance(itemWidth, itemLength, slidesToShow, overlap)).toBe(270);

    page.rootInstance.currentSlide = 2;
    expect(page.rootInstance.scrollDistance(itemWidth, itemLength, slidesToShow, overlap)).toBe(540);

    // overlap
    page.rootInstance.currentSlide = 0;
    overlap = 60;
    slidesToShow = 2;
    expect(page.rootInstance.scrollDistance(itemWidth, itemLength, slidesToShow, overlap)).toBe(0);

    page.rootInstance.currentSlide = 1;
    expect(page.rootInstance.scrollDistance(itemWidth, itemLength, slidesToShow, overlap)).toBe(240);
  });

  it('should allow an overlap to see other cards', async () => {
    const page = await newSpecPage({
      components: [NexusCarousel, NexusCarouselItem],
      html: htmlTemplate
    });

    page.rootInstance.options = [
      {
        slidesToShow: 1,
        overlapSize: 60
      }
    ];

    await page.waitForChanges();

    const item: HTMLElement = page.root.querySelector('.nexus-carousel-item');

    Object.defineProperties(page.root.parentElement, {
      offsetWidth: {
        get: () => 360,
        configurable: true
      }
    });

    page.rootInstance.componentDidLoad();

    await page.waitForChanges();

    expect(item.style.width).toBe('300px');
  });

  it('should not go past the first or last item', async () => {
    const page = await newSpecPage({
      components: [NexusCarousel, NexusCarouselItem],
      html: `
        <nexus-carousel>
          <nexus-carousel-item></nexus-carousel-item>
          <nexus-carousel-item></nexus-carousel-item>
        </nexus-carousel>
      `
    });

    const slider = page.root.querySelector(nexCaroClass);
    const swipeleft = new Event('swipeleft');
    const swiperight = new Event('swiperight');

    await page.waitForChanges();

    expect(page.rootInstance.currentSlide).toBe(0);

    // Swipe Left
    slider.dispatchEvent(swipeleft);
    await page.waitForChanges();
    expect(page.rootInstance.currentSlide).toBe(1);

    // Swipe Left
    slider.dispatchEvent(swipeleft);
    await page.waitForChanges();
    expect(page.rootInstance.currentSlide).toBe(1);

    // Swipe Right
    slider.dispatchEvent(swiperight);
    await page.waitForChanges();
    expect(page.rootInstance.currentSlide).toBe(0);

    // Swipe Right
    slider.dispatchEvent(swiperight);
    await page.waitForChanges();
    expect(page.rootInstance.currentSlide).toBe(0);
  });
});
