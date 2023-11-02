import { NexusSelect } from './nexus-select';
import { newSpecPage } from '@stencil/core/testing';
import { NexusLabel } from '../nexus-label/nexus-label';
import { NexusDropdown } from '../nexus-dropdown/nexus-dropdown';
import { NexusOption } from '../nexus-option/nexus-option';
import { NexusCheckbox } from '../nexus-checkbox/nexus-checkbox';
import { NexusInput } from '../nexus-input/nexus-input';

const nexSelCls = 'nexus-select';
const clsNexSel = 'nexus-select-';
const nexusOption = 'nexus-option';

describe('check nexus-select', () => {
  it('should contain class', async () => {
    const page = await newSpecPage({
      components: [NexusSelect],
      html: `<nexus-select></nexus-select>`
    });

    const select = page.body.querySelector('select');

    expect(select).toHaveClass(nexSelCls);
  });

  it('should set a custom id if one is provided', async () => {
    const page = await newSpecPage({
      components: [NexusSelect],
      html: `<nexus-select attr-id="custom-id"></nexus-select>`
    });

    const select = page.body.querySelector('select');

    expect(select.id).toContain('custom-id');
  });

  it('should set a default id if none exists', async () => {
    const page = await newSpecPage({
      components: [NexusSelect],
      html: `<nexus-select></nexus-select>`
    });

    const select = page.body.querySelector('select');

    expect(select.id).toContain(clsNexSel);
  });

  it('should set a default id on multiple inputs if none exists', async () => {
    const page = await newSpecPage({
      components: [NexusSelect],
      html: `<nexus-select></nexus-select><nexus-select></nexus-select>`
    });

    const select = page.body.querySelectorAll('select');

    expect(select[0].id).toContain(clsNexSel);
    expect(select[1].id).toContain(clsNexSel);
  });

  it('updateValue called when value changes for custom select', async () => {
    const page = await newSpecPage({
      components: [NexusSelect, NexusLabel, NexusDropdown, NexusOption],
      html: `<nexus-select type="custom"><nexus-option value="option1">Option 1</nexus-option></nexus-select>`
    });

    const select = page.rootInstance;
    const selectEl = page.doc.querySelector(nexSelCls);
    jest.spyOn(select, 'updateValue');
    await page.waitForChanges();
    selectEl.setAttribute('value', 'Optin 1');
    await page.waitForChanges();
    expect(select.updateValue).toHaveBeenCalled();
  });

  it('updateValue called when value changes for custom select with delimiter passed', async () => {
    const page = await newSpecPage({
      components: [NexusSelect, NexusLabel, NexusDropdown, NexusOption],
      html: `<nexus-select type="custom" delimiter=" ">
              <nexus-option value="option1">Option 1</nexus-option>
              <nexus-option value="option2">Option 2</nexus-option>
            </nexus-select>`
    });

    const select = page.rootInstance;
    const selectEl = page.doc.querySelector(nexSelCls);
    jest.spyOn(select, 'updateValue');
    await page.waitForChanges();
    selectEl.setAttribute('value', 'Optin 1');
    await page.waitForChanges();
    selectEl.setAttribute('value', 'Optin 2');
    await page.waitForChanges();
    expect(select.updateValue).toHaveBeenCalled();
  });

  it('updateValue called when value changes for native select', async () => {
    const page = await newSpecPage({
      components: [NexusSelect],
      html: `<nexus-select><option value="option1">Option 1</option></nexus-select>`
    });

    const select = page.rootInstance;
    const selectEl = page.doc.querySelector(nexSelCls);
    jest.spyOn(select, 'updateValue');
    await page.waitForChanges();
    selectEl.setAttribute('value', 'Optin 1');
    await page.waitForChanges();
    expect(select.updateValue).toHaveBeenCalled();
  });

  it('trigger _disabledChange disable events', async () => {
    const page = await newSpecPage({
      components: [NexusSelect, NexusLabel, NexusDropdown, NexusOption],
      html: `<nexus-select type="custom"><nexus-option value="option1">Option 1</nexus-option></nexus-select>`
    });

    const select = page.rootInstance;
    const selectEl = page.doc.querySelector(nexSelCls);
    jest.spyOn(select._disabledChange, 'emit');
    await page.waitForChanges();
    selectEl.setAttribute('disabled', 'true');
    await page.waitForChanges();
    expect(select._disabledChange.emit).toHaveBeenCalled();
  });

  it('does not trigger _disabledChange disable events when disabled value is changed to same', async () => {
    const page = await newSpecPage({
      components: [NexusSelect, NexusLabel, NexusDropdown, NexusOption],
      html: `<nexus-select type="custom" disabled="true"><nexus-option value="option1">Option 1</nexus-option></nexus-select>`
    });

    const select = page.rootInstance;
    const selectEl = page.body.querySelector(nexSelCls);
    jest.spyOn(select._disabledChange, 'emit');
    await page.waitForChanges();
    selectEl.setAttribute('disabled', 'true');
    await page.waitForChanges();
    expect(select._disabledChange.emit).not.toHaveBeenCalled();
  });

  it('should set the placeholder attribute', async () => {
    const page = await newSpecPage({
      components: [NexusSelect, NexusLabel, NexusDropdown, NexusOption, NexusInput],
      html: `<nexus-select type="custom" disabled="true" placeholder="Please Select"><nexus-option value="option1">Option 1</nexus-option></nexus-select>`
    });

    const select = page.root;
    const input = select.querySelector('nexus-input');
    expect(input.placeholder).toEqual('Please Select');
  });
});

