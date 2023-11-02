import { Component, h, Prop } from '@stencil/core';
import { format as d3Format } from 'd3-format';
import { select as d3Select } from 'd3-selection';
import { getConfig, DEFAULT_PROPS, updateConfig, defaultSegmentValueFormatter } from './core/config';
import { render, update } from './core/render';
// import { CustomSegmentLabelPosition, Transition } from './core/enums';

@Component({
  tag: 'nexus-gauge-chart',
  shadow: true,
  styleUrl: 'nexus-gauge-chart.scss'
})
export class NexusGaugeChart {
  @Prop() value: number;
  @Prop() minValue: number;
  @Prop() maxValue: number;

  /**
   * Tracks if the component should update as the whole or just animate the value default will just animate the value after initialization/mounting
   */
  @Prop() forceRender: boolean;

  @Prop() width: number;
  @Prop() height: number;

  /**
   * text padding horizontal
   */
  @Prop() paddingHorizontal: number;

  /**
   * text padding vertical
   */
  @Prop() paddingVertical: number;

  /**
   * width/height dimension ... default "px"
   */
  @Prop() dimensionUnit: string;
  @Prop() fluidWidth: boolean;

  /**
   * segments to show in the gauge
   */
  @Prop() segments: number;

  /**
   * maximum number of labels to be shown
   */
  @Prop() maxSegmentLabels?: number;

  /**
   * custom segment points to create unequal segments
   */
  @Prop() customSegmentStops: string | any[];

  /**
   * custom segment labels that places label within the segment
   */
  @Prop() customSegmentLabels: string | any[];

  /**
   * color strings
   */
  @Prop() needleColor: string;
  @Prop() startColor: string;
  @Prop() endColor: string;

  /**
   * custom segment colors
   */
  @Prop() segmentColors: string | any[];

  /**
   * needle transition type and duration
   */
  @Prop() needleTransition: string;
  @Prop() needleTransitionDuration: number;
  @Prop() needleHeightRatio: number;

  @Prop() ringWidth: number;
  @Prop() textColor: string;

  /**
   * d3 format identifier is generally a string; default "" (empty string)
   */
  @Prop() valueFormat: string;
  /**
   * segment value formatter; default: value => value
   */
  @Prop() segmentValueFormatter: Function;

  /**
   * value text format
   */
  @Prop() currentValueText: string;

  /**
   * placeholder style for current value
   */
  @Prop() currentValuePlaceholderStyle: string;

  /**
   * font sizes
   */
  @Prop() labelFontSize: string;
  @Prop() valueTextFontSize: string;
  @Prop() valueTextFontWeight: string;

  /**
   * accessiblity props
   */
  @Prop() svgAriaLabel: string;

  private gaugeDiv: any;
  private d3Refs;
  private config;
  private props;

  arrayDataWatcher(newValue: any[] | string) {
    let value;
    if (typeof newValue === 'string') {
      value = JSON.parse(newValue);
    } else {
      value = newValue;
    }

    return value;
  }

