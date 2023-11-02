import { newSpecPage } from '@stencil/core/testing';
import { NexusTooltip } from './nexus-tooltip';
import { NexusTooltipTrigger } from './nexus-tooltip-trigger/nexus-tooltip-trigger';
import { NexusTooltipContent } from './nexus-tooltip-content/nexus-tooltip-content';
import { NexusIcon } from '../nexus-icon/nexus-icon';

const nexTtipCls = '.nexus-btn';
const nexTtipVisCls = '.nexus-tooltip-content-visible';

describe('NexusTooltip', () => {
  let component: NexusTooltip;
  let page;

  beforeEach(async () => {
    page = await newSpecPage({
      components: [NexusTooltip, NexusTooltipTrigger, NexusTooltipContent, NexusIcon],
      html: `<nexus-tooltip>
      <nexus-tooltip-trigger></nexus-tooltip-trigger>
      <nexus-tooltip-content></nexus-tooltip-content>
    </nexus-tooltip>`
    });

    component = page.rootInstance;
  });

  it('should initialize with default values', () => {
    expect(component.attrId).toBeUndefined();
    expect(component.placement).toBe('');
    expect(component.allowClick).toBe(true);
    expect(component.isHovered).toBe(false);
    expect(component.persist).toBe(false);
    expect(component.position.trigger.position).toBe('');
  });

  it('should contain class', () => {
    expect(page.root).toHaveClass('nexus-tooltip');
  });

  it('should set the attrId when provided', () => {
    const attrId = 'my-tooltip';
    page.root.setAttribute('attr-id', attrId);
    expect(component.attrId).toBe(attrId);
  });

  it('should set the position when provided', () => {
    const placement = 'top';
    page.root.setAttribute('placement', placement);
    expect(component.placement).toBe(placement);
  });

  it('should set the allowClick property when provided', () => {
    const allowClick = false;
    page.root.setAttribute('allow-click', allowClick.toString());
    expect(component.allowClick).toBe(allowClick);
  });

  it('attrId when not provided', () => {
    expect(component.attrId).toBeUndefined();
  });

  it('should persist content on click', (done) => {
    const mouseenter = new Event('mouseenter', {
      bubbles: true
    });

    const click = new Event('click', {
      bubbles: true
    });

    const mouseleave = new Event('mouseleave', {
      bubbles: true
    });

    const btn = page.root.querySelector(nexTtipCls);

    btn.dispatchEvent(mouseenter);
    btn.dispatchEvent(click);

    setTimeout(() => {
      btn.dispatchEvent(mouseleave);

      const tooltipContent = page.body.querySelectorAll(nexTtipVisCls);

      expect(tooltipContent.length).toBe(1);
    }, 0);

    setTimeout(() => {
      btn.dispatchEvent(click);

      const tooltipContent = page.body.querySelectorAll(nexTtipVisCls);

      expect(tooltipContent.length).toBe(1);

      done();
    }, 1);
  });

  it('should close tooltip if content icon is clicked', (done) => {
    const mouseenter = new Event('mouseenter', {
      bubbles: true
    });

    const click = new Event('click', {
      bubbles: true
    });

    const closeTooltip = new Event('_closeTooltip', {
      bubbles: true
    });

    const btn = page.root.querySelector(nexTtipCls);

    btn.dispatchEvent(mouseenter);
    btn.dispatchEvent(click);

    jest.spyOn(page.rootInstance, 'handleCloseTooltip');

    setTimeout(() => {
      const closeBtn = page.body.querySelector(nexTtipVisCls).querySelector('.nexus-btn-icon');

      closeBtn.dispatchEvent(closeTooltip);

      expect(page.rootInstance.handleCloseTooltip).toHaveBeenCalled();

      done();
    });
  });

  it('should handle mouse events correctly', () => {
    const tooltip = page.rootInstance;
    tooltip.handleMouseOver();
    expect(tooltip.isHovered).toBe(true);
    tooltip.handleMouseOut();
    expect(tooltip.isHovered).toBe(false);
  });
});

