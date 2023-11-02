import { NexusDropdown } from './nexus-dropdown';
import { newSpecPage } from '@stencil/core/testing';

const nexDrpDwn = '<nexus-dropdown></nexus-dropdown>';
describe('nexus-dropdown', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusDropdown],
      html: nexDrpDwn
    });

    expect(new NexusDropdown()).toBeTruthy();
    expect(page.root).toEqualHtml(
      '<nexus-dropdown class="nexus-dropdown-basic-wraper"><div class="nexus-dropdown nexus-dropdown-basic nexus-dropdown-basic-left"><div></div><div class="nexus-dropdown-container"  style="max-height: undefinedpx; width: undefinedpx;"></div></nexus-dropdown>'
    );
  });

  it('should have the global class nexus-dropdown', async () => {
    const page = await newSpecPage({
      components: [NexusDropdown],
      html: nexDrpDwn
    });
    expect(page.root.querySelectorAll('.nexus-dropdown').length).toEqual(1);
  });

  it('should have the global class nexus-dropdown-container', async () => {
    const page = await newSpecPage({
      components: [NexusDropdown],
      html: nexDrpDwn
    });
    expect(page.root.querySelectorAll('.nexus-dropdown-container').length).toEqual(1);
  });

  it('should have the global class nexus-dropdown-active', async () => {
    const page = await newSpecPage({
      components: [NexusDropdown],
      html: '<nexus-dropdown show="true"></nexus-dropdown>'
    });
    expect(page.root.querySelectorAll('.nexus-dropdown-active').length).toEqual(1);
  });

  it('does not contain global class when prop is false', async () => {
    const page = await newSpecPage({
      components: [NexusDropdown],
      html: nexDrpDwn
    });
    expect(page.root.querySelectorAll('.nexus-dropdown-active').length).toEqual(0);
  });

  it('setTop is called when setDropdownTop @Method is invoked.', async () => {
    const top = 145;
    const page = await newSpecPage({
      components: [NexusDropdown],
      html: nexDrpDwn
    });
    const dropdown = page.rootInstance;
    jest.spyOn(dropdown, 'setTop');
    await page.waitForChanges();
    dropdown.setDropdownTop(top);
    await page.waitForChanges();
    expect(dropdown.setTop).toHaveBeenCalled();
  });

  it('closed dropdown when click outside the dropdown', async () => {
    const page = await newSpecPage({
      components: [NexusDropdown],
      html: nexDrpDwn
    });
    const dropdown = page.rootInstance;
    jest.spyOn(dropdown.closeEvent, 'emit');
    const clickEvent = new Event('click');
    page.doc.dispatchEvent(clickEvent);
    await page.waitForChanges();
    expect(dropdown.closeEvent.emit).toHaveBeenCalled();
    expect(page.rootInstance.show).toBeFalsy();
  });

  it('call toggleDropDown onClick', async () => {
    const page = await newSpecPage({
      components: [NexusDropdown],
      html: nexDrpDwn
    });
    const dropdown = page.rootInstance;
    const dropdownEl = page.root.querySelector('.nexus-dropdown');
    const event = new Event('click', {
      bubbles: true
    });
    jest.spyOn(dropdown, 'toggleDropDown');
    await page.waitForChanges();
    dropdownEl.dispatchEvent(event);
    await page.waitForChanges();
    expect(dropdown.toggleDropDown).toHaveBeenCalled();
  });

  it('check if style attribute is added to the component', async () => {
    const top = 145;
    const page = await newSpecPage({
      components: [NexusDropdown],
      html: nexDrpDwn
    });
    const dropdown = page.rootInstance;
    const dropdownEl = page.root.querySelector('.nexus-dropdown');
    dropdownEl.setAttribute('style', 'top:1');
    jest.spyOn(dropdown, 'setTop');
    await page.waitForChanges();
    dropdown.setDropdownTop(top);
    await page.waitForChanges();
    expect(dropdownEl).toHaveAttribute('style');
  });
});
