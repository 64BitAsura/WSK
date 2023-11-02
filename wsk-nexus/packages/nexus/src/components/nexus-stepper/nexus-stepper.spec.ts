import { NexusStepper } from './nexus-stepper';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-stepper', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusStepper],
      html: '<nexus-stepper></nexus-stepper>'
    });

    expect(new NexusStepper()).toBeTruthy();
    expect(page.root).toEqualHtml(
      '<nexus-stepper><nav class="nexus-mb-2 nexus-mt-2 stepper-row" role="navigation"><ol></ol></nav></nexus-stepper>'
    );
  });
});