describe('calculates tooltip position based on element and content dimensions', () => {
  // Mock element and content dimensions
  const tooltipWidth = 50;
  const tooltipHeight = 50;
  const contentWidth = 200;
  const contentHeight = 100;
  let leftOffset;
  let topOffset;
  const rightOffset = 0;
  const bottomOffset = 0;

  leftOffset = 0;
  topOffset = 0;

  it('should set trigger position correctly', async () => {
    const page = await newSpecPage({
      components: [NexusTooltip],
      html: '<nexus-tooltip></nexus-tooltip>'
    });

    const tooltip = page.rootInstance;

    tooltip.setTriggerPosition('top');
    expect(tooltip.position.trigger.position).toBe('top');

    tooltip.setTriggerPosition('left');
    expect(tooltip.position.trigger.position).toBe('left');

    tooltip.setTriggerPosition('right');
    expect(tooltip.position.trigger.position).toBe('right');

    tooltip.setTriggerPosition('bottom');
    expect(tooltip.position.trigger.position).toBe('bottom');
  });

  it('tooltip position should be on bottom when their is no space on top', async () => {
    const page = await newSpecPage({
      components: [NexusTooltip, NexusTooltipTrigger, NexusTooltipContent, NexusIcon],
      html: `<nexus-tooltip attr-id="custom-id-2">
      <nexus-tooltip-trigger></nexus-tooltip-trigger>
      <nexus-tooltip-content></nexus-tooltip-content>
    </nexus-tooltip>`
    });

    // Assign the mock dimensions to Tooltip root element
    page.rootInstance.element.getBoundingClientRect = jest.fn(() => ({
      width: tooltipWidth,
      height: tooltipHeight,
      left: leftOffset,
      top: topOffset,
      right: rightOffset,
      bottom: bottomOffset
    }));

    const mockQuerySelector = jest.fn().mockReturnValue({
      getBoundingClientRect: jest.fn().mockReturnValue({
        width: contentWidth,
        height: contentHeight
      }),
      style: {}
    });
    page.rootInstance.element.querySelector = mockQuerySelector;
    page.rootInstance.getTooltipPosition();
    expect(page.rootInstance.position.trigger.position).toBe('bottom');
  });

  it('tooltip position based on space around it', async () => {
    const page = await newSpecPage({
      components: [NexusTooltip, NexusTooltipTrigger, NexusTooltipContent, NexusIcon],
      html: `<nexus-tooltip attr-id="custom-id-2">
      <nexus-tooltip-trigger></nexus-tooltip-trigger>
      <nexus-tooltip-content></nexus-tooltip-content>
    </nexus-tooltip>`
    });

    topOffset = 300;
    // Assign the mock dimensions to Tooltip root element
    page.rootInstance.element.getBoundingClientRect = jest.fn(() => ({
      width: tooltipWidth,
      height: tooltipHeight,
      left: leftOffset,
      top: topOffset,
      right: rightOffset,
      bottom: bottomOffset
    }));

    // Assign the mock dimensions to Tooltip content
    const mockQuerySelector = jest.fn().mockReturnValue({
      getBoundingClientRect: jest.fn().mockReturnValue({
        width: contentWidth,
        height: contentHeight
      }),
      style: {}
    });
    page.rootInstance.element.querySelector = mockQuerySelector;
    page.rootInstance.getTooltipPosition();
    expect(page.rootInstance.position.trigger.position).toBe('top');

    page.root.setAttribute('placement', 'bottom');
    topOffset = 10;
    page.rootInstance.element.getBoundingClientRect = jest.fn(() => ({
      width: tooltipWidth,
      height: tooltipHeight,
      left: leftOffset,
      top: topOffset,
      right: rightOffset,
      bottom: bottomOffset
    }));
    page.rootInstance.getTooltipPosition();
    expect(page.rootInstance.position.trigger.position).toBe('bottom');

    page.root.setAttribute('placement', 'bottom');
    topOffset = 760;
    // Assign the mock dimensions to Tooltip root element
    page.rootInstance.element.getBoundingClientRect = jest.fn(() => ({
      width: tooltipWidth,
      height: tooltipHeight,
      left: leftOffset,
      top: topOffset,
      right: rightOffset,
      bottom: bottomOffset
    }));
    page.rootInstance.getTooltipPosition();
    expect(page.rootInstance.position.trigger.position).toBe('top');

    page.root.setAttribute('placement', 'left');
    leftOffset = 500;
    // Assign the mock dimensions to Tooltip root element
    page.rootInstance.element.getBoundingClientRect = jest.fn(() => ({
      width: tooltipWidth,
      height: tooltipHeight,
      left: leftOffset,
      top: topOffset,
      right: rightOffset,
      bottom: bottomOffset
    }));
    page.rootInstance.getTooltipPosition();
    expect(page.rootInstance.position.trigger.position).toBe('left');

    page.root.setAttribute('placement', 'left');
    leftOffset = 50;
    // Assign the mock dimensions to Tooltip root element
    page.rootInstance.element.getBoundingClientRect = jest.fn(() => ({
      width: tooltipWidth,
      height: tooltipHeight,
      left: leftOffset,
      top: topOffset,
      right: rightOffset,
      bottom: bottomOffset
    }));
    page.rootInstance.getTooltipPosition();
    expect(page.rootInstance.position.trigger.position).toBe('right');

    page.root.setAttribute('placement', 'right');
    leftOffset = 0;
    // Assign the mock dimensions to Tooltip root element
    page.rootInstance.element.getBoundingClientRect = jest.fn(() => ({
      width: tooltipWidth,
      height: tooltipHeight,
      left: leftOffset,
      top: topOffset,
      right: rightOffset,
      bottom: bottomOffset
    }));
    page.rootInstance.getTooltipPosition();
    expect(page.rootInstance.position.trigger.position).toBe('right');

    page.root.setAttribute('placement', 'right');
    leftOffset = 1300;
    // Assign the mock dimensions to Tooltip root element
    page.rootInstance.element.getBoundingClientRect = jest.fn(() => ({
      width: tooltipWidth,
      height: tooltipHeight,
      left: leftOffset,
      top: topOffset,
      right: rightOffset,
      bottom: bottomOffset
    }));
    page.rootInstance.getTooltipPosition();
    expect(page.rootInstance.position.trigger.position).toBe('left');
  });
});
