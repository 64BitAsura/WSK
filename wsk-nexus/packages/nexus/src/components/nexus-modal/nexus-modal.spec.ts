import { NexusModal } from './nexus-modal';
import { newSpecPage } from '@stencil/core/testing';

const nexModolcls = 'nexus-modal-overlay-hidden';
const nexMdlcls = '.nexus-modal';

const declrComp = (htmlStr: string) => {
  const page = newSpecPage({
    components: [NexusModal],
    html: htmlStr
  });

  return page;
};

const bodyQuerySelector = (page, cls) => page.body.querySelector(cls);

describe('nexus-modal', () => {
  it('should contain class', async () => {
    const page = await declrComp(`<nexus-modal></nexus-modal>`);
    expect(page.root).toHaveClass('nexus-modal-overlay');
  });

  it('should disable scrolling', async () => {
    const page = await declrComp(`<nexus-modal show="true"></nexus-modal>`);
    expect(page.body.getAttribute('style')).toContain('overflow: hidden');
  });

  it('should enable scrolling when destroyed', async () => {
    const page = await declrComp(`<nexus-modal show="true"></nexus-modal>`);
    const event = new Event('DOMNodeRemoved', {
      bubbles: true
    });

    page.body.dispatchEvent(event);

    expect(page.body.getAttribute('style')).toContain('overflow: hidden');

    page.root.dispatchEvent(event);

    expect(page.body.getAttribute('style')).toBe(null);
  });

  it('should emit closeEvent when modal is closed', async () => {
    const page = await declrComp(`<nexus-modal show="true"></nexus-modal>`);

    const modal = page.rootInstance;
    const modalEl = page.doc.querySelector('nexus-modal');
    jest.spyOn(modal.closeEvent, 'emit');
    await page.waitForChanges();
    modalEl.setAttribute('show', 'false');
    await page.waitForChanges();
    expect(modal.closeEvent.emit).toHaveBeenCalled();
  });

  it('should contain class nexus-modal-overlay-hidden if fullscreen is true', async () => {
    const page = await declrComp(`<nexus-modal fullscreen="true"></nexus-modal>`);
    expect(page.root).toHaveClass(nexModolcls);
  });

  it('should not contain class nexus-modal-overlay-hidden if fullscreen is false', async () => {
    const page = await declrComp(`<nexus-modal fullscreen="false"></nexus-modal>`);
    expect(page.root).not.toHaveClass(nexModolcls);
  });

  it('should contain classes if size is full', async () => {
    const page = await declrComp(`<nexus-modal size="full"></nexus-modal>`);
    const sectionElement = page.body.querySelector(nexMdlcls);
    expect(sectionElement).toBeDefined();
    expect(page.root).toHaveClass(nexModolcls);
    expect(sectionElement).toHaveClass('nexus-modal-full');
  });

  it('should contain class nexus-modal-xs and not nexus-modal-overlay-hidden if size is xs', async () => {
    const page = await declrComp(`<nexus-modal size="xs"></nexus-modal>`);
    const sectionElement = bodyQuerySelector(page, nexMdlcls);
    expect(sectionElement).toBeDefined();
    expect(sectionElement).toHaveClass('nexus-modal-xs');
    expect(page.root).not.toHaveClass(nexModolcls);
  });

  it('should contain class nexus-modal-sm  and not nexus-modal-overlay-hidden if size is sm', async () => {
    const page = await declrComp(`<nexus-modal size="sm"></nexus-modal>`);
    const sectionElement = bodyQuerySelector(page, nexMdlcls);
    expect(sectionElement).toBeDefined();
    expect(sectionElement).toHaveClass('nexus-modal-sm');
    expect(page.root).not.toHaveClass(nexModolcls);
  });

  it('should contain class nexus-modal-md  and not nexus-modal-overlay-hidden if size is md', async () => {
    const page = await declrComp(`<nexus-modal size="md"></nexus-modal>`);
    const sectionElement = bodyQuerySelector(page, nexMdlcls);
    expect(sectionElement).toBeDefined();
    expect(sectionElement).toHaveClass('nexus-modal-md');
    expect(page.root).not.toHaveClass(nexModolcls);
  });

  it('should contain class nexus-modal-lg and not nexus-modal-overlay-hidden if size is lg', async () => {
    const page = await declrComp(`<nexus-modal size="lg"></nexus-modal>`);
    const sectionElement = bodyQuerySelector(page, nexMdlcls);
    expect(sectionElement).toBeDefined();
    expect(sectionElement).toHaveClass('nexus-modal-lg');
    expect(page.root).not.toHaveClass(nexModolcls);
  });

  it('should contain class nexus-modal-xl  and not nexus-modal-overlay-hidden if size is xl', async () => {
    const page = await declrComp(`<nexus-modal size="xl"></nexus-modal>`);
    const sectionElement = bodyQuerySelector(page, nexMdlcls);
    expect(sectionElement).toBeDefined();
    expect(sectionElement).toHaveClass('nexus-modal-xl');
    expect(page.root).not.toHaveClass(nexModolcls);
  });

  it('should not contain any of the size classes if size is undefined', async () => {
    const page = await declrComp(`<nexus-modal size=""></nexus-modal>`);
    const sectionElement = page.body.querySelector(nexMdlcls);
    expect(sectionElement).toBeDefined();
    expect(sectionElement).not.toHaveClass('nexus-modal-xs');
    expect(sectionElement).not.toHaveClass('nexus-modal-sm');
    expect(sectionElement).not.toHaveClass('nexus-modal-md');
    expect(sectionElement).not.toHaveClass('nexus-modal-lg');
    expect(sectionElement).not.toHaveClass('nexus-modal-xl');
    expect(sectionElement).not.toHaveClass('nexus-modal-full');
  });
});