describe('nexus-select trigger', () => {
  it('call toggleDropDown onClick custom select', async () => {
    const page = await newSpecPage({
      components: [NexusSelect, NexusLabel, NexusDropdown, NexusOption],
      html: `<nexus-select type="custom"><nexus-dropdown><nexus-option value="option1">Option 1</nexus-option></nexus-dropdown></nexus-select>`
    });
    const select = page.rootInstance;
    const selectEl = page.root.querySelector('.nexus-select-custom');
    const event = new Event('click', {
      bubbles: true
    });
    jest.spyOn(select, 'toggleDropDown');
    await page.waitForChanges();
    selectEl.dispatchEvent(event);
    await page.waitForChanges();
    expect(select.toggleDropDown).toHaveBeenCalled();
  });

  it('updateShowDropDown called when dropdown is open for custom select', async () => {
    const page = await newSpecPage({
      components: [NexusSelect, NexusLabel, NexusDropdown, NexusOption],
      html: `<nexus-select type="custom">
              <nexus-dropdown>
                <nexus-option value="option1">Option 1</nexus-option>
                <nexus-option value="option2">Option 2</nexus-option>
              </nexus-dropdown>
            </nexus-select>`
    });

    const select = page.rootInstance;
    const selectEl = page.root.querySelector('.nexus-select-custom');
    const event = new Event('click', {
      bubbles: true
    });
    jest.spyOn(select, 'updateShowDropDown');
    await page.waitForChanges();
    selectEl.dispatchEvent(event);
    await page.waitForChanges();
    expect(select.updateShowDropDown).toHaveBeenCalled();
  });

  it('does not call updateShowDropDown when dropdown is closed for custom select', async () => {
    const page = await newSpecPage({
      components: [NexusSelect, NexusLabel, NexusDropdown, NexusOption],
      html: `<nexus-select type="custom">
              <nexus-dropdown show="true">
                <nexus-option value="option1">Option 1</nexus-option>
                <nexus-option value="option2">Option 2</nexus-option>
              </nexus-dropdown>
            </nexus-select>`
    });

    const select = page.rootInstance;
    const selectEl = page.root.querySelector('.nexus-select-custom');
    jest.spyOn(select, 'updateShowDropDown');
    await page.waitForChanges();
    selectEl.setAttribute('showDropDown', 'false');
    await page.waitForChanges();
    expect(select.updateShowDropDown).not.toHaveBeenCalled();
  });

  it('closed dropdown when click outside the select', async () => {
    const page = await newSpecPage({
      components: [NexusSelect, NexusLabel, NexusDropdown, NexusOption],
      html: `<nexus-select type="custom"><nexus-dropdown><nexus-option value="option1">Option 1</nexus-option></nexus-dropdown></nexus-select>`
    });
    const select = page.rootInstance;
    jest.spyOn(select.closeEvent, 'emit');
    const clickEvent = new Event('click');
    page.doc.dispatchEvent(clickEvent);
    await page.waitForChanges();
    expect(select.closeEvent.emit).toHaveBeenCalled();
    expect(page.rootInstance.showDropDown).toBeFalsy();
  });

  it('close dropdown when click option for single-select', async () => {
    const page = await newSpecPage({
      components: [NexusSelect, NexusLabel, NexusDropdown, NexusOption],
      html: `<nexus-select type="custom"><nexus-dropdown><nexus-option value="option1">Option 1</nexus-option></nexus-dropdown></nexus-select>`
    });
    const select = page.rootInstance;
    jest.spyOn(select, 'toggleDropDown');
    const clickEvent = new Event('triggerOptionSelected', {
      bubbles: true
    });
    const optionEl = page.body.querySelector(nexusOption);
    optionEl.dispatchEvent(clickEvent);
    await page.waitForChanges();
    expect(select.toggleDropDown).toHaveBeenCalled();
  });

  it('does not close dropdown when click option for multi-select', async () => {
    const page = await newSpecPage({
      components: [NexusSelect, NexusLabel, NexusDropdown, NexusOption],
      html: `<nexus-select type="custom" multiple><nexus-dropdown><nexus-option value="option1">Option 1</nexus-option></nexus-dropdown></nexus-select>`
    });
    const select = page.rootInstance;
    jest.spyOn(select, 'toggleDropDown');
    const clickEvent = new Event('triggerOptionSelected', {
      bubbles: true
    });
    const optionEl = page.body.querySelectorAll(nexusOption);
    optionEl[0].dispatchEvent(clickEvent);
    await page.waitForChanges();
    expect(select.toggleDropDown).not.toHaveBeenCalled();
  });

  it('emits triggerSelection when option is clicked', async () => {
    const page = await newSpecPage({
      components: [NexusSelect, NexusLabel, NexusDropdown, NexusOption],
      html: `<nexus-select type="custom"><nexus-option value="option1">Option 1</nexus-option></nexus-select>`
    });
    const select = page.rootInstance;
    jest.spyOn(select.triggerSelection, 'emit');
    jest.spyOn(select, 'handleOptionSelection');
    const clickEvent = new Event('triggerOptionSelected', {
      bubbles: true
    });
    const optionEl = page.body.querySelector(nexusOption);
    optionEl.dispatchEvent(clickEvent);
    await page.waitForChanges();
    expect(select.handleOptionSelection).toHaveBeenCalled();
    expect(select.triggerSelection.emit).toHaveBeenCalled();
  });
});

