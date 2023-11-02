import { NexusToast } from './nexus-toast';
import { newSpecPage } from '@stencil/core/testing';

const nexTostCls = 'nexus-toast';

describe('check nexus-toast', () => {
  it('should contain class', async () => {
    const page = await newSpecPage({
      components: [NexusToast],
      html: `<nexus-toast></nexus-toast>`
    });

    expect(page.root).toHaveClass(nexTostCls);
  });

  it('should remove the tooltip when the x is clicked', async () => {
    const page = await newSpecPage({
      components: [NexusToast],
      html: `<nexus-toast closeable="true"></nexus-toast>`
    });

    page.waitForChanges();
    const button = page.root.querySelector('button') as HTMLElement;
    button.click();
    page.waitForChanges();
    expect(page.root.innerHTML).toContain('');
  });

  it('should have the custom icon class when custom option is selected', async () => {
    const page = await newSpecPage({
      components: [NexusToast],
      html: `<nexus-toast variant="custom" icon-src="test.svg"></nexus-toast>`
    });

    expect(page.root).toHaveClass(nexTostCls);
    expect(page.root.innerHTML).toContain('src="test.svg"');
  });

  it('auto close after 3 milli seconds.', async () => {
    const page = await newSpecPage({
      components: [NexusToast],
      html: `<nexus-toast auto-close="3000"></nexus-toast>`
    });
    const waitTime = 4000;
    const header = page.rootInstance;
    jest.spyOn(header.closeEvent, 'emit');

    await new Promise((wait) => setTimeout(wait, waitTime));
    await page.waitForChanges();
    expect(page.root.innerHTML).toContain('');
    expect(header.closeEvent.emit).toHaveBeenCalled();
  });
});
