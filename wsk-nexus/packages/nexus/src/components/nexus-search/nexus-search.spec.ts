import { NexusSearch } from './nexus-search';
import { newSpecPage } from '@stencil/core/testing';
import { NexusSearchList } from './nexus-search-list/nexus-search-list';
import { NexusInput } from '../nexus-input/nexus-input';
import { NexusSearchListItem } from './nexus-search-list-item/nexus-search-list-item';

const nexSerlsCls = '.nexus-search-list-li';
const htmlStr = `
  <nexus-search>
    <nexus-input autocomplete="off">
    </nexus-input>
    <nexus-search-list>
      <nexus-search-list-item>
        <a href="javascript:void(0)">Item 1</a>
      </nexus-search-list-item>
      <nexus-search-list-item>
        <a href="javascript:void(0)">Item 2</a>
      </nexus-search-list-item>
      <nexus-search-list-item>
        <a href="javascript:void(0)">Item 3</a>
      </nexus-search-list-item>
    </nexus-search-list>
  </nexus-search>
`;
const componentList = [NexusSearch, NexusInput, NexusSearchList, NexusSearchListItem];

const declrComp = () =>
  newSpecPage({
    components: componentList,
    html: htmlStr
  });
describe('nexus-search', () => {
  let page;
  beforeEach(async () => {
    page = await declrComp();
  });

  it('builds', async () => {
    page = await newSpecPage({
      components: [NexusSearch],
      html: '<nexus-search></nexus-search>'
    });

    expect(new NexusSearch()).toBeTruthy();
    expect(page.root).toHaveClass('nexus-search');
  });

  it('should navigate through options via arrow keys', async () => {
    await page.waitForChanges();

    const optionListItems = page.root.querySelectorAll(nexSerlsCls);

    const arrowDownEvent = new KeyboardEvent('keydown', {
      key: 'ArrowDown'
    });
    const arrowUpEvent = new KeyboardEvent('keydown', {
      key: 'ArrowUp'
    });

    const randomKeyEvent = new KeyboardEvent('keydown', {
      key: 'space'
    });

    page.root.dispatchEvent(arrowDownEvent);
    await page.waitForChanges();

    expect(optionListItems[0]).toHaveClass(`nexus-selected`);

    page.root.dispatchEvent(arrowDownEvent);
    await page.waitForChanges();
    expect(optionListItems[1]).toHaveClass(`nexus-selected`);

    page.root.dispatchEvent(arrowDownEvent);
    await page.waitForChanges();
    expect(optionListItems[2]).toHaveClass(`nexus-selected`);

    page.root.dispatchEvent(arrowDownEvent);
    await page.waitForChanges();
    expect(optionListItems[2]).toHaveClass(`nexus-selected`);

    page.root.dispatchEvent(arrowUpEvent);
    await page.waitForChanges();
    expect(optionListItems[1]).toHaveClass(`nexus-selected`);

    page.root.dispatchEvent(arrowUpEvent);
    await page.waitForChanges();
    expect(optionListItems[0]).toHaveClass(`nexus-selected`);

    page.root.dispatchEvent(arrowUpEvent);
    await page.waitForChanges();
    expect(optionListItems[0]).toHaveClass(`nexus-selected`);

    // Do nothing
    page.root.dispatchEvent(randomKeyEvent);
    await page.waitForChanges();
    expect(optionListItems[0]).toHaveClass(`nexus-selected`);
  });

  it('should set the value of the input on enter', async () => {
    await page.waitForChanges();

    const input = page.root.querySelector('input');

    const optionListItems = page.root.querySelectorAll(nexSerlsCls);

    const arrowDownEvent = new KeyboardEvent('keydown', {
      key: 'ArrowDown'
    });
    const enterEvent = new KeyboardEvent('keydown', {
      key: 'enter',
      bubbles: true
    });

    page.root.dispatchEvent(arrowDownEvent);
    optionListItems[0].dispatchEvent(enterEvent);
    await page.waitForChanges();
    expect(input.value).toBe(`Item 1`);
  });

  it('should open the menu if in focus', async () => {
    await page.waitForChanges();

    const input = page.root.querySelector('input');

    expect(page.root).not.toHaveClass(`nexus-open`);

    const focus = new Event('focus', {
      bubbles: true
    });

    input.dispatchEvent(focus);
    await page.waitForChanges();

    expect(page.root).toHaveClass(`nexus-open`);
  });

  it('should close the menu on tab', async () => {
    const input = page.root.querySelector('input');
    const focus = new Event('focus', {
      bubbles: true
    });
    const tabEvent = new KeyboardEvent('keydown', {
      key: 'Tab'
    });

    input.dispatchEvent(focus);
    await page.waitForChanges();

    expect(page.root).toHaveClass(`nexus-open`);
    await page.waitForChanges();

    page.root.dispatchEvent(tabEvent);
    await page.waitForChanges();
    expect(page.rootInstance.open).toBeFalsy();
  });
});

describe('nexus-search onclick', () => {
  let page;
  beforeEach(async () => {
    page = await declrComp();
  });

  it('should set the value of the input ', async () => {
    await page.waitForChanges();

    const input = page.root.querySelector('input');

    const optionListItems = page.root.querySelectorAll(nexSerlsCls);

    const clickEvent = new MouseEvent('click', {
      bubbles: true
    });

    optionListItems[0].dispatchEvent(clickEvent);
    await page.waitForChanges();
    expect(input.value).toBe(`Item 1`);
  });

  it('should open the menu', async () => {
    await page.waitForChanges();

    const input = page.root.querySelector('input');
    expect(page.root).not.toHaveClass(`nexus-open`);

    const focus = new Event('focus', {
      bubbles: true
    });
    const clickEvent = new Event('click');

    input.dispatchEvent(clickEvent);
    input.dispatchEvent(focus);
    input.dispatchEvent(clickEvent);
    input.dispatchEvent(focus);
    await page.waitForChanges();

    expect(page.root).toHaveClass(`nexus-open`);
  });

  it('outside should close the menu', async () => {
    const input = page.root.querySelector('input');
    const clickEvent = new Event('click');
    const focus = new Event('focus', {
      bubbles: true
    });
    input.dispatchEvent(focus);
    input.dispatchEvent(focus);
    await page.waitForChanges();
    expect(page.root).toHaveClass(`nexus-open`);

    page.doc.dispatchEvent(clickEvent);
    await page.waitForChanges();
    expect(page.rootInstance.open).toBeFalsy();
  });
});