describe('nexus-select keyboard events for single select', () => {
  const htmlTag = `<nexus-select type="custom">
                    <nexus-dropdown>
                      <nexus-option value="option1">Option 1</nexus-option>
                    </nexus-dropdown>
                  </nexus-select>`;
  const componentList = [NexusSelect, NexusOption, NexusDropdown];

  it('should call toggleDropDown on enter', async () => {
    const page = await newSpecPage({
      components: componentList,
      html: htmlTag
    });
    const select = page.rootInstance;
    const tabEvent = new KeyboardEvent('keydown', { code: 'Tab' });
    const enterEvent = new KeyboardEvent('keydown', {
      code: 'Enter'
    });
    jest.spyOn(select, 'toggleDropDown');
    await page.waitForChanges();
    page.root.dispatchEvent(tabEvent);
    await page.waitForChanges();
    page.root.dispatchEvent(enterEvent);
    await page.waitForChanges();
    expect(select.toggleDropDown).toHaveBeenCalled();
  });

  it('should open dropdown on space', async () => {
    const page = await newSpecPage({
      components: componentList,
      html: htmlTag
    });
    const tabEvent = new KeyboardEvent('keydown', { code: 'Tab' });
    const spaceEvent = new KeyboardEvent('keydown', {
      code: 'Space'
    });
    await page.waitForChanges();
    page.root.dispatchEvent(tabEvent);
    await page.waitForChanges();
    page.root.dispatchEvent(spaceEvent);
    await page.waitForChanges();
    expect(page.rootInstance.showDropDown).toBeTruthy();
  });

  it('should close dropdown on escape', async () => {
    const page = await newSpecPage({
      components: componentList,
      html: htmlTag
    });
    const tabEvent = new KeyboardEvent('keydown', { code: 'Tab' });
    const spaceEvent = new KeyboardEvent('keydown', { code: 'Space' });
    const escapeEvent = new KeyboardEvent('keydown', { code: 'Escape' });
    await page.waitForChanges();
    page.root.dispatchEvent(tabEvent);
    await page.waitForChanges();
    page.root.dispatchEvent(spaceEvent);
    await page.waitForChanges();
    expect(page.rootInstance.showDropDown).toBeTruthy();
    page.root.dispatchEvent(escapeEvent);
    await page.waitForChanges();
    expect(page.rootInstance.showDropDown).toBeFalsy();
  });

  it('should close dropdown on tab', async () => {
    const page = await newSpecPage({
      components: componentList,
      html: htmlTag
    });
    const tabEvent = new KeyboardEvent('keydown', { code: 'Tab' });
    const spaceEvent = new KeyboardEvent('keydown', { code: 'Space' });
    await page.waitForChanges();
    page.root.dispatchEvent(tabEvent);
    await page.waitForChanges();
    page.root.dispatchEvent(spaceEvent);
    await page.waitForChanges();
    expect(page.rootInstance.showDropDown).toBeTruthy();
    await page.waitForChanges();
    page.root.dispatchEvent(tabEvent);
    await page.waitForChanges();
    expect(page.rootInstance.showDropDown).toBeFalsy();
  });

  it('should do nothing if other buttons are pressed', async () => {
    const page = await newSpecPage({
      components: componentList,
      html: htmlTag
    });
    const select = page.rootInstance;
    const altEvent = new KeyboardEvent('keydown', { code: 'Alt' });
    jest.spyOn(select, 'toggleDropDown');
    await page.waitForChanges();
    expect(select.toggleDropDown).not.toHaveBeenCalled();
    expect(page.rootInstance.showDropDown).toBeFalsy();
    await page.waitForChanges();
    page.root.dispatchEvent(altEvent);
    await page.waitForChanges();
    expect(select.toggleDropDown).not.toHaveBeenCalled();
    expect(page.rootInstance.showDropDown).toBeFalsy();
  });

  it('should call changeSelectedValue on all Arrow keys', async () => {
    const thirdTIme = 3;
    const fourthTime = 4;
    const page = await newSpecPage({
      components: componentList,
      html: htmlTag
    });
    const select = page.rootInstance;
    const tabEvent = new KeyboardEvent('keydown', { code: 'Tab' });
    const arrowUpEvent = new KeyboardEvent('keydown', {
      code: 'ArrowUp'
    });
    const arrowDownEvent = new KeyboardEvent('keydown', {
      code: 'ArrowDown'
    });
    const arrowLeftEvent = new KeyboardEvent('keydown', {
      code: 'ArrowLeft'
    });
    const arrowRightEvent = new KeyboardEvent('keydown', {
      code: 'ArrowRight'
    });
    jest.spyOn(select, 'changeSelectedValue');
    await page.waitForChanges();
    page.root.dispatchEvent(tabEvent);
    await page.waitForChanges();
    page.root.dispatchEvent(arrowUpEvent);
    await page.waitForChanges();
    expect(select.changeSelectedValue).toHaveBeenCalledTimes(1);
    await page.waitForChanges();
    page.root.dispatchEvent(arrowDownEvent);
    await page.waitForChanges();
    expect(select.changeSelectedValue).toHaveBeenCalledTimes(2);
    await page.waitForChanges();
    page.root.dispatchEvent(arrowLeftEvent);
    await page.waitForChanges();
    expect(select.changeSelectedValue).toHaveBeenCalledTimes(thirdTIme);
    await page.waitForChanges();
    page.root.dispatchEvent(arrowRightEvent);
    await page.waitForChanges();
    expect(select.changeSelectedValue).toHaveBeenCalledTimes(fourthTime);
  });
});

