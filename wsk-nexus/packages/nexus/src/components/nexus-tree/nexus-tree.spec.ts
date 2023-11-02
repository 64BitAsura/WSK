import { NexusTree } from './nexus-tree';
import { newSpecPage } from '@stencil/core/testing';
import { NexusTreeContent } from './nexus-tree-content/nexus-tree-content';
import { NexusTreeTrigger } from './nexus-tree-trigger/nexus-tree-trigger';

describe('nexus-tree', () => {
  it('should have class', async () => {
    const page = await newSpecPage({
      components: [NexusTree],
      html: '<nexus-tree></nexus-tree>'
    });

    expect(page.root).toHaveClass('nexus-tree');
  });

  it('should expand the tree content', async () => {
    const page = await newSpecPage({
      components: [NexusTree, NexusTreeContent, NexusTreeTrigger],
      html: `<nexus-tree>
        <nexus-tree-trigger></nexus-tree-trigger>
        <nexus-tree-content></nexus-tree-content>
      </nexus-tree>`
    });

    const instance = page.rootInstance;

    const button = page.root.querySelector('button');

    const click = new Event('click', {
      bubbles: true
    });

    button.dispatchEvent(click);

    expect(instance.open).toBeTruthy();
  });

  it('should collapse the tree content', async () => {
    const page = await newSpecPage({
      components: [NexusTree, NexusTreeContent, NexusTreeTrigger],
      html: `<nexus-tree open="true">
        <nexus-tree-trigger></nexus-tree-trigger>
        <nexus-tree-content></nexus-tree-content>
      </nexus-tree>`
    });

    page.waitForChanges();

    const instance = page.rootInstance;

    const button = page.root.querySelector('button');

    const click = new Event('click', {
      bubbles: true
    });

    button.dispatchEvent(click);

    page.waitForChanges();

    expect(instance.open).toBeFalsy();
  });
});
