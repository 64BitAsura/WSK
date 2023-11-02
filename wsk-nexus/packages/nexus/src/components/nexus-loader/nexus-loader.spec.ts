import { NexusLoader } from './nexus-loader';
import { newSpecPage } from '@stencil/core/testing';

const nexLoaderCls = 'nexus-loader';

const declrComp = () => {
  const page = newSpecPage({
    components: [NexusLoader],
    html: `<nexus-loader></nexus-loader>`
  });

  return page;
};

describe('nexus-loader class', () => {
  let page;
  let loader;

  beforeEach(async () => {
    page = await declrComp();
    loader = page.body.querySelector(nexLoaderCls);
  });

  it('should contain class', () => {
    expect(page.root).toHaveClass(nexLoaderCls);
  });

  it('should show/hide based on show property', async () => {
    page.doc.querySelector(nexLoaderCls).setAttribute('show', 'true');
    await page.waitForChanges();
    expect(loader).toHaveClass('nexus-loader-show');
    page.doc.querySelector(nexLoaderCls).setAttribute('show', 'false');
    await page.waitForChanges();
    expect(loader).not.toHaveClass('nexus-loader-show');
  });

  it('should render correctly with fullscreen prop', async () => {
    page.doc.querySelector(nexLoaderCls).setAttribute('fullscreen', 'true');
    await page.waitForChanges();
    expect(loader).toHaveClass('nexus-loader-fullscreen');
    page.doc.querySelector(nexLoaderCls).setAttribute('fullscreen', 'false');
    await page.waitForChanges();
    expect(loader).not.toHaveClass('nexus-loader-fullscreen');
  });
});