describe('nexus-select keyboard events for multi select', () => {
  const htmlTag = `<nexus-select type="custom" multiple>
                    <nexus-dropdown>
                      <nexus-option value="Option 1"><nexus-checkbox>Option 1</nexus-checkbox></nexus-option>
                      <nexus-option value="Option 2"><nexus-checkbox>Option 2</nexus-checkbox></nexus-option>
                    </nexus-dropdown>
                  </nexus-select>`;
  const htmlTagDiabled = `<nexus-select type="custom" multiple>
                            <nexus-dropdown>
                              <nexus-option value="Option 1"><nexus-checkbox>Option 1</nexus-checkbox></nexus-option>
                              <nexus-option value="Option 2" disabled><nexus-checkbox>Option 2</nexus-checkbox></nexus-option>
                              <nexus-option value="Option 3"><nexus-checkbox>Option 3</nexus-checkbox></nexus-option>
                            </nexus-dropdown>
                          </nexus-select>`;
  const componentList = [NexusSelect, NexusOption, NexusDropdown, NexusCheckbox];

  it('should open dropdown on arrow ', async () => {
    const page = await newSpecPage({
      components: componentList,
      html: htmlTag
    });
    const tabEvent = new KeyboardEvent('keydown', { code: 'Tab' });
    const arrowUpEvent = new KeyboardEvent('keydown', {
      code: 'ArrowUp'
    });
    await page.waitForChanges();
    page.root.dispatchEvent(tabEvent);
    await page.waitForChanges();
    page.root.dispatchEvent(arrowUpEvent);
    await page.waitForChanges();
    expect(page.rootInstance.showDropDown).toBeTruthy();
  });

  it('should open dropdown on space ', async () => {
    const page = await newSpecPage({
      components: componentList,
      html: htmlTag
    });
    const tabEvent = new KeyboardEvent('keydown', { code: 'Tab' });
    const spaceEvent = new KeyboardEvent('keydown', {
      code: 'Space'
    });
    await page.waitForChanges();
    page.root.dispatchEvent(tabEvent);
    await page.waitForChanges();
    page.root.dispatchEvent(spaceEvent);
    await page.waitForChanges();
    expect(page.rootInstance.showDropDown).toBeTruthy();
  });

  it('Skips disabled option on arrow ', async () => {
    const page = await newSpecPage({
      components: componentList,
      html: htmlTagDiabled
    });
    const tabEvent = new KeyboardEvent('keydown', { code: 'Tab' });
    const arrowDownEvent = new KeyboardEvent('keydown', {
      code: 'ArrowDown'
    });
    const spaceEvent = new KeyboardEvent('keydown', {
      code: 'Space'
    });
    await page.waitForChanges();
    page.root.dispatchEvent(tabEvent);
    await page.waitForChanges();
    page.root.dispatchEvent(spaceEvent);
    await page.waitForChanges();
    page.root.dispatchEvent(arrowDownEvent);
    await page.waitForChanges();
    expect(page.rootInstance.showDropDown).toBeTruthy();
    await page.waitForChanges();
    page.root.dispatchEvent(arrowDownEvent);
    await page.waitForChanges();
    const optionEl = page.body.querySelectorAll(nexusOption);
    expect(optionEl[0].getAttribute('keyhover')).toBeTruthy();
    await page.waitForChanges();
    page.root.dispatchEvent(arrowDownEvent);
    await page.waitForChanges();
    expect(optionEl[2].getAttribute('keyhover')).toBeTruthy();
  });

  it('Does not got up on arrow if first option is disabled', async () => {
    const page = await newSpecPage({
      components: componentList,
      html: `<nexus-select type="custom" multiple>
              <nexus-dropdown>
                <nexus-option value="Option 1" disabled><nexus-checkbox>Option 1</nexus-checkbox></nexus-option>
                <nexus-option value="Option 2"><nexus-checkbox>Option 2</nexus-checkbox></nexus-option>
              </nexus-dropdown>
            </nexus-select>`
    });
    const tabEvent = new KeyboardEvent('keydown', { code: 'Tab' });
    const arrowDownEvent = new KeyboardEvent('keydown', {
      code: 'ArrowDown'
    });
    const arrowUpEvent = new KeyboardEvent('keydown', {
      code: 'ArrowUp'
    });
    const spaceEvent = new KeyboardEvent('keydown', {
      code: 'Space'
    });
    await page.waitForChanges();
    page.root.dispatchEvent(tabEvent);
    await page.waitForChanges();
    page.root.dispatchEvent(spaceEvent);
    await page.waitForChanges();
    page.root.dispatchEvent(arrowDownEvent);
    await page.waitForChanges();
    page.root.dispatchEvent(arrowUpEvent);
    await page.waitForChanges();
    page.root.dispatchEvent(arrowUpEvent);
    await page.waitForChanges();
    const optionEl = page.body.querySelectorAll(nexusOption);
    expect(optionEl[1].getAttribute('keyhover')).toBeTruthy();
    await page.waitForChanges();
    page.root.dispatchEvent(arrowUpEvent);
    await page.waitForChanges();
    expect(optionEl[1].getAttribute('keyhover')).toBeTruthy();
  });

  it('restrict arrow movement to first and last option ', async () => {
    const page = await newSpecPage({
      components: componentList,
      html: `<nexus-select type="custom" multiple>
              <nexus-dropdown>
                <nexus-option value="Option 1"><nexus-checkbox>Option 1</nexus-checkbox></nexus-option>
                <nexus-option value="Option 2"><nexus-checkbox>Option 2</nexus-checkbox></nexus-option>
              </nexus-dropdown>
            </nexus-select>`
    });
    const tabEvent = new KeyboardEvent('keydown', { code: 'Tab' });
    const arrowDownEvent = new KeyboardEvent('keydown', {
      code: 'ArrowDown'
    });
    const arrowUpEvent = new KeyboardEvent('keydown', {
      code: 'ArrowUp'
    });
    const spaceEvent = new KeyboardEvent('keydown', {
      code: 'Space'
    });
    await page.waitForChanges();
    page.root.dispatchEvent(tabEvent);
    await page.waitForChanges();
    page.root.dispatchEvent(spaceEvent);
    await page.waitForChanges();
    page.root.dispatchEvent(arrowDownEvent);
    await page.waitForChanges();
    page.root.dispatchEvent(arrowUpEvent);
    await page.waitForChanges();
    const optionEl = page.body.querySelectorAll(nexusOption);
    await page.waitForChanges();
    expect(optionEl[0].getAttribute('keyhover')).toBeTruthy();
    await page.waitForChanges();
    page.root.dispatchEvent(arrowUpEvent);
    await page.waitForChanges();
    expect(optionEl[0].getAttribute('keyhover')).toBeTruthy();
  });
});
