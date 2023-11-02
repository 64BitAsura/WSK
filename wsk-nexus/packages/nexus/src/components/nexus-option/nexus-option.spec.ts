import { NexusOption } from './nexus-option';
import { newSpecPage } from '@stencil/core/testing';
import { NexusCheckbox } from '../nexus-checkbox/nexus-checkbox';

const templateStr = '<nexus-option></nexus-option>';
const nexOpt = '.nexus-option';

describe('nexus-option', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusOption],
      html: templateStr
    });

    expect(new NexusOption()).toBeTruthy();
    expect(page.root).toEqualHtml('<nexus-option><div class="nexus-option nexus-single-select"></div></nexus-option>');
  });

  it('should contain class', async () => {
    const page = await newSpecPage({
      components: [NexusOption],
      html: templateStr
    });

    expect(page.root.querySelectorAll(nexOpt).length).toEqual(1);
  });

  it('should contain class for disabled', async () => {
    const page = await newSpecPage({
      components: [NexusOption],
      html: `<nexus-option disabled></nexus-option>`
    });
    expect(page.root.querySelectorAll('.nexus-option-disabled').length).toEqual(1);
  });

  it('should contain class for selected', async () => {
    const page = await newSpecPage({
      components: [NexusOption],
      html: '<nexus-option selected></nexus-option>'
    });
    expect(page.root.querySelectorAll('.nexus-option-selected').length).toEqual(1);
  });

  it('should contain class for keyhover', async () => {
    const page = await newSpecPage({
      components: [NexusOption],
      html: '<nexus-option keyhover></nexus-option>'
    });
    expect(page.root.querySelectorAll('.nexus-option-hover').length).toEqual(1);
  });

  it('triggers handleSelectedOption onclick', async () => {
    const page = await newSpecPage({
      components: [NexusOption],
      html: templateStr
    });
    const option = page.rootInstance;
    const optionEl = page.root.querySelector(nexOpt);
    const event = new Event('click', {
      bubbles: true
    });

    jest.spyOn(option, 'handleSelectedOption');
    await page.waitForChanges();
    optionEl.dispatchEvent(event);
    await page.waitForChanges();
    expect(option.handleSelectedOption).toHaveBeenCalled();
  });

  it('triggers handleSelectedOption onclick for option with checkbox', async () => {
    const page = await newSpecPage({
      components: [NexusOption],
      html: '<nexus-option><nexus-checkbox></nexus-checkbox></nexus-option>'
    });
    const option = page.rootInstance;
    const event = new Event('click', {
      bubbles: true
    });
    const checkboxEl = page.root.querySelector('nexus-checkbox');

    jest.spyOn(option, 'handleSelectedOption');
    await page.waitForChanges();
    checkboxEl.dispatchEvent(event);
    await page.waitForChanges();
    expect(option.handleSelectedOption).toHaveBeenCalled();
  });

  it('emit event onclick', async () => {
    const page = await newSpecPage({
      components: [NexusOption],
      html: templateStr
    });
    const option = page.rootInstance;
    const optionEl = page.root.querySelector(nexOpt);
    const event = new Event('click', {
      bubbles: true
    });
    jest.spyOn(option.triggerOptionSelected, 'emit');
    await page.waitForChanges();
    optionEl.dispatchEvent(event);
    await page.waitForChanges();
    expect(option.triggerOptionSelected.emit).toHaveBeenCalled();
  });

  it('emit event onclick when multiple is true', async () => {
    const page = await newSpecPage({
      components: [NexusOption, NexusCheckbox],
      html: '<nexus-option value="Option 1" multiple><nexus-checkbox>Option 1</nexus-checkbox></nexus-option>'
    });
    const option = page.rootInstance;
    const checkboxEl = page.root.querySelector('input') as HTMLElement;
    const event = new Event('change', {
      bubbles: true
    });
    jest.spyOn(option.triggerOptionSelected, 'emit');
    await page.waitForChanges();
    checkboxEl.dispatchEvent(event);
    checkboxEl.click();
    await page.waitForChanges();
    expect(option.triggerOptionSelected.emit).toHaveBeenCalled();
  });
});
