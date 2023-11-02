/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from '@nexus/core';




export declare interface NexusAccordion extends Components.NexusAccordion {
  /**
   * Event fired when the accordion header button is clicked. 
   */
  toggleEvent: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['open', 'size']
})
@Component({
  selector: 'nexus-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['open', 'size']
})
export class NexusAccordion {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['toggleEvent']);
  }
}


export declare interface NexusAccordionContent extends Components.NexusAccordionContent {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['size']
})
@Component({
  selector: 'nexus-accordion-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['size']
})
export class NexusAccordionContent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusAccordionGroup extends Components.NexusAccordionGroup {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['alwaysOpen']
})
@Component({
  selector: 'nexus-accordion-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['alwaysOpen']
})
export class NexusAccordionGroup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusAccordionTrigger extends Components.NexusAccordionTrigger {
  /**
   * Trigger accordion toggle events upon clicking the toggle button. 
   */
  _triggerClick: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['align']
})
@Component({
  selector: 'nexus-accordion-trigger',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['align']
})
export class NexusAccordionTrigger {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['_triggerClick']);
  }
}


export declare interface NexusAvatar extends Components.NexusAvatar {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['alt', 'avatarClassName', 'avatarDark', 'avatarImageSrc', 'avatarLogoIcon', 'avatarNameDisplay', 'avatarNotification', 'avatarSize', 'avatarStatus', 'description', 'label', 'size', 'src', 'status', 'type', 'userName']
})
@Component({
  selector: 'nexus-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['alt', 'avatarClassName', 'avatarDark', 'avatarImageSrc', 'avatarLogoIcon', 'avatarNameDisplay', 'avatarNotification', 'avatarSize', 'avatarStatus', 'description', 'label', 'size', 'src', 'status', 'type', 'userName']
})
export class NexusAvatar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusBadge extends Components.NexusBadge {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['overlap', 'variant']
})
@Component({
  selector: 'nexus-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['overlap', 'variant']
})
export class NexusBadge {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusBarChart extends Components.NexusBarChart {
  /**
   * On load even on loading bar chart ('nexusBarChartLoaded'). 
   */
  nexusBarChartLoaded: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['attrId', 'axisLabelFontSize', 'axisTickFontFamily', 'axisTickFontSize', 'barStroke', 'barStrokeWidth', 'canvasHeight', 'canvasWidth', 'chartData', 'chartId', 'colorScheme', 'data', 'gridlines', 'height', 'hideXAxis', 'hideXTicks', 'hideYAxis', 'hideYTicks', 'inverse', 'legend', 'legendFontSize', 'legendMetric', 'legendWidth', 'linearFormat', 'linearMetric', 'linearTickFormat', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop', 'maxBarWidth', 'ordinalMetric', 'orientation', 'stroke', 'strokeWidth', 'tooltips', 'valueMetric', 'width', 'xLabel', 'xTickSize', 'yLabel', 'yTickSize']
})
@Component({
  selector: 'nexus-bar-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['attrId', 'axisLabelFontSize', 'axisTickFontFamily', 'axisTickFontSize', 'barStroke', 'barStrokeWidth', 'canvasHeight', 'canvasWidth', 'chartData', 'chartId', 'colorScheme', 'data', 'gridlines', 'height', 'hideXAxis', 'hideXTicks', 'hideYAxis', 'hideYTicks', 'inverse', 'legend', 'legendFontSize', 'legendMetric', 'legendWidth', 'linearFormat', 'linearMetric', 'linearTickFormat', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop', 'maxBarWidth', 'ordinalMetric', 'orientation', 'stroke', 'strokeWidth', 'tooltips', 'valueMetric', 'width', 'xLabel', 'xTickSize', 'yLabel', 'yTickSize']
})
export class NexusBarChart {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nexusBarChartLoaded']);
  }
}


