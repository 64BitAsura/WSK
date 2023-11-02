import { NexusBreadcrumb } from './nexus-breadcrumb';
import { NexusBreadcrumbItem } from './nexus-breadcrumb-item/nexus-breadcrumb-item';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-breadcrumb', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusBreadcrumb],
      html: '<nexus-breadcrumb></nexus-breadcrumb>'
    });

    expect(new NexusBreadcrumb()).toBeTruthy();
    expect(page.root).toEqualHtml(
      '<nexus-breadcrumb class="nexus-breadcrumb"><ol class="nexus-breadcrumb-list"></ol></nexus-breadcrumb>'
    );
  });
  it('contains class', async () => {
    const page = await newSpecPage({
      components: [NexusBreadcrumb],
      html: '<nexus-breadcrumb></nexus-breadcrumb>'
    });
    expect(page.root).toHaveClass('nexus-breadcrumb');
  });
  it('renders NexusBreadcrumbItems', async () => {
    const page = await newSpecPage({
      components: [NexusBreadcrumb, NexusBreadcrumbItem],
      html: `<nexus-breadcrumb>
              <nexus-breadcrumb-item><a class="breadcrumb-item"></a></nexus-breadcrumb-item>
            </nexus-breadcrumb>`
    });
    const expectedHtml = `<nexus-breadcrumb class="nexus-breadcrumb">
                            <ol class="nexus-breadcrumb-list">
                                <nexus-breadcrumb-item aria-hidden="true" class="nexus-breadcrumb-item">
                                <li>
                                  <span class="nexus-breadcrumb-item-separator"></span>
                                  <a class="breadcrumb-item"></a>
                                </li>
                              </nexus-breadcrumb-item>
                            </ol>
                          </nexus-breadcrumb>`;

    expect(new NexusBreadcrumbItem()).toBeTruthy();
    expect(page.root).toEqualHtml(expectedHtml);
  });
  it('renders icon inside all the breadcrumb items', async () => {
    const page = await newSpecPage({
      components: [NexusBreadcrumb, NexusBreadcrumbItem],
      html: `<nexus-breadcrumb>
              <nexus-breadcrumb-item><nexus-icon src="../assets/icons/action/ic_3d_rotation_24px.svg"></nexus-icon></nexus-breadcrumb-item>
              <nexus-breadcrumb-item><nexus-icon src="../assets/icons/action/ic_3d_rotation_24px.svg"></nexus-icon></nexus-breadcrumb-item>
            </nexus-breadcrumb>`
    });
    const nexusIcons = page.root.querySelectorAll('nexus-icon').length;
    const nexusBreadcrumbItem = page.root.querySelectorAll('nexus-breadcrumb-item').length;
    expect(nexusIcons).toEqual(nexusBreadcrumbItem);
  });
});