  // eslint-disable-next-line complexity
  constructor() {
    // list of d3 refs to share within the components
    this.d3Refs = {
      pointer: false,
      currentValueText: false
    };
    this.props = {
      value: this.value || DEFAULT_PROPS.value,
      minValue: this.minValue || DEFAULT_PROPS.minValue,
      maxValue: this.maxValue || DEFAULT_PROPS.maxValue,

      forceRender: this.forceRender || DEFAULT_PROPS.forceRender,

      width: this.width || DEFAULT_PROPS.width,
      height: this.height || DEFAULT_PROPS.height,
      paddingHorizontal: this.paddingHorizontal || DEFAULT_PROPS.paddingHorizontal,
      paddingVertical: this.paddingVertical || DEFAULT_PROPS.paddingVertical,

      fluidWidth: this.fluidWidth || DEFAULT_PROPS.fluidWidth,
      dimensionUnit: this.dimensionUnit || DEFAULT_PROPS.dimensionUnit,

      // segments to show in the gauge
      segments: this.segments || DEFAULT_PROPS.segments,
      // maximum segment label to be shown
      maxSegmentLabels: this.maxSegmentLabels || DEFAULT_PROPS.maxSegmentLabels,
      customSegmentStops: this.arrayDataWatcher(this.customSegmentStops) || DEFAULT_PROPS.customSegmentStops,

      // custom segment labels
      customSegmentLabels: this.arrayDataWatcher(this.customSegmentLabels) || DEFAULT_PROPS.customSegmentLabels,

      // color strings
      needleColor: this.needleColor || DEFAULT_PROPS.needleColor,
      startColor: this.startColor || DEFAULT_PROPS.startColor,
      endColor: this.endColor || DEFAULT_PROPS.endColor,
      // custom segment colors; by default off
      segmentColors: this.arrayDataWatcher(this.segmentColors) || DEFAULT_PROPS.segmentColors,

      // needle transition type and duration
      needleTransition: this.needleTransition || DEFAULT_PROPS.needleTransition,
      needleTransitionDuration: this.needleTransitionDuration || DEFAULT_PROPS.needleTransitionDuration,
      needleHeightRatio: this.needleHeightRatio || DEFAULT_PROPS.needleHeightRatio,

      ringWidth: this.ringWidth || DEFAULT_PROPS.ringWidth,

      // text color (for both showing current value and segment values)
      textColor: this.textColor || DEFAULT_PROPS.textColor,
      valueFormat: this.valueFormat || DEFAULT_PROPS.valueFormat,
      // function to customize value
      // this is applied after d3Format(valueFormat)
      segmentValueFormatter: this.segmentValueFormatter || DEFAULT_PROPS.segmentValueFormatter,

      // value text string format; by default it just shows the value
      // takes es6 template string as input with a default ${value}
      currentValueText: this.currentValueText || DEFAULT_PROPS.currentValueText,
      // specifies the style of the placeholder for current value
      // change it some other format like "#{value}" and use it in current value text as => "Current Value:this.// change it some other format like "#{value}" and use it in current value text as => "Current Value || DEFAULT_PROPS.// change it some other format like "#{value}" and use it in current value text as => "Current Value,
      currentValuePlaceholderStyle: this.currentValuePlaceholderStyle || DEFAULT_PROPS.currentValuePlaceholderStyle,

      // font sizes (and other styles)
      labelFontSize: this.labelFontSize || DEFAULT_PROPS.labelFontSize,
      valueTextFontSize: this.valueTextFontSize || DEFAULT_PROPS.valueTextFontSize,
      valueTextFontWeight: this.valueTextFontWeight || DEFAULT_PROPS.valueTextFontWeight,

      // Accessibility related props
      svgAriaLabel: this.svgAriaLabel || DEFAULT_PROPS.svgAriaLabel
    };
  }

  componentDidLoad() {
    // render the gauge here
    this.renderGauge();
  }

  componentDidUpdate() {
    // on update, check if 'forceRender' option is present;
    if (this.forceRender) {
      this.renderGauge();
    } else {
      // let us just animate the value of the gauge
      this.updateReadings();
    }
  }

  renderGauge() {
    this.config = getConfig({
      PROPS: this.props,
      parentWidth: this.gaugeDiv.parentNode.clientWidth,
      parentHeight: this.gaugeDiv.parentNode.clientHeight
    });
    // remove existing gauge (if any)
    d3Select(this.gaugeDiv).select('svg').remove();

    this.d3Refs = render({
      container: this.gaugeDiv,
      config: this.config
    });

    update({
      d3Refs: this.d3Refs,
      newValue: this.value,
      config: this.config
    });
  }

  updateReadings() {
    this.config = updateConfig(this.config, {
      labelFormat: d3Format(this.valueFormat || ''),
      // consider custom value formatter if changed
      segmentValueFormatter: this.segmentValueFormatter || defaultSegmentValueFormatter,
      // eslint-disable-next-line no-template-curly-in-string
      currentValueText: this.currentValueText || '${value}'
    });

    // updates the readings of the gauge with the current prop value
    // animates between old prop value and current prop value
    update({
      d3Refs: this.d3Refs,
      newValue: this.value || 0,
      config: this.config
    });
  }

  render = () => <div ref={(ref) => (this.gaugeDiv = ref)} />;
}