export declare interface NexusBreadcrumb extends Components.NexusBreadcrumb {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['separator']
})
@Component({
  selector: 'nexus-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['separator']
})
export class NexusBreadcrumb {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusBreadcrumbItem extends Components.NexusBreadcrumbItem {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['disabled']
})
@Component({
  selector: 'nexus-breadcrumb-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled']
})
export class NexusBreadcrumbItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusCard extends Components.NexusCard {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['bgColor', 'bgImage', 'clickable', 'height']
})
@Component({
  selector: 'nexus-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['bgColor', 'bgImage', 'clickable', 'height']
})
export class NexusCard {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusCardAvatar extends Components.NexusCardAvatar {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-card-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusCardAvatar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusCardBody extends Components.NexusCardBody {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-card-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusCardBody {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusCardBodyImage extends Components.NexusCardBodyImage {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-card-body-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusCardBodyImage {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusCardFooter extends Components.NexusCardFooter {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-card-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusCardFooter {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusCardHeader extends Components.NexusCardHeader {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-card-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusCardHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusCardHeaderButton extends Components.NexusCardHeaderButton {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-card-header-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusCardHeaderButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusCardHeaderDetails extends Components.NexusCardHeaderDetails {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-card-header-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusCardHeaderDetails {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusCardHeaderSubtitle extends Components.NexusCardHeaderSubtitle {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-card-header-subtitle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusCardHeaderSubtitle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusCardHeaderTitle extends Components.NexusCardHeaderTitle {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-card-header-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusCardHeaderTitle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusCarousel extends Components.NexusCarousel {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['options']
})
@Component({
  selector: 'nexus-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['options']
})
export class NexusCarousel {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusCarouselItem extends Components.NexusCarouselItem {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-carousel-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusCarouselItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusCharts extends Components.NexusCharts {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-charts',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusCharts {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusCheckbox extends Components.NexusCheckbox {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['attrId', 'checked', 'disabled', 'indeterminate', 'required']
})
@Component({
  selector: 'nexus-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['attrId', 'checked', 'disabled', 'indeterminate', 'required']
})
export class NexusCheckbox {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusChip extends Components.NexusChip {
  /**
   * Trigger removable icon click event. 
   */
  triggerRemovableClick: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['disabled', 'error', 'removable', 'success']
})
@Component({
  selector: 'nexus-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'error', 'removable', 'success']
})
export class NexusChip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['triggerRemovableClick']);
  }
}


export declare interface NexusChipGroup extends Components.NexusChipGroup {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-chip-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusChipGroup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusDropdown extends Components.NexusDropdown {
  /**
   * set the drop down position with respective offset. @param top
   */
  closeEvent: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['dropdownType', 'height', 'placement', 'show', 'width'],
  methods: ['setDropdownTop']
})
@Component({
  selector: 'nexus-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['dropdownType', 'height', 'placement', 'show', 'width']
})
export class NexusDropdown {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['closeEvent']);
  }
}


export declare interface NexusErrorMessage extends Components.NexusErrorMessage {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-error-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusErrorMessage {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusFileUpload extends Components.NexusFileUpload {
  /**
   * Event fired if an error occurs. IE11 does not support dynamically setting files on an input so this error will be triggered. 
   */
  errorEvent: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['accept', 'attrId', 'disabled', 'multiple', 'required']
})
@Component({
  selector: 'nexus-file-upload',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['accept', 'attrId', 'disabled', 'multiple', 'required']
})
export class NexusFileUpload {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['errorEvent']);
  }
}


export declare interface NexusFooter extends Components.NexusFooter {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusFooter {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusFooterBottom extends Components.NexusFooterBottom {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-footer-bottom',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusFooterBottom {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusFooterColumn extends Components.NexusFooterColumn {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-footer-column',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusFooterColumn {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusFooterContent extends Components.NexusFooterContent {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-footer-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusFooterContent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusFooterContentTitle extends Components.NexusFooterContentTitle {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-footer-content-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusFooterContentTitle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusFooterLogo extends Components.NexusFooterLogo {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-footer-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusFooterLogo {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusFormField extends Components.NexusFormField {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-form-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusFormField {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusGaugeChart extends Components.NexusGaugeChart {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['currentValuePlaceholderStyle', 'currentValueText', 'customSegmentLabels', 'customSegmentStops', 'dimensionUnit', 'endColor', 'fluidWidth', 'forceRender', 'height', 'labelFontSize', 'maxSegmentLabels', 'maxValue', 'minValue', 'needleColor', 'needleHeightRatio', 'needleTransition', 'needleTransitionDuration', 'paddingHorizontal', 'paddingVertical', 'ringWidth', 'segmentColors', 'segmentValueFormatter', 'segments', 'startColor', 'svgAriaLabel', 'textColor', 'value', 'valueFormat', 'valueTextFontSize', 'valueTextFontWeight', 'width']
})
@Component({
  selector: 'nexus-gauge-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['currentValuePlaceholderStyle', 'currentValueText', 'customSegmentLabels', 'customSegmentStops', 'dimensionUnit', 'endColor', 'fluidWidth', 'forceRender', 'height', 'labelFontSize', 'maxSegmentLabels', 'maxValue', 'minValue', 'needleColor', 'needleHeightRatio', 'needleTransition', 'needleTransitionDuration', 'paddingHorizontal', 'paddingVertical', 'ringWidth', 'segmentColors', 'segmentValueFormatter', 'segments', 'startColor', 'svgAriaLabel', 'textColor', 'value', 'valueFormat', 'valueTextFontSize', 'valueTextFontWeight', 'width']
})
export class NexusGaugeChart {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusHeader extends Components.NexusHeader {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusHeaderLogo extends Components.NexusHeaderLogo {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-header-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusHeaderLogo {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusHeaderMenu extends Components.NexusHeaderMenu {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-header-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusHeaderMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusIcon extends Components.NexusIcon {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['alt', 'content', 'size', 'sizeLock', 'src', 'type']
})
@Component({
  selector: 'nexus-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['alt', 'content', 'size', 'sizeLock', 'src', 'type']
})
export class NexusIcon {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusInput extends Components.NexusInput {
  /**
   * Internal event for updating disabled form elements 
   */
  _disabledChange: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['attrId', 'autocomplete', 'disabled', 'max', 'maxLength', 'min', 'minLength', 'placeholder', 'readonly', 'required', 'type', 'value']
})
@Component({
  selector: 'nexus-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['attrId', 'autocomplete', 'disabled', 'max', 'maxLength', 'min', 'minLength', 'placeholder', 'readonly', 'required', 'type', 'value']
})
export class NexusInput {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['_disabledChange']);
  }
}


export declare interface NexusLabel extends Components.NexusLabel {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusLabel {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusLineChart extends Components.NexusLineChart {
  /**
   * On load even on loading line chart ('nexusLineChartLoaded'). 
   */
  nexusLineChartLoaded: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['attrId', 'axisLabelFontSize', 'axisTickFontFamily', 'axisTickFontSize', 'canvasHeight', 'canvasWidth', 'chartData', 'chartId', 'colorScheme', 'data', 'gridlines', 'height', 'hideXAxis', 'hideXTicks', 'hideYAxis', 'hideYTicks', 'interpolation', 'inverse', 'legend', 'legendFontSize', 'legendMetric', 'legendWidth', 'linearFormat', 'linearMetric', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop', 'strokeWidth', 'tooltips', 'valueFormat', 'valueMetric', 'vertices', 'width', 'xLabel', 'xMetric', 'xTickFormat', 'xTickSize', 'yLabel', 'yMetric', 'yTickFormat', 'yTickSize']
})
@Component({
  selector: 'nexus-line-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['attrId', 'axisLabelFontSize', 'axisTickFontFamily', 'axisTickFontSize', 'canvasHeight', 'canvasWidth', 'chartData', 'chartId', 'colorScheme', 'data', 'gridlines', 'height', 'hideXAxis', 'hideXTicks', 'hideYAxis', 'hideYTicks', 'interpolation', 'inverse', 'legend', 'legendFontSize', 'legendMetric', 'legendWidth', 'linearFormat', 'linearMetric', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop', 'strokeWidth', 'tooltips', 'valueFormat', 'valueMetric', 'vertices', 'width', 'xLabel', 'xMetric', 'xTickFormat', 'xTickSize', 'yLabel', 'yMetric', 'yTickFormat', 'yTickSize']
})
export class NexusLineChart {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nexusLineChartLoaded']);
  }
}


export declare interface NexusLoader extends Components.NexusLoader {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['fullscreen', 'show']
})
@Component({
  selector: 'nexus-loader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['fullscreen', 'show']
})
export class NexusLoader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusMenu extends Components.NexusMenu {
  /**
   * Event fired when the menu is closed 
   */
  closeEvent: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['open', 'position']
})
@Component({
  selector: 'nexus-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['open', 'position']
})
export class NexusMenu {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['closeEvent']);
  }
}


export declare interface NexusMenuItem extends Components.NexusMenuItem {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-menu-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusMenuItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusMessage extends Components.NexusMessage {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusMessage {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusModal extends Components.NexusModal {
  /**
   * Event fired when the modal closes. 
   */
  closeEvent: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['fullscreen', 'show', 'size']
})
@Component({
  selector: 'nexus-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['fullscreen', 'show', 'size']
})
export class NexusModal {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['closeEvent']);
  }
}


export declare interface NexusModalBody extends Components.NexusModalBody {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-modal-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusModalBody {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusModalFooter extends Components.NexusModalFooter {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-modal-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusModalFooter {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusModalHeader extends Components.NexusModalHeader {
  /**
   * Event fired when the close icon button is clicked. 
   */
  closeEvent: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-modal-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusModalHeader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['closeEvent']);
  }
}


export declare interface NexusModalHeaderSubtitle extends Components.NexusModalHeaderSubtitle {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-modal-header-subtitle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusModalHeaderSubtitle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusNotification extends Components.NexusNotification {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['variant']
})
@Component({
  selector: 'nexus-notification',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['variant']
})
export class NexusNotification {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusOption extends Components.NexusOption {
  /**
   * Event fired when the option is clicked. 
   */
  triggerOptionSelected: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['disabled', 'keyhover', 'label', 'multiple', 'selected', 'value'],
  methods: ['setPropsValue']
})
@Component({
  selector: 'nexus-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'keyhover', 'label', 'multiple', 'selected', 'value']
})
export class NexusOption {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['triggerOptionSelected']);
  }
}


export declare interface NexusPagination extends Components.NexusPagination {
  /**
   * Event fired when page is changed. 
   */
  changeEvent: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['current', 'max']
})
@Component({
  selector: 'nexus-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['current', 'max']
})
export class NexusPagination {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['changeEvent']);
  }
}


export declare interface NexusPieChart extends Components.NexusPieChart {
  /**
   * On load even on loading pie chart ('nexusPieChartLoaded'). 
   */
  nexusPieChartLoaded: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['attrId', 'canvasHeight', 'canvasWidth', 'chartData', 'chartId', 'colorScheme', 'data', 'height', 'innerRadius', 'inverse', 'legend', 'legendFontSize', 'legendMetric', 'legendWidth', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop', 'stroke', 'strokeWidth', 'tooltips', 'valueFormat', 'valueMetric', 'width']
})
@Component({
  selector: 'nexus-pie-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['attrId', 'canvasHeight', 'canvasWidth', 'chartData', 'chartId', 'colorScheme', 'data', 'height', 'innerRadius', 'inverse', 'legend', 'legendFontSize', 'legendMetric', 'legendWidth', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop', 'stroke', 'strokeWidth', 'tooltips', 'valueFormat', 'valueMetric', 'width']
})
export class NexusPieChart {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nexusPieChartLoaded']);
  }
}


export declare interface NexusPinEntry extends Components.NexusPinEntry {
  /**
   * Event fired when pin is entered. 
   */
  pinEvent: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['disabled', 'length', 'type']
})
@Component({
  selector: 'nexus-pin-entry',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['disabled', 'length', 'type']
})
export class NexusPinEntry {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['pinEvent']);
  }
}


export declare interface NexusProgressBar extends Components.NexusProgressBar {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['circle', 'error', 'indeterminate', 'value']
})
@Component({
  selector: 'nexus-progress-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['circle', 'error', 'indeterminate', 'value']
})
export class NexusProgressBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusProgressBarLabel extends Components.NexusProgressBarLabel {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-progress-bar-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusProgressBarLabel {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusRadio extends Components.NexusRadio {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['attrId', 'checked', 'disabled', 'name', 'required', 'value']
})
@Component({
  selector: 'nexus-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['attrId', 'checked', 'disabled', 'name', 'required', 'value']
})
export class NexusRadio {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusSearch extends Components.NexusSearch {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['debounceInterval']
})
@Component({
  selector: 'nexus-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['debounceInterval']
})
export class NexusSearch {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusSearchList extends Components.NexusSearchList {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-search-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusSearchList {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusSearchListItem extends Components.NexusSearchListItem {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-search-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusSearchListItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusSelect extends Components.NexusSelect {
  /**
   * Internal event for updating disabled form elements 
   */
  _disabledChange: EventEmitter<CustomEvent<any>>;
  /**
   * Event for updating selected option 
   */
  triggerSelection: EventEmitter<CustomEvent<any>>;
  /**
   * Event emited when clicked outside of select 
   */
  closeEvent: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['attrId', 'delimiter', 'disabled', 'multiple', 'placeholder', 'required', 'type', 'value']
})
@Component({
  selector: 'nexus-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['attrId', 'delimiter', 'disabled', 'multiple', 'placeholder', 'required', 'type', 'value']
})
export class NexusSelect {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['_disabledChange', 'triggerSelection', 'closeEvent']);
  }
}


export declare interface NexusSlider extends Components.NexusSlider {
  /**
   * Internal event for updating disabled form elements 
   */
  _disabledChange: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['attrId', 'disabled', 'max', 'min', 'required']
})
@Component({
  selector: 'nexus-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['attrId', 'disabled', 'max', 'min', 'required']
})
export class NexusSlider {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['_disabledChange']);
  }
}


export declare interface NexusStackedBarChart extends Components.NexusStackedBarChart {
  /**
   * On load even on loading stacked bar chart ('nexusStackedBarChartLoaded'). 
   */
  nexusStackedBarChartLoaded: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['attrId', 'axisLabelFontSize', 'axisTickFontFamily', 'axisTickFontSize', 'barStroke', 'barStrokeWidth', 'canvasHeight', 'canvasWidth', 'chartData', 'chartId', 'colorScheme', 'data', 'gridlines', 'height', 'hideXAxis', 'hideXTicks', 'hideYAxis', 'hideYTicks', 'inverse', 'legend', 'legendFontSize', 'legendMetric', 'legendWidth', 'linearDomain', 'linearFormat', 'linearMetric', 'linearTickFormat', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop', 'maxBarWidth', 'ordinalMetric', 'orientation', 'seriesMetric', 'stroke', 'strokeWidth', 'tooltips', 'valueMetric', 'width', 'xLabel', 'xTickSize', 'yLabel', 'yTickSize']
})
@Component({
  selector: 'nexus-stacked-bar-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['attrId', 'axisLabelFontSize', 'axisTickFontFamily', 'axisTickFontSize', 'barStroke', 'barStrokeWidth', 'canvasHeight', 'canvasWidth', 'chartData', 'chartId', 'colorScheme', 'data', 'gridlines', 'height', 'hideXAxis', 'hideXTicks', 'hideYAxis', 'hideYTicks', 'inverse', 'legend', 'legendFontSize', 'legendMetric', 'legendWidth', 'linearDomain', 'linearFormat', 'linearMetric', 'linearTickFormat', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop', 'maxBarWidth', 'ordinalMetric', 'orientation', 'seriesMetric', 'stroke', 'strokeWidth', 'tooltips', 'valueMetric', 'width', 'xLabel', 'xTickSize', 'yLabel', 'yTickSize']
})
export class NexusStackedBarChart {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['nexusStackedBarChartLoaded']);
  }
}


export declare interface NexusStepper extends Components.NexusStepper {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['steppertype']
})
@Component({
  selector: 'nexus-stepper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['steppertype']
})
export class NexusStepper {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusStepperItem extends Components.NexusStepperItem {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['status'],
  methods: ['setPropsValue']
})
@Component({
  selector: 'nexus-stepper-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['status']
})
export class NexusStepperItem {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusTabBar extends Components.NexusTabBar {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-tab-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusTabBar {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusTable extends Components.NexusTable {
  /**
   * Emit list of selected rows 
   */
  rowSelect: EventEmitter<CustomEvent<any[]>>;
  /**
   * Emit current page details on table data change 
   */
  tableChangeEvent: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['attrId', 'columns', 'currentPage', 'enablePageSizeOption', 'maxHeight', 'pageSize', 'pageSizeLabel', 'pageSizeOpt', 'pagination', 'rowSelection', 'rows', 'sortAscIcon', 'sortDefaultIcon', 'sortDescIcon', 'totalItems', 'type']
})
@Component({
  selector: 'nexus-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['attrId', 'columns', 'currentPage', 'enablePageSizeOption', 'maxHeight', 'pageSize', 'pageSizeLabel', 'pageSizeOpt', 'pagination', 'rowSelection', 'rows', 'sortAscIcon', 'sortDefaultIcon', 'sortDescIcon', 'totalItems', 'type']
})
export class NexusTable {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['rowSelect', 'tableChangeEvent']);
  }
}


export declare interface NexusTextarea extends Components.NexusTextarea {
  /**
   * Internal event for updating disabled form elements 
   */
  _disabledChange: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['attrId', 'cols', 'disabled', 'maxLength', 'minLength', 'placeholder', 'required', 'rows', 'value']
})
@Component({
  selector: 'nexus-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['attrId', 'cols', 'disabled', 'maxLength', 'minLength', 'placeholder', 'required', 'rows', 'value']
})
export class NexusTextarea {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['_disabledChange']);
  }
}


