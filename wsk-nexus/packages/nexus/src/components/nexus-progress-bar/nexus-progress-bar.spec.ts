import { NexusProgressBar } from './nexus-progress-bar';
import { NexusProgressBarLabel } from './nexus-progress-bar-label/nexus-progress-bar-label';
import { newSpecPage } from '@stencil/core/testing';

const nexpbCls = 'nexus-progress-bar';
const nexpbmtrCls = '.nexus-progress-bar-meter';

describe('check nexus-progress-bar', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusProgressBar],
      html: '<nexus-progress-bar></nexus-progress-bar>'
    });

    expect(new NexusProgressBar()).toBeTruthy();
    expect(page.root).toHaveClass(nexpbCls);
  });

  it('should set the name', async () => {
    const value = 50;

    const page = await newSpecPage({
      components: [NexusProgressBar],
      html: `<nexus-progress-bar value="${value}"></nexus-progress-bar>`
    });

    const progress = page.body.querySelector(nexpbCls);
    const meter = progress.querySelector(nexpbmtrCls);
    const style = meter.getAttribute('style');

    expect(progress.value).toEqual(value);
    expect(style.includes('50%')).toEqual(true);
  });

  it('should set the error state', async () => {
    const error = true;

    const page = await newSpecPage({
      components: [NexusProgressBar],
      html: `<nexus-progress-bar error="${error}"></nexus-progress-bar>`
    });
    const progress = page.body.querySelector(nexpbCls);
    const meter = progress.querySelector(nexpbmtrCls);

    expect(progress.error).toEqual(error);
    expect(meter).toHaveClass('nexus-progress-bar-meter-error');
  });

  it('should set the indeterminate state', async () => {
    const indeterminate = true;

    const page = await newSpecPage({
      components: [NexusProgressBar],
      html: `<nexus-progress-bar indeterminate="${indeterminate}"></nexus-progress-bar>`
    });
    const progress = page.body.querySelector(nexpbCls);
    const meter = progress.querySelector(nexpbmtrCls);

    expect(progress.indeterminate).toEqual(indeterminate);
    expect(meter).toHaveClass('nexus-progress-bar-meter-indeterminate');
  });

  it('should render with value', async () => {
    const value = 50;
    const page = await newSpecPage({
      components: [NexusProgressBar],
      html: `<nexus-progress-bar></nexus-progress-bar>`
    });

    page.rootInstance.value = value;
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should render with error', async () => {
    const page = await newSpecPage({
      components: [NexusProgressBar],
      html: `<nexus-progress-bar></nexus-progress-bar>`
    });

    page.rootInstance.error = true;
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should render with indeterminate', async () => {
    const page = await newSpecPage({
      components: [NexusProgressBar],
      html: `<nexus-progress-bar></nexus-progress-bar>`
    });

    page.rootInstance.indeterminate = true;
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should have a label', async () => {
    const page = await newSpecPage({
      components: [NexusProgressBar, NexusProgressBarLabel],
      html: `<nexus-progress-bar value="50"><nexus-progress-bar-label>Label</nexus-progress-bar-label></nexus-progress-bar>`
    });
    const label = page.body.querySelector('nexus-progress-bar-label');
    expect(label).not.toBeNull();
  });

  it('should render with circle', async () => {
    const page = await newSpecPage({
      components: [NexusProgressBar],
      html: `<nexus-progress-bar></nexus-progress-bar>`
    });

    page.rootInstance.circle = true;
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('should render indeterminate circle', async (done) => {
    const page = await newSpecPage({
      components: [NexusProgressBar],
      html: `<nexus-progress-bar circle="true" indeterminate="true"></nexus-progress-bar>`
    });

    setTimeout(() => {
      // force clearing of value interval based on codepath
      page.rootInstance.indeterminate = false;
      // eslint-disable-next-line no-magic-numbers
    }, 1000);

    setTimeout(() => {
      page.waitForChanges();
      expect(page.root).toMatchSnapshot();
      done();
      // eslint-disable-next-line no-magic-numbers
    }, 1000);
  });
});
