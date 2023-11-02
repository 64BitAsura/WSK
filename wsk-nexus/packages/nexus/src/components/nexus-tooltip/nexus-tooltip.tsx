import { Component, h, Host, Listen, Element, State, Prop } from '@stencil/core';

class Position {
  trigger: {
    position: string;
  };
}

let nextUniqueId;
nextUniqueId = 0;

@Component({
  tag: 'nexus-tooltip',
  shadow: false,
  styleUrl: 'nexus-tooltip.scss'
})
export class NexusTooltip {
  @Element() element: HTMLNexusTooltipElement;

  @State() persist: boolean = false;

  /**
   * The Unique identifier for the tooltip.
   * If none is provided one will be added by default.
   */
  @Prop() attrId: string;

  /**
   * Position of the tooltip (top, right, bottom, left).
   * If nothing is provided, it will be calculated based on the screen size.
   */
  @Prop() placement: 'top' | 'bottom' | 'left' | 'right' | '' = '';

  /**
   * Allows tooltip to persist on click to trigger.
   */
  @Prop() allowClick: boolean = true;

  /**
   * Updating DOM on mouseover
   */
  @State() isHovered: boolean = false;

  private readonly _id: string;

  @State() position: Position = {
    trigger: {
      position: ''
    }
  };

  constructor() {
    if (this.attrId) {
      this._id = this.attrId;
    } else {
      nextUniqueId++;
      this._id = `nexus-tooltip-${nextUniqueId}`;
    }
  }

  connectedCallback() {
    this.element.addEventListener('mouseover', this.getTooltipPosition);
  }

  handleMouseOver = () => {
    this.isHovered = true;
  };

  handleMouseOut = () => {
    this.isHovered = false;
  };

  componentDidLoad() {
    this.element.addEventListener('keydown', (event) => {
      const key = event.code.trim();
      switch (key) {
        case 'Space':
        case 'Enter':
          this.showContent(event);
          break;
        case 'Tab':
          if (this._id) {
            this.removeTooltip();
          }
          break;
        default:
          break;
      }
    });
  }

  @Listen('click')
  triggerClick(event) {
    if (this.allowClick) {
      this.showContent(event);
    }
  }

  @Listen('mouseenter')
  showContent(event) {
    if (event.type === 'click') {
      this.persist = !this.persist;

      if (!this.persist) {
        this.hideContent(event);
      }
    }

    const tooltipContentEl: any = this.element.querySelector('nexus-tooltip-content');

    if (!this.persist) {
      tooltipContentEl._show();
    }
  }

  @Listen('mouseleave')
  @Listen('_closeTooltip', {
    target: 'body'
  })
  hideContent(event) {
    if (!this.persist && event.type === 'mouseleave') {
      this.handleMouseLeave();
    }

    if (event.type === '_closeTooltip') {
      this.handleCloseTooltip(event);
    }

    if (event.type === 'click') {
      this.handleClickToClose();
    }
  }

  setTriggerPosition = (position) => {
    this.position.trigger.position = position;
  };

  getTooltipPosition = () => {
    const tooltipContent: any = this.element.querySelector('nexus-tooltip-content');
    const contentWidth = tooltipContent.getBoundingClientRect().width;
    const contentHeight = tooltipContent.getBoundingClientRect().height;
    const tooltipWidth = this.element.getBoundingClientRect().width;
    const tooltipHeight = this.element.getBoundingClientRect().height;
    const setContentHorizontalPosition = Math.floor((contentWidth - tooltipWidth) / 2);
    const setContentVerticalPosition = Math.floor((contentHeight - tooltipHeight) / 2);
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const scrollerWidth = windowWidth - document.documentElement.clientWidth || 0;
    const topOffset = this.element.getBoundingClientRect().top;
    const bottomOffset = windowHeight - (topOffset + tooltipHeight);
    const leftOffset = this.element.getBoundingClientRect().left;
    const rightOffset = windowWidth - (leftOffset + tooltipWidth + scrollerWidth);

    switch (this.placement) {
      case 'top':
        this.setTriggerPosition('top');
        this.setTopPosition(topOffset, contentHeight);

        break;
      case 'left':
        this.setTriggerPosition('left');
        this.setLeftPosition(leftOffset, contentWidth);

        break;
      case 'right':
        this.setTriggerPosition('right');
        this.setRightPosition(rightOffset, contentWidth);

        break;
      case 'bottom':
        this.setTriggerPosition('bottom');
        this.setBottomPosition(bottomOffset, contentHeight);

        break;
      default:
        this.setDefaultPosition(topOffset, contentHeight);

        break;
    }

    this.setTooltipCenterPosition(tooltipContent, setContentHorizontalPosition, setContentVerticalPosition);
  };

  setTooltipCenterPosition(tooltipContent, setContentHorizontalPosition, setContentVerticalPosition) {
    const placement = this.placement || this.position.trigger.position;

    if (placement === 'top' || placement === 'bottom') {
      tooltipContent.style.left = `-${setContentHorizontalPosition}px`;
    }
    if (placement === 'right' || placement === 'left') {
      tooltipContent.style.top = `-${setContentVerticalPosition}px`;
    }
  }

  setTopPosition(topOffset, contentHeight) {
    if (topOffset < contentHeight) {
      this.setTriggerPosition('bottom');
    }
  }

  setLeftPosition(leftOffset, contentWidth) {
    if (leftOffset < contentWidth) {
      this.setTriggerPosition('right');
    }
  }

  setRightPosition(rightOffset, contentWidth) {
    if (rightOffset < contentWidth) {
      this.setTriggerPosition('left');
    }
  }

  setBottomPosition(bottomOffset, contentHeight) {
    if (bottomOffset < contentHeight) {
      this.setTriggerPosition('top');
    }
  }

  setDefaultPosition(topOffset, contentHeight) {
    if (topOffset > contentHeight) {
      this.setTriggerPosition('top');
    } else {
      this.setTriggerPosition('bottom');
    }
  }

  render() {
    return (
      <Host
        class={{
          'nexus-tooltip': true,
          'nexus-tooltip-clicked': this.persist,
          [`nexus-tooltip-${this.position.trigger.position}`]: true
        }}
        for={this._id}
        placement={this.placement || this.position.trigger.position}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      ></Host>
    );
  }

  private handleClickToClose() {
    this.removeTooltip();
  }

  private handleCloseTooltip(event) {
    if (event.target.id !== this._id) {
      return;
    }

    this.removeTooltip();
  }

  private handleMouseLeave() {
    this.removeTooltip();
  }

  private removeTooltip() {
    this.persist = false;
  }
}