export declare interface NexusToast extends Components.NexusToast {
  /**
   * Event fired when the tooltip close button is clicked. 
   */
  closeEvent: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['autoClose', 'closeable', 'iconSrc', 'position', 'show', 'variant']
})
@Component({
  selector: 'nexus-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['autoClose', 'closeable', 'iconSrc', 'position', 'show', 'variant']
})
export class NexusToast {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['closeEvent']);
  }
}


export declare interface NexusToggle extends Components.NexusToggle {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['attrId', 'disabled', 'labelActive', 'labelInactive', 'required', 'size', 'toggled', 'type', 'value']
})
@Component({
  selector: 'nexus-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['attrId', 'disabled', 'labelActive', 'labelInactive', 'required', 'size', 'toggled', 'type', 'value']
})
export class NexusToggle {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusTooltip extends Components.NexusTooltip {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['allowClick', 'attrId', 'placement']
})
@Component({
  selector: 'nexus-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['allowClick', 'attrId', 'placement']
})
export class NexusTooltip {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusTooltipContent extends Components.NexusTooltipContent {
  /**
   * Internal event for closing tooltip content @param positions,@param id
   */
  _closeTooltip: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined,
  methods: ['_show']
})
@Component({
  selector: 'nexus-tooltip-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusTooltipContent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['_closeTooltip']);
  }
}


export declare interface NexusTooltipTrigger extends Components.NexusTooltipTrigger {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-tooltip-trigger',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusTooltipTrigger {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusTree extends Components.NexusTree {}

@ProxyCmp({
  defineCustomElementFn: undefined,
  inputs: ['open']
})
@Component({
  selector: 'nexus-tree',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['open']
})
export class NexusTree {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusTreeContent extends Components.NexusTreeContent {}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-tree-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusTreeContent {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface NexusTreeTrigger extends Components.NexusTreeTrigger {
  /**
   * Private event fired when the tree is toggled 
   */
  _toggleTree: EventEmitter<CustomEvent<any>>;

}

@ProxyCmp({
  defineCustomElementFn: undefined
})
@Component({
  selector: 'nexus-tree-trigger',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>'
})
export class NexusTreeTrigger {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['_toggleTree']);
  }
}
