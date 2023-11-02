import { NexusBreadcrumbItem } from './nexus-breadcrumb-item';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-breadcrumb-item', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusBreadcrumbItem],
      html: '<nexus-breadcrumb-item></nexus-breadcrumb-item>'
    });

    expect(new NexusBreadcrumbItem()).toBeTruthy();
    expect(page.root).toEqualHtml(
      '<nexus-breadcrumb-item aria-hidden="true" class="nexus-breadcrumb-item"><li><span class="nexus-breadcrumb-item-separator"></span></li></nexus-breadcrumb-item>'
    );
  });
  it('contains class', async () => {
    const page = await newSpecPage({
      components: [NexusBreadcrumbItem],
      html: '<nexus-breadcrumb-item></nexus-breadcrumb-item>'
    });
    expect(page.root).toHaveClass('nexus-breadcrumb-item');
  });
  it('renders icon ', async () => {
    const page = await newSpecPage({
      components: [NexusBreadcrumbItem],
      html: `<nexus-breadcrumb-item><nexus-icon src="../assets/icons/action/ic_3d_rotation_24px.svg"></nexus-icon></nexus-breadcrumb-item>`
    });
    const nexusIcon = page.root.querySelector('nexus-icon');
    expect(nexusIcon).toBeTruthy();
  });
  it('disable ', async () => {
    const page = await newSpecPage({
      components: [NexusBreadcrumbItem],
      html: '<nexus-breadcrumb-item disabled></nexus-breadcrumb-item>'
    });
    expect(page.root.querySelector('li')).toHaveClass('nexus-breadcrumb-item-disabled');
  });
});
