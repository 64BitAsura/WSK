import { NexusModalHeaderSubtitle } from './nexus-modal-header-subtitle';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-modal-header-subtitle', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusModalHeaderSubtitle],
      html: '<nexus-modal-header-subtitle><h1>nexus-modal-header-subtitle works!</h1></nexus-modal-header-subtitle>'
    });

    expect(new NexusModalHeaderSubtitle()).toBeTruthy();
    let htmlTempStr: string;
    htmlTempStr =
      '<nexus-modal-header-subtitle class="nexus-modal-header-subtitle" slot="nexus-modal-header-subtitle">';
    htmlTempStr = `${htmlTempStr}<h1>nexus-modal-header-subtitle works!</h1></nexus-modal-header-subtitle>`;
    expect(page.root).toEqualHtml(htmlTempStr);
  });
});
