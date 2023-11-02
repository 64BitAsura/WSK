import { newSpecPage } from '@stencil/core/testing';
import { NexusInput } from './nexus-input';

const nexInputCls = 'nexus-input-';
describe('NexusInput', () => {
  it('should contain class', async () => {
    const page = await newSpecPage({
      components: [NexusInput],
      html: `<nexus-input></nexus-input>`
    });

    const input = page.root.querySelector('input');

    expect(input).toHaveClass('nexus-input');
  });

  it('should emit the change event on input', async () => {
    const page = await newSpecPage({
      components: [NexusInput],
      html: `<nexus-input></nexus-input>`
    });

    const input = page.root.querySelector('input');

    const changeEvent = new Event('input');

    input.value = 'foo';
    input.dispatchEvent(changeEvent);

    await page.waitForChanges();

    expect(input.value).toEqual('foo');
  });

  it('should set a default id if none exists', async () => {
    const page = await newSpecPage({
      components: [NexusInput],
      html: `<nexus-input></nexus-input>`
    });

    const input = page.root.querySelector('input');

    expect(input.id).toContain(nexInputCls);
  });

  it('should set a default id on multiple inputs if none exists', async () => {
    const page = await newSpecPage({
      components: [NexusInput],
      html: `<nexus-input></nexus-input><nexus-input></nexus-input>`
    });

    const inputs = page.body.querySelectorAll('input');

    expect(inputs[0].id).toContain(nexInputCls);
    expect(inputs[1].id).toContain(nexInputCls);
  });

  it('should overwrite default id if one exists', async () => {
    const page = await newSpecPage({
      components: [NexusInput],
      html: `<nexus-input attr-id="custom-id"></nexus-input>`
    });

    const input = page.root.querySelector('input');

    expect(input.id).toEqual('custom-id');
  });

  it('should set the maxlength attribute', async () => {
    const expectedLength = 3;
    const page = await newSpecPage({
      components: [NexusInput],
      html: `<nexus-input max-length="3"></nexus-input>`
    });

    const input = page.root.querySelector('input');

    expect(input.maxLength).toEqual(expectedLength);
  });

  it('should set the minlength ', async () => {
    const expectedLength = 3;
    const page = await newSpecPage({
      components: [NexusInput],
      html: `<nexus-input min-length="3"></nexus-input>`
    });

    const input = page.root.querySelector('input');

    expect(input.minLength).toEqual(expectedLength);
  });

  it('should set the disabled attribute', async () => {
    const page = await newSpecPage({
      components: [NexusInput],
      html: `<nexus-input disabled></nexus-input>`
    });

    const input = page.root.querySelector('input');

    expect(input.disabled).toBeTruthy();
  });

  it('should set the readonly attribute', async () => {
    const page = await newSpecPage({
      components: [NexusInput],
      html: `<nexus-input readonly></nexus-input>`
    });

    const input = page.root.querySelector('input');

    expect(input.readOnly).toBeTruthy();
  });

  it('should set the placeholder attribute', async () => {
    const page = await newSpecPage({
      components: [NexusInput],
      html: `<nexus-input placeholder="Please Enter Text"></nexus-input>`
    });

    const input = page.root.querySelector('input');

    expect(input.placeholder).toEqual('Please Enter Text');
  });

  it('should set the required attribute', async () => {
    const page = await newSpecPage({
      components: [NexusInput],
      html: `<nexus-input required></nexus-input>`
    });

    const input = page.root.querySelector('input');

    expect(input.required).toBeTruthy();
  });
});
