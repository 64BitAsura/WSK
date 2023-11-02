import { NexusSlider } from './nexus-slider';
import { newSpecPage } from '@stencil/core/testing';

const nexSliCls = 'nexus-slider-';
const sliderInput = 'input';

const declrComp = (htmlStr: string) =>
  newSpecPage({
    components: [NexusSlider],
    html: htmlStr
  });

describe('check nexus-slider', () => {
  it('should contain class', async () => {
    const page = await declrComp(`<nexus-slider></nexus-slider>`);

    const slider = page.body.querySelector(sliderInput);
    expect(slider).toHaveClass('nexus-slider-input');
  });

  it('should set a custom id if one is provided', async () => {
    const page = await declrComp(`<nexus-slider attr-id="custom-id"></nexus-slider>`);

    const slider = page.root.querySelector(sliderInput);
    expect(slider.id).toContain('custom-id');
  });

  it('should overwrite default id if one exists', async () => {
    const page = await declrComp(`<nexus-slider attr-id="custom-id"></nexus-slider>`);

    const slider = page.root.querySelector(sliderInput);
    expect(slider.id).toEqual('custom-id');
  });

  it('should set a default id if none exists', async () => {
    const page = await declrComp(`<nexus-slider></nexus-slider>`);

    const slider = page.root.querySelector(sliderInput);
    expect(slider.id).toContain(nexSliCls);
  });

  it('should set a default id on multiple inputs if none exists', async () => {
    const page = await declrComp(`<nexus-slider></nexus-slider><nexus-slider></nexus-slider>`);

    const slider = page.body.querySelectorAll('input');
    expect(slider[0].id).toContain(nexSliCls);
    expect(slider[1].id).toContain(nexSliCls);
  });

  it('should set the min and max 0 and 100 if not defined', async () => {
    const page = await declrComp(`<nexus-slider></nexus-slider>`);

    const slider = page.root.querySelector(sliderInput);
    expect(slider.max).toEqual('100');
    expect(slider.min).toEqual('0');
  });

  it('should set the max value attribute', async () => {
    const page = await declrComp(`<nexus-slider max="200" min="0"></nexus-slider>`);

    const slider = page.root.querySelector(sliderInput);
    expect(slider.max).toEqual('200');
  });

  it('should set the min   value attribute', async () => {
    const page = await declrComp(`<nexus-slider max="200" min="0"></nexus-slider>`);

    const slider = page.root.querySelector(sliderInput);
    expect(slider.min).toEqual('0');
  });

  it('should set the value half at start', async () => {
    const page = await declrComp(`<nexus-slider max="100" min="10"></nexus-slider>`);

    const slider = page.root.querySelector(sliderInput);
    expect(slider.value).toEqual('55');
  });

  it('should set the initial value to 50 if min and max is not defined', async () => {
    const page = await declrComp(`<nexus-slider></nexus-slider>`);

    const slider = page.root.querySelector(sliderInput);
    expect(slider.value).toEqual('50');
  });

  it('should set the initial value to half of max if min is not defined', async () => {
    const max = 200;
    const sliderVal = '100';
    const page = await declrComp(`<nexus-slider max=${max}></nexus-slider>`);

    const slider = page.root.querySelector(sliderInput);
    expect(slider.value).toEqual(sliderVal);
  });

  it('should set the required attribute', async () => {
    const page = await declrComp(`<nexus-slider required></nexus-slider>`);

    const slider = page.root.querySelector(sliderInput);
    expect(slider.required).toBeTruthy();
  });

  it('should set the disabled attribute', async () => {
    const page = await declrComp(`<nexus-slider disabled></nexus-slider>`);

    const slider = page.root.querySelector(sliderInput);
    expect(slider.disabled).toBeTruthy();
  });

  it('should emit the change event on input', async () => {
    const page = await declrComp(`<nexus-slider></nexus-slider>`);

    const slider = page.root.querySelector(sliderInput);
    const changeEvent = new Event('input');
    slider.value = '75';
    slider.dispatchEvent(changeEvent);

    await page.waitForChanges();

    expect(slider.value).toEqual('75');
  });
});
