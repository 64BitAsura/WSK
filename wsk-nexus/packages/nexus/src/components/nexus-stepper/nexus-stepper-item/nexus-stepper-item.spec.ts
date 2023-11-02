import { NexusStepper } from '../nexus-stepper';
import { NexusStepperItem } from './nexus-stepper-item';
import { newSpecPage } from '@stencil/core/testing';

describe('nexus-stepper-item', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [NexusStepperItem],
      html: '<nexus-stepper-item></nexus-stepper-item>'
    });

    expect(new NexusStepperItem()).toBeTruthy();
    expect(page.root).toEqualHtml(
      '<nexus-stepper-item class="default step-row stepcolor-row stepper-item" role="listitem"><div class="nexus-stepper-item"> <div aria-hidden="true" class="default step-counter" title="-"></div></div></nexus-stepper-item>'
    );
  });

  it('status active', async () => {
    const page = await newSpecPage({
      components: [NexusStepper, NexusStepperItem],
      html: '<nexus-stepper><nexus-stepper-item status="active"><button>stepper item</button></nexus-stepper-item></nexus-stepper>'
    });

    expect(new NexusStepperItem()).toBeTruthy();
    expect(page.root).toEqualHtml(
      '<nexus-stepper><nav class="nexus-mb-2 nexus-mt-2 stepper-row" role="navigation"><ol><nexus-stepper-item class="active step-row stepcolor-row stepper-item" role="listitem" status="active"><div class="nexus-stepper-item"> <div aria-hidden="true" class="active step-counter" title="1">1</div><button>stepper item</button></div></nexus-stepper-item></ol></nav></nexus-stepper>'
    );
  });

  it('status complete', async () => {
    const page = await newSpecPage({
      components: [NexusStepper, NexusStepperItem],
      html: '<nexus-stepper><nexus-stepper-item status="complete"><button>stepper item</button></nexus-stepper-item></nexus-stepper>'
    });

    expect(new NexusStepperItem()).toBeTruthy();
    expect(page.root).toEqualHtml(
      '<nexus-stepper><nav class="nexus-mb-2 nexus-mt-2 stepper-row" role="navigation"><ol><nexus-stepper-item class="complete step-row stepcolor-row stepper-item" role="listitem" status="complete"><div class="nexus-stepper-item"><nexus-icon alt="completed" aria-hidden="true" class="icon-complete" size="md" size-lock="" title="completed"></nexus-icon><button>stepper item</button></div></nexus-stepper-item></ol></nav></nexus-stepper>'
    );
  });

  it('status error', async () => {
    const page = await newSpecPage({
      components: [NexusStepper, NexusStepperItem],
      html: '<nexus-stepper><nexus-stepper-item status="error"><button>stepper item</button></nexus-stepper-item></nexus-stepper>'
    });

    expect(new NexusStepperItem()).toBeTruthy();
    expect(page.root).toEqualHtml(
      '<nexus-stepper><nav class="nexus-mb-2 nexus-mt-2 stepper-row" role="navigation"><ol><nexus-stepper-item class="error step-row stepcolor-row stepper-item" role="listitem" status="error"><div class="nexus-stepper-item"><nexus-icon alt="error" aria-hidden="true" class="icon-error" size="md" size-lock="" title="error"></nexus-icon><button>stepper item</button></div></nexus-stepper-item></ol></nav></nexus-stepper>'
    );
  });

  it('status warning', async () => {
    const page = await newSpecPage({
      components: [NexusStepper, NexusStepperItem],
      html: '<nexus-stepper><nexus-stepper-item status="warning"><button>stepper item</button></nexus-stepper-item></nexus-stepper>'
    });

    expect(new NexusStepperItem()).toBeTruthy();
    expect(page.root).toEqualHtml(
      '<nexus-stepper><nav class="nexus-mb-2 nexus-mt-2 stepper-row" role="navigation"><ol><nexus-stepper-item class="warning step-row stepcolor-row stepper-item" role="listitem" status="warning"><div class="nexus-stepper-item"><nexus-icon alt="warning" aria-hidden="true" class="icon-warning" size="md" size-lock="" title="warning"></nexus-icon><button>stepper item</button></div></nexus-stepper-item></ol></nav></nexus-stepper>'
    );
  });
});
