import { NexusChipGroup } from './nexus-chip-group';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-chip-group', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusChipGroup],
      html: '<nexus-chip-group><nexus-chip>Chip 1</nexus-chip><nexus-chip>Chip 2</nexus-chip></nexus-chip-group>'
    });

    expect(page.root).toEqualHtml(
      '<nexus-chip-group><div class="nexus-chip-group"><nexus-chip>Chip 1</nexus-chip><nexus-chip>Chip 2</nexus-chip></div></nexus-chip-group>'
    );
  });

  it('should have the global class', async () => {
    const page = await newSpecPage({
      components: [NexusChipGroup],
      html: '<nexus-chip-group><nexus-chip>Chip 1</nexus-chip><nexus-chip>Chip 2</nexus-chip></nexus-chip-group>'
    });

    const chipGroup = page.root.querySelector('div');

    expect(chipGroup).toHaveClass('nexus-chip-group');
  });
});
