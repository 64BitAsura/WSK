import { NexusPinEntry } from './nexus-pin-entry';
import { newSpecPage } from '@stencil/core/testing';
import { NexusInput } from '../nexus-input/nexus-input';

const pinentTemplate = '<nexus-pin-entry></nexus-pin-entry>';
const nexInpCls = 'nexus-input';
const pinentclsTemplate = '<nexus-pin-entry length="3"></nexus-pin-entry>';

const declrComp = (htmlStr: string, addInput: boolean) => {
  const obj = {
    components: [NexusPinEntry],
    html: htmlStr
  };
  const objwithInput = {
    components: [NexusPinEntry, NexusInput],
    html: htmlStr
  };
  const objToAssign = addInput ? objwithInput : obj;
  const page = newSpecPage(objToAssign);

  return page;
};

describe('to check nexus-pin-entry class', () => {
  it('should have nexus pin entry input class', async () => {
    const page = await declrComp(pinentTemplate, false);
    expect(page.root).toHaveClass('nexus-pin-entry');
  });

  it('should have nexus pin entry class', async () => {
    const page = await declrComp(pinentTemplate, false);
    const pin = page.root;

    expect(new NexusPinEntry()).toBeTruthy();
    expect(pin).toHaveClass('nexus-pin-entry');
  });

  it('should set first input class to 0 by default', async () => {
    const page = await newSpecPage({
      components: [NexusPinEntry, NexusInput],
      html: pinentTemplate,
      supportsShadowDom: true
    });
    const pinEntry = page.root.querySelector(nexInpCls);
    expect(pinEntry).toHaveClass('nexus-pin-entry-input-0');
  });

  it('should set last class to last index', async () => {
    const page = await declrComp('<nexus-pin-entry length="6"></nexus-pin-entry>', false);
    const pinEntry = page.root.getElementsByClassName('nexus-pin-entry-input');

    expect(pinEntry[pinEntry.length - 1]).toHaveClass('nexus-pin-entry-input-5');
  });

  it('length should set number of pin entry inputs', async () => {
    const page = await declrComp('<nexus-pin-entry length="6"></nexus-pin-entry>', false);
    const pinEntry = page.root.getElementsByClassName('nexus-pin-entry-input');
    const expectedLength = 6;

    expect(pinEntry.length).toBe(expectedLength);
  });

  it('should set disabled attribute', async () => {
    const page = await declrComp('<nexus-pin-entry disabled></nexus-pin-entry>', true);
    const pinEntry = page.root.querySelector('input');
    expect(pinEntry.disabled).toBeTruthy();
  });

  it('should set disabled attribute for all inputs', async () => {
    const page = await declrComp('<nexus-pin-entry length="3" disabled></nexus-pin-entry>', false);
    const pinEntry = page.root.querySelectorAll('input');

    pinEntry.forEach((element) => {
      expect(element.disabled).toBeTruthy();
    });
  });

  it('should set maxLength for each input to 1', async () => {
    const page = await declrComp(pinentclsTemplate, false);
    const pinEntry = page.root.querySelectorAll('input');

    pinEntry.forEach((element) => {
      expect(element.maxLength).toBe(1);
    });
  });
});
describe('check nexus-pin-entry class', () => {
  it('default pattern should be null', async () => {
    const page = await declrComp(pinentclsTemplate, false);

    const pinEntry = page.root.querySelectorAll('input');

    pinEntry.forEach((element) => {
      expect(element.pattern).toBeFalsy();
    });
  });

  it('should set pattern for each input to alphanumeric', async () => {
    const page = await declrComp('<nexus-pin-entry length="3" pattern="^[a-zA-Z0-9]*$"></nexus-pin-entry>', false);
    const pinEntry = page.root.querySelectorAll('input');
    const expectedPattern = '^[a-zA-Z0-9]*$';

    pinEntry.forEach((element) => {
      expect(element.pattern).toBe(expectedPattern);
    });
  });
  it('default type should be text', async () => {
    const page = await declrComp(pinentclsTemplate, false);
    const pinEntry = page.root.querySelectorAll('input');
    const expectedType = 'text';

    pinEntry.forEach((element) => {
      expect(element.type).toBe(expectedType);
    });
  });
  it('should set type for each input to password', async () => {
    const page = await declrComp('<nexus-pin-entry length="3" type="password"></nexus-pin-entry>', false);
    const pinEntry = page.root.querySelectorAll('input');
    const expectedType = 'password';

    pinEntry.forEach((element) => {
      expect(element.type).toBe(expectedType);
    });
  });

  it('should have called handleOnInput', async () => {
    const page = await declrComp(pinentclsTemplate, true);
    const pin = page.rootInstance;
    jest.spyOn(pin, 'handleOnInput');
    page.waitForChanges();

    const pinInputs = page.root.querySelectorAll(nexInpCls);
    const pinInputChild = page.root.querySelectorAll('input');
    pinInputChild.forEach((item) => {
      item.focus = jest.fn();
    });

    const changeEvent = new Event('input');

    pinInputs[0].value = '1';
    pinInputs[0].dispatchEvent(changeEvent);
    expect(pin.handleOnInput).toHaveBeenCalled();
  });

  it('should have called handleFocus', async () => {
    const page = await declrComp(pinentclsTemplate, true);
    await page.waitForChanges();
    const pinEntryInputs = page.root.querySelectorAll('input');
    const focus = new Event('focus', {
      bubbles: true
    });
    const pin = page.rootInstance;
    jest.spyOn(pin, 'handleFocus');

    pinEntryInputs[1].dispatchEvent(focus);
    await page.waitForChanges();

    expect(pin.handleFocus).toHaveBeenCalled();
  });

  it('should have called handleKeydown', async () => {
    const page = await declrComp(pinentclsTemplate, true);
    const pin = page.rootInstance;
    jest.spyOn(pin, 'handleOnKeyDown');
    page.waitForChanges();

    const pinInputs = page.root.querySelectorAll(nexInpCls);
    const pinInputsChild = page.root.querySelectorAll('input');
    pinInputsChild.forEach((item) => {
      item.focus = jest.fn();
    });

    const event = new KeyboardEvent('keydown', { keyCode: 8 });

    pinInputs[0].dispatchEvent(event);
    expect(pin.handleOnKeyDown).toHaveBeenCalled();
    pinInputs[0].dispatchEvent(event);
    expect(pin.handleOnKeyDown).toHaveBeenCalledTimes(2);
  });

  it('should have ignored handleKeydown, backwards not called', async () => {
    const page = await declrComp(pinentclsTemplate, true);
    const pin = page.rootInstance;
    jest.spyOn(pin, 'handleOnKeyDown');
    page.waitForChanges();

    const pinInputs = page.root.querySelectorAll(nexInpCls);
    const pinInputsChild = page.root.querySelectorAll('input');
    pinInputsChild.forEach((item) => {
      item.focus = jest.fn();
    });

    const event = new KeyboardEvent('keydown', { key: 'Backspace' });
    const inputEvent = new Event('input');

    pinInputs[0].value = '1';
    pinInputs[0].dispatchEvent(inputEvent);
    pinInputs[1].value = '2';
    pinInputs[1].dispatchEvent(inputEvent);
    pinInputs[2].dispatchEvent(event);
    pinInputs[1].dispatchEvent(event);
    pinInputs[0].dispatchEvent(event);
    expect(pin.handleOnKeyDown).toHaveBeenCalled();
  });

  it('input value should be updated', async () => {
    const page = await declrComp(pinentclsTemplate, true);

    const pinInputs = page.root.querySelectorAll(nexInpCls);
    const pinInputsChild = page.root.querySelectorAll('input');
    pinInputsChild.forEach((item) => {
      item.focus = jest.fn();
    });

    const changeEvent = new Event('input');

    pinInputs[0].value = '1';
    pinInputs[0].dispatchEvent(changeEvent);
    expect(pinInputs[0].value).toBe('1');
  });

  it('should have called keydown multiple times', async () => {
    const page = await declrComp(pinentclsTemplate, true);
    const pin = page.rootInstance;
    jest.spyOn(pin, 'handleOnInput');
    jest.spyOn(pin, 'handleOnKeyDown');
    page.waitForChanges();

    const pinInputs = page.root.querySelectorAll(nexInpCls);
    const pinInputsChild = page.root.querySelectorAll('input');
    pinInputsChild.forEach((item) => {
      item.focus = jest.fn();
    });

    const inputEvent = new Event('input');
    const deleteEvent = new KeyboardEvent('keydown', { keyCode: 8 });
    pinInputs[0].value = '1';
    pinInputs[0].dispatchEvent(inputEvent);
    pinInputs[1].value = '2';
    pinInputs[1].dispatchEvent(inputEvent);
    pinInputs[2].value = '3';
    pinInputs[2].dispatchEvent(inputEvent);
    expect(pin.handleOnInput).toHaveBeenCalled();

    pinInputs[2].dispatchEvent(deleteEvent);
    expect(pin.handleOnKeyDown).toHaveBeenCalledTimes(1);
    pinInputs[2].dispatchEvent(deleteEvent);
    expect(pin.handleOnKeyDown).toHaveBeenCalledTimes(2);
  });

  it('should update pin value when backspace is pressed', async () => {
    const page = await declrComp(pinentclsTemplate, true);
    const { pin } = page.rootInstance;
    expect(pin.join('')).toBe('');

    const pinInputs = page.root.querySelectorAll(nexInpCls);
    const pinInputsChild = page.root.querySelectorAll('input');
    pinInputsChild.forEach((item) => {
      item.focus = jest.fn();
    });

    const event = new Event('input');
    pinInputs[0].value = '1';

    pinInputs[0].dispatchEvent(event);
    await page.waitForChanges();

    expect(pin.join('')).toBe('1');

    const deleteEvent = new KeyboardEvent('keydown', {
      key: 'Backspace',
      bubbles: true
    });
    pinInputs[1].dispatchEvent(deleteEvent);
    expect(pin.join('')).toBe('');
  });

  it('should have called advance multiple times', async () => {
    const page = await declrComp(pinentclsTemplate, true);
    const pin = page.rootInstance;
    jest.spyOn(pin, 'advance');
    page.waitForChanges();

    const pinInputs = page.root.querySelectorAll(nexInpCls);
    const pinInputsChild = page.root.querySelectorAll('input');
    pinInputsChild.forEach((item) => {
      item.focus = jest.fn();
    });

    const inputEvent = new Event('input');

    expect(pin.advance).toHaveBeenCalledTimes(0);
    pinInputs[0].value = '1';
    pinInputs[0].dispatchEvent(inputEvent);
    expect(pin.advance).toHaveBeenCalled();
    pinInputs[1].value = '2';
    pinInputs[1].dispatchEvent(inputEvent);
    expect(pin.advance).toHaveBeenCalledTimes(2);
  });
});
