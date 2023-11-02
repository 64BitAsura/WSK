/* eslint-disable complexity */
/**
 * src/components/nexus-stacked-bar-chart/nexus-stacked-bar-chart.tsx
 */
import { Component, h, Prop, Element, Event, EventEmitter, Listen } from '@stencil/core';
import isArray from 'lodash/isArray';
import reverse from 'lodash/reverse';
import uniq from 'lodash/uniq';
import { event, max } from 'd3';
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleBand, scaleOrdinal, scaleLinear } from 'd3-scale';
import {
  schemeCategory10,
  schemeAccent,
  schemeDark2,
  schemePaired,
  schemePastel1,
  schemePastel2,
  schemeSet1,
  schemeSet2,
  schemeSet3,
  schemeTableau10
} from 'd3-scale-chromatic';
import { Selection, select } from 'd3-selection';
import { stack, stackOrderReverse } from 'd3-shape';
import {
  orientationProp,
  colorSchemeProp,
  strokeProp,
  axisTickFontFamilyProp,
  axisTickFontSizeProp,
  strokeWidthProp,
  legendFontSizeProp,
  TickFormatProp
} from '../utils/chartsTypes';

// utilities
import {
  calculateAxisClass,
  calculateAxisLabelClass,
  calculateLegendLabelClass,
  t50,
  t100,
  tickFormat
} from '../utils';
import { NexusStackedBarChartProps } from '../interfaces/nexus-stacked-bar-chart';

@Component({
  tag: 'nexus-stacked-bar-chart',
  styleUrl: 'nexus-stacked-bar-chart.scss',
  shadow: true
})
export class NexusStackedBarChart {
  colorScale: any;
  colorSchemes: any = {
    category10: schemeCategory10,
    accent: schemeAccent,
    dark2: schemeDark2,
    paired: schemePaired,
    pastel1: schemePastel1,
    pastel2: schemePastel2,
    set1: schemeSet1,
    set2: schemeSet2,
    set3: schemeSet3,
    tableau10: schemeTableau10,
    black: ['#000000'],
    gray: ['#888888']
  };

  // <g>
  gCanvas: Selection<Element, any, HTMLElement, any>;
  gGrid: Selection<Element, any, HTMLElement, any>;
  gLegend: Selection<Element, any, HTMLElement, any>;
  gXAxis: Selection<Element, any, HTMLElement, any>;
  gYAxis: Selection<Element, any, HTMLElement, any>;
  // end </g>

  layerOpacity: number = 0.9;
  layers: any;
  linearScale: any;
  ordinalScale: any;
  stackLayout: any;
  svg: Selection<Element, any, HTMLElement, any>;
  tooltipDiv: Selection<Element, any, HTMLElement, any>;
  xAxis: Selection<Element, any, HTMLElement, any>;
  xLabelPadding: number = 30;
  yAxis: Selection<Element, any, HTMLElement, any>;
  yLabelPadding: number = 30;

  @Element() private chartElement: HTMLElement;

  /**
   * label font size
   */
  @Prop() axisLabelFontSize: number = 14;
  /**
   * Tick font family. Valid values are 'interstate', 'sans', 'serif' and 'monospace'.
   */
  @Prop() axisTickFontFamily: axisTickFontFamilyProp = 'interstate';
  /**
   * Tick font size. Valid values are 8, 9, 10, 12.
   */
  @Prop() axisTickFontSize: axisTickFontSizeProp;
  /**
   * Bar edge color. Valid values are 'transparent', 'black', 'white' and 'gray'.
   */
  @Prop({ mutable: true }) stroke: strokeProp = 'transparent';
  /**
   * The Prop 'barStroke' is deprecated. Kindly use the 'stroke' Prop.
   */
  @Prop() barStroke: strokeProp;
  /**
   * Bar stroke width. Valid values are 'none', 1, 2 and 5.
   */
  @Prop({ mutable: true }) strokeWidth: strokeWidthProp;
  /**
   * The Prop 'barStrokeWidth' is deprecated. Kindly use the 'strokeWidth' Prop.
   */
  @Prop() barStrokeWidth: strokeWidthProp;
  /**
   * Canvas Height
   */
  @Prop({
    reflect: true,
    mutable: true
  })
  height: number;

  /**
   * Chart color scheme. Uses <a href="https://github.com/d3/d3-scale-chromatic">d3-scale-chromatic</a> themes.
   */
  @Prop() canvasHeight: number;
  /**
   * Canvas Width
   */
  @Prop({
    reflect: true,
    mutable: true
  })
  width: number;

  /**
   * The Prop 'canvasWidth' is deprecated. Kindly use the 'width' Prop.
   */
  @Prop() canvasWidth: number;
  /**
   * Nexus stacked bar chart props
   */
  @Prop({ mutable: true }) data: NexusStackedBarChartProps = [];
  /**
   * The Prop 'chartData' is deprecated. Kindly use the 'data' Prop.
   */
  @Prop() chartData: NexusStackedBarChartProps = [];
  /**
   * Chart unique Identifier
   */
  @Prop({ mutable: true }) attrId: string = '';
  /**
   * The Prop 'chartId' is deprecated. Kindly use the 'attrId' Prop.
   */
  @Prop() chartId: string;
  /**
   * Chart color scheme. Valid values are 'category10', 'accent', "paired", 'set1', 'set2', 'set3', 'black' and 'gray'.
   */
  @Prop() colorScheme: colorSchemeProp = 'category10';
  /**
   * Show/Hide grid lines. Default value is 'false'.
   */
  @Prop() gridlines: boolean = false;
  /**
   * Hide X-Axis. Default value is 'false'.
   */
  @Prop() hideXAxis: boolean = false;
  /**
   * Hide X-Ticks. Default value is 'false'.
   */
  @Prop() hideXTicks: boolean = false;
  /**
   * Hide Y-Axis. Default value is 'false'.
   */
  @Prop() hideYAxis: boolean = false;
  /**
   * Hide X-Ticks. Default value is 'false'.
   */
  @Prop() hideYTicks: boolean = false;
  /**
   * Invert background colors. Default value is 'false'
   */
  @Prop() inverse: boolean = false;
  /**
   * Show/Hide legend. Default value is 'true'.
   */
  @Prop() legend: boolean = true;
  /**
   * Set legend font size. Default value is 12, Valid values are 10, 14
   */
  @Prop() legendFontSize: legendFontSizeProp;
  /**
   * Set legend width.
   */
  @Prop() legendWidth: number;
  /**
   * Set linear domain. Default value is 'absolute'. Valid values are 'absolute' and 'percentage'.
   */
  @Prop() linearDomain: string = 'absolute';
  /**
   * Set linear metric string to key from your data set. For example: dataSet = [{ make: 'Volkswagen', model: 'ID4', year: '2020', }]  Then linearMetric = 'make'.
   */
  @Prop() linearMetric: string;
  /**
   * Set linear tick format. Valid values are 'USD', 'localestring', 'localestring1d', 'localestring2d', 'percent', 'percent1d', 'percent2d', 'YYYY', 'M/D/YYYY', 'M/D/YY', 'MM/DD/YYYY', 'MM YYYY', 'MMM D, YYYY', 'ISODATE', 'raw'
   */
  @Prop({ mutable: true }) linearFormat: TickFormatProp;
  /**
   * The Prop 'linearTickFormat' is deprecated. Kindly use the 'linearFormat' Prop.
   */
  @Prop() linearTickFormat: TickFormatProp;
  /**
   * Canvas margin bottom offset. Default value is 25.
   */
  @Prop({ reflect: true }) marginBottom: number = 25;
  /**
   * Canvas margin left offset. Default value is 25.
   */
  @Prop({ reflect: true }) marginLeft: number = 25;
  /**
   * Canvas margin right offset. Default value is 25.
   */
  @Prop({ reflect: true }) marginRight: number = 25;
  /**
   * Canvas margin top offset. Default value is 25.
   */
  @Prop({ reflect: true }) marginTop: number = 25;
  /**
   * Maximum Bar width. Default value is 75.
   */
  @Prop() maxBarWidth: number = 75;
  /**
   * Set value metric string to key from your data set. For example: dataSet = [{ make: 'Volkswagen', model: 'ID4', year: '2020', }]  Then valueMetric = 'make'.
   */
  @Prop({ mutable: true }) valueMetric: string = 'label';
  /**
   * The Prop 'ordinalMetric' is deprecated. Kindly use the 'valueMetric' Prop.
   */
  @Prop() ordinalMetric: string;
  /**
   * Orientation of the graph. Default value is 'vertical'. Valid values are 'horizontal' and 'vertical'.
   */
  @Prop() orientation: orientationProp = 'vertical';
  /**
   * Set legend metric string to key from your data set. For example: dataSet = [{ make: 'Volkswagen', model: 'ID4', year: '2020', }]  Then legendMetric = 'make'.
   */
  @Prop({ mutable: true }) legendMetric: string;
  /**
   * The Prop 'seriesMetric' is deprecated. Kindly use the 'legendMetric' Prop.
   */
  @Prop() seriesMetric: string;
  /**
   * Should show/hide tooltips. Default value is 'true'.
   */
  @Prop() tooltips: boolean = true;
  /**
   * Label on x-axis. Default value is ''.
   */
  @Prop() xLabel: string = '';
  /**
   * X-axis tick size.
   */
  @Prop() xTickSize: number;
  /**
   * Label on y-axis. Default value is ''.
   */
  @Prop() yLabel: string = '';
  /**
   * Y-axis tick size.
   */
  @Prop() yTickSize: number;

  /**
   * On load even on loading stacked bar chart ('nexusStackedBarChartLoaded').
   */
  @Event({
    eventName: 'nexusStackedBarChartLoaded',
    bubbles: true,
    composed: true
  })
  componentLoaded: EventEmitter;

  //
  // LIFECYCLE
  //
  componentDidLoad(): void {
    // Deprecated Props
    if (this.stroke === 'transparent' && this.barStroke) {
      this.stroke = this.barStroke;
    }
    if (!this.strokeWidth && this.barStrokeWidth) {
      this.strokeWidth = this.barStrokeWidth;
    }
    if (!this.height && this.canvasHeight) {
      this.height = this.canvasHeight;
    }
    if (!this.width && this.canvasWidth) {
      this.width = this.canvasWidth;
    }
    if (this.data.length === 0 && this.chartData.length !== 0) {
      this.data = this.chartData;
    }
    if (this.attrId === '' && this.chartId) {
      this.attrId = this.chartId;
    }
    if (!this.linearFormat && this.linearTickFormat) {
      this.linearFormat = this.linearTickFormat;
    }
    if (this.valueMetric === 'label' && this.ordinalMetric) {
      this.valueMetric = this.ordinalMetric;
    }
    if (!this.legendMetric && this.seriesMetric) {
      this.legendMetric = this.seriesMetric;
    }

    this.svg = select(this.chartElement.shadowRoot.querySelector('svg.nexus-stacked-bar-chart'));

    this.gCanvas = this.svg.append('svg:g').attr('class', 'canvas');

    this.gGrid = this.gCanvas.append('svg:g').attr('class', 'grid');

    this.gLegend = this.svg.append('svg:g').attr('class', 'legend');

    this.gXAxis = this.gCanvas
      .append('svg:g')
      .attr('class', calculateAxisClass(this.inverse, this.axisTickFontFamily))
      .style('opacity', 0)
      .style('font-size', `${this.axisTickFontSize}px`);

    this.gYAxis = this.gCanvas
      .append('svg:g')
      .attr('class', calculateAxisClass(this.inverse, this.axisTickFontFamily))
      .style('opacity', 0)
      .style('font-size', `${this.axisTickFontSize}px`);

    // tooltip <div>
    this.tooltipDiv = select(this.chartElement.shadowRoot.querySelector('#tooltip'))
      .attr('class', 'tooltip')
      .style('opacity', 0);

    // responsive
    if (
      this.chartElement.parentElement.getBoundingClientRect().width > 50 &&
      this.chartElement.parentElement.getBoundingClientRect().height > 50
    ) {
      this.width = this.chartElement.parentElement.getBoundingClientRect().width;
      this.height = this.chartElement.parentElement.getBoundingClientRect().height;
    }

    // basic X/Y axis positions which will not change
    this.xAxis = axisBottom();
    this.yAxis = axisLeft();

    // color scale
    this.colorScale = scaleOrdinal();

    // emit component loaded event
    this.componentLoaded.emit({
      component: 'nexus-stacked-bar-chart',
      attrId: this.attrId
    });
  }

  componentDidUpdate(): void {
    if (this.isValiddata()) {
      this.draw();
    }
  }

  //
  // LISTENERS
  //
  @Listen('resize', { target: 'window' })
  handleWindowResize() {
    if (this.isValiddata()) {
      this.width = this.chartElement.parentElement.getBoundingClientRect().width;
      this.draw();
    }
  }

  //
  // CLASS METHODS
  //

  /**
   * @function
   * Call axis generators for horizontal orientation
   */
  callHorizontalAxes(): void {
    // X = linear
    this.gXAxis
      .style('font-size', `${this.axisTickFontSize}px`)
      .attr('class', calculateAxisClass(this.inverse, this.axisTickFontFamily))
      .attr('transform', () => {
        if (this.data.length === 0) {
          return;
        }

        const xCoordinate = this.marginLeft + this.yLabelAdjustment();
        const yCoordinate = this.height - this.marginBottom - this.xLabelAdjustment();

        return `translate(${xCoordinate}, ${yCoordinate})`;
      })
      .style('opacity', () => (this.hideXAxis || this.data.length === 0 ? 0 : 1))
      .call(this.xAxis);

    // Y = ordinal
    this.gYAxis
      .style('font-size', `${this.axisTickFontSize}px`)
      .attr('class', calculateAxisClass(this.inverse, this.axisTickFontFamily))
      .attr('transform', () => {
        if (this.data.length === 0) {
          return;
        }

        const xCoordinate = this.marginLeft + this.yLabelAdjustment();
        const yCoordinate = this.linearScale(0);

        return `translate(${xCoordinate}, ${yCoordinate})`;
      })
      .style('opacity', () => (this.hideYAxis || this.data.length === 0 ? 0 : 1))
      .call(this.yAxis);
  }

  /**
   * @function
   * Call axis generators for vertical (default) orientation
   */
  callVerticalAxes(): void {
    // X = ordinal
    this.gXAxis
      .style('font-size', `${this.axisTickFontSize}px`)
      .attr('class', calculateAxisClass(this.inverse, this.axisTickFontFamily))
      .attr('transform', () => {
        if (this.data.length === 0) {
          return;
        }

        const xCoordinate = this.marginLeft;
        const yCoordinate = this.linearScale(0);

        return `translate(${xCoordinate}, ${yCoordinate})`;
      })
      .style('opacity', () => (this.hideXAxis || this.data.length === 0 ? 0 : 1))
      .call(this.xAxis);

    // Y = linear
    this.gYAxis
      .style('font-size', `${this.axisTickFontSize}px`)
      .attr('class', calculateAxisClass(this.inverse, this.axisTickFontFamily))
      .attr('transform', () => {
        if (this.data.length === 0) {
          return;
        }

        const xCoordinate = this.marginLeft + this.yLabelAdjustment();
        const yCoordinate = 0;

        return `translate(${xCoordinate}, ${yCoordinate})`;
      })
      .style('opacity', () => (this.hideYAxis || this.data.length === 0 ? 0 : 1))
      .call(this.yAxis);
  }

  /**
   * @function
   * Wrapper function for individual drawing methods
   */
  draw(): void {
    this.setColorScale();
    if (this.orientation === 'horizontal') {
      this.setHorizontalScales();
      this.callHorizontalAxes();
      this.handleHorizontalBars();
    } else {
      this.setVerticalScales();
      this.callVerticalAxes();
      this.handleVerticalBars();
    }
    this.handleGridlines();
    this.handleAxisLabels();
    this.handleLegend();
  }

  /**
   * @function
   * Get a unique array of all ordinal keys
   */
  getOrdinalKeys(): Array<string> {
    return uniq(this.data.map((metric) => metric[this.valueMetric]).sort());
  }

  /**
   * @function
   * Get a unique list of all series keys
   */
  getSeriesKeys(): Array<string> {
    return uniq(this.data.map((metric) => metric[this.legendMetric]).sort());
  }

  /**
   * @function
   * Optional labels for X/Y axes
   */
  handleAxisLabels(): void {
    // X-axis
    // take into account left/right margins and
    // possible Y-axis label padding
    if (this.isValidXLabel()) {
      this.gCanvas.selectAll('text.x-axis-label').remove();

      this.gCanvas
        .append('text')
        .attr('class', calculateAxisLabelClass(this.inverse, 'x'))
        .style('text-anchor', 'middle')
        .style('font-size', `${this.axisLabelFontSize}px`)
        .text(this.xLabel)
        .attr('transform', () => {
          // x depends on orientation
          let xCoordinate;
          xCoordinate = this.marginLeft + this.yLabelAdjustment();
          if (this.orientation === 'horizontal') {
            xCoordinate += (this.linearScale.range()[1] - this.linearScale.range()[0]) / 2;
          } else {
            xCoordinate += (this.ordinalScale.range()[1] - this.ordinalScale.range()[0]) / 2;
          }
          const yCoordinate = this.height - this.xLabelPadding / 2;

          return `translate(${xCoordinate}, ${yCoordinate})`;
        });
    } else {
      this.gCanvas.selectAll('text.x-axis-label').transition(t100).style('opacity', 0).remove();
    }

    // Y-axis
    // take into account top/bottom margins
    // and possible X axis label padding
    if (this.isValidYLabel()) {
      this.gCanvas.selectAll('text.y-axis-label').remove();

      this.gCanvas
        .append('text')
        .attr('class', calculateAxisLabelClass(this.inverse, 'y'))
        .style('text-anchor', 'middle')
        .style('font-size', `${this.axisLabelFontSize}px`)
        .text(this.yLabel)
        .attr('transform', () => {
          const xCoordinate = this.yLabelPadding / 2;
          const yCoordinate =
            this.marginTop + (this.height - this.marginBottom - this.marginTop - this.xLabelAdjustment()) / 2;

          return `translate(${xCoordinate}, ${yCoordinate}), rotate(-90)`;
        });
    } else {
      this.gCanvas.selectAll('text.y-axis-label').transition(t100).style('opacity', 0).remove();
    }
  }

  /**
   * @function
   * Mouse event handler for layered bars
   */
  handleBarMouseEvent(mouseOpt, _dimension): void {
    const barNode = this.gCanvas
      .selectAll('rect.bar')
      .filter((entry) => _dimension === entry)
      .node();

    if (mouseOpt === 'mouseover') {
      barNode.style.opacity = 1;
      const series = barNode.parentNode.getAttribute('series') || '';
      const diff = _dimension[1] - _dimension[0];

      this.tooltipDiv
        .style('left', () => `${event.pageX}px`)
        .style('top', () => `${event.pageY}px`)
        .style('opacity', () => (this.tooltips ? 0.9 : 0))
        .html(
          () => `<div class="key">
            ${series}
            </div>
            <div class="value">
            ${tickFormat(diff, this.linearFormat)}
            </div>`
        );
    }

    if (mouseOpt === 'mouseout') {
      barNode.style.opacity = this.layerOpacity;
      this.tooltipDiv.style('opacity', 0).html('');
    }

    if (mouseOpt === 'mousemove') {
      this.tooltipDiv.style('left', () => `${event.pageX}px`).style('top', () => `${event.pageY + 15}px`);
    }
  }

  /**
   * @function
   * Render grid lines, depending on orientation
   * Scales must be set before this will work properly and it should be called
   * before drawing bars, due to z-index nature of SVG rendering
   */
  handleGridlines(): void {
    /**
     * !gridlines
     */
    if (!this.gridlines) {
      this.gGrid.selectAll('line.gridline').remove();

      return;
    }

    const gridSelection = this.gGrid.selectAll('line.gridline').data(this.linearScale.ticks());

    gridSelection.exit().remove();

    const sel = gridSelection
      .enter()
      .append('svg:line')
      .attr('class', 'gridline')
      .style('stroke', '#bbb')
      .style('stroke-width', 0.5)
      .style('stroke-dasharray', '7,3')
      .style('opacity', 0);

    if (this.orientation === 'horizontal') {
      sel
        .merge(gridSelection)
        .attr('x1', (data) => this.marginLeft + this.yLabelAdjustment() + this.linearScale(data))
        .attr('x2', (data) => this.marginLeft + this.yLabelAdjustment() + this.linearScale(data))
        .attr('y1', this.marginTop)
        .transition(t100)
        .style('opacity', 1)
        .attr('y2', () => this.height - this.marginBottom - this.xLabelAdjustment());
    } else {
      sel
        .merge(gridSelection)
        .attr('x1', () => this.marginLeft + this.yLabelAdjustment())
        .attr('y1', (data) => this.linearScale(data))
        .attr('y2', (data) => this.linearScale(data))
        .transition(t100)
        .style('opacity', 1)
        .attr('x2', () => this.width - this.marginRight - this.legendAdjustment());
    }
  }

  /**
   * @function
   * Draw bars for horizontal orientation
   */
  handleHorizontalBars(): void {
    //
    // layers
    //
    const layerSel = this.gCanvas.selectAll('.layer').data(this.layers);

    layerSel.exit().remove();

    const mergedLayers = layerSel
      .enter()
      .append('g')
      .attr('class', 'layer')
      .merge(layerSel)
      // series attribute must be set AFTER merge
      // to handle potential changes in linear and/or value metric
      .attr('series', (data) => data.key)
      .style('fill', (data) => this.colorScale(data.key));

    //
    // bars
    //
    const barSel = mergedLayers.selectAll('rect.bar').data((data) => data);

    barSel.exit().transition(t50).style('opacity', 0).remove();

    barSel
      .enter()
      .append('rect')
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('class', 'bar')
      .style('opacity', 0)
      .on('mouseover', (data) => this.handleBarMouseEvent('mouseover', data))
      .on('mouseout', (data) => this.handleBarMouseEvent('mouseout', data))
      .on('mousemove', (data) => this.handleBarMouseEvent('mousemove', data))
      .merge(barSel)
      .style('stroke', this.stroke)
      .style('stroke-width', this.strokeWidth)
      .transition(t100)
      .attr('x', (data) => this.marginLeft + this.yLabelAdjustment() + this.linearScale(data[0]))
      .attr(
        'y',
        (detail) =>
          this.ordinalScale(detail.data[this.valueMetric]) +
          this.ordinalScale.bandwidth() / 2 -
          Math.min(this.maxBarWidth, this.ordinalScale.bandwidth()) / 2
      )
      .attr('height', () => Math.min(this.maxBarWidth, this.ordinalScale.bandwidth()))
      .attr('width', (data) => this.linearScale(data[1]) - this.linearScale(data[0]))
      .transition(t100)
      .style('opacity', this.layerOpacity);
  }

  /**
   * @function
   * Optional legend
   */
  handleLegend(): void {
    const lineIncrement = 25;

    // adjust position of "gLegend"
    this.gLegend.attr('transform', () => {
      const xCoordinate = this.width - this.legendWidth;
      const yCoordinate = this.marginTop;

      return `translate(${xCoordinate}, ${yCoordinate})`;
    });

    // legend is in play
    if (this.legend) {
      //
      // legend lines
      //
      const lineSel = this.gLegend.selectAll('line.legend-line').data(this.layers);

      lineSel.exit().remove();

      lineSel
        .enter()
        .append('line')
        .attr('class', 'legend-line')
        .attr('x1', 0)
        .attr('x2', 10)
        .style('opacity', 0)
        .style('stroke-width', 3)
        .merge(lineSel)
        .transition(t100)
        .attr('y1', (_detail, index) => index * lineIncrement)
        .attr('y2', (_detail, index) => index * lineIncrement)
        .style('stroke', (detail) => this.colorScale(detail.key))
        .transition(t100)
        .style('opacity', this.layerOpacity);

      //
      // legend text
      //
      const textSel = this.gLegend.selectAll('text.legend-label').data(this.layers);

      textSel.exit().remove();

      textSel
        .enter()
        .append('text')
        .style('opacity', 0)
        .on('mouseover', (data) => {
          this.gCanvas
            .selectAll('.layer')
            .filter((entry) => data.key === entry.key)
            .selectAll('rect.bar')
            .style('opacity', 1);

          this.gCanvas
            .selectAll('.layer')
            .filter((entry) => data.key !== entry.key)
            .selectAll('rect.bar')
            .style('opacity', 0.3);
        })
        .on('mouseout', () => {
          this.gCanvas.selectAll('.layer').selectAll('rect.bar').style('opacity', this.layerOpacity);
        })
        .merge(textSel)
        .attr('class', calculateLegendLabelClass(this.inverse))
        .style('font-size', `${this.legendFontSize}px`)
        .transition(t100)
        .text((data) => data.key)
        .attr('x', 15)
        .attr('y', (_detail, index) => index * lineIncrement + 4)
        .transition(t100)
        .style('opacity', this.layerOpacity);
    } else {
      this.gLegend.selectAll('line.legend-line').remove();
      this.gLegend.selectAll('text').remove();
    }
  }

  /**
   * @function
   * Draw bars, vertical (default) orientation
   */
  handleVerticalBars(): void {
    const layerSel = this.gCanvas.selectAll('.layer').data(this.layers);

    layerSel.exit().remove();

    const mergedLayers = layerSel
      .enter()
      .append('g')
      .attr('class', 'layer')
      .merge(layerSel)
      // series attribute must be set AFTER merge
      // to handle potential changes in linear and/or value metric
      .attr('series', (data) => data.key)
      .style('fill', (data) => this.colorScale(data.key));

    const barSel = mergedLayers.selectAll('rect.bar').data((data) => data);

    barSel.exit().transition(t50).style('opacity', 0).remove();

    barSel
      .enter()
      .append('rect')
      .attr('rx', 3)
      .attr('ry', 3)
      .attr('class', 'bar')
      .style('opacity', 0)
      .on('mouseover', (data) => this.handleBarMouseEvent('mouseover', data))
      .on('mouseout', (data) => this.handleBarMouseEvent('mouseout', data))
      .on('mousemove', (data) => this.handleBarMouseEvent('mousemove', data))
      .merge(barSel)
      .style('stroke', this.stroke)
      .style('stroke-width', this.strokeWidth)
      .transition(t100)
      .attr(
        'x',
        (detail) =>
          this.marginLeft +
          this.ordinalScale(detail.data[this.valueMetric]) +
          this.ordinalScale.bandwidth() / 2 -
          Math.min(this.maxBarWidth, this.ordinalScale.bandwidth()) / 2
      )
      .attr('y', (data) => this.linearScale(data[1]))
      .attr('height', (data) => this.linearScale(data[0]) - this.linearScale(data[1]))
      .attr('width', () => Math.min(this.maxBarWidth, this.ordinalScale.bandwidth()))
      .transition(t100)
      .style('opacity', this.layerOpacity);
  }

  /**
   * @function
   * "data" should be an array
   */
  isValiddata(): boolean {
    return (
      isArray(this.data) &&
      this.data.length > 0 &&
      this.linearMetric in this.data[0] &&
      this.valueMetric in this.data[0] &&
      this.legendMetric in this.data[0]
    );
  }

  isValidXLabel(): boolean {
    return this.xLabel && this.xLabel.length > 0 && !this.hideXAxis;
  }

  isValidYLabel(): boolean {
    return this.yLabel && this.yLabel.length > 0 && !this.hideYAxis;
  }

  /**
   * @function
   * Calculate potential X adjustment for legend
   */
  legendAdjustment(): number {
    return this.legend ? this.legendWidth : 0;
  }

  /**
   * @function
   * Setting the color scale to use for bars
   */
  setColorScale(): void {
    if (this.colorSchemes[this.colorScheme]) {
      this.colorScale.range(this.colorSchemes[this.colorScheme]);
    } else {
      this.colorScale.range(schemeCategory10);
    }
  }

  /**
   * @function
   * Calculate scales and axis generators for horizontal layout
   * X-axis = linear
   * Y-axis = ordinal
   */
  setHorizontalScales(): void {
    const series = this.toSeriesFormat();
    this.layers = this.toStackFormat();

    // X = linear
    this.linearScale = scaleLinear()
      .domain([0, max(series, (data) => data.total)])
      .range([0, this.width - this.marginLeft - this.marginRight - this.legendAdjustment() - this.yLabelAdjustment()])
      .nice();

    this.xAxis
      .scale(this.linearScale)
      .tickSize(this.xTickSize)
      .tickValues(this.hideXTicks ? [] : null)
      .tickFormat((data) => tickFormat(data, this.linearFormat));

    // Y = ordinal
    this.ordinalScale = scaleBand()
      .domain(reverse(this.getOrdinalKeys()))
      .rangeRound([this.height - this.marginBottom - this.xLabelAdjustment(), this.marginTop])
      .padding(0.1);

    this.yAxis
      .scale(this.ordinalScale)
      .tickSize(this.yTickSize)
      .tickValues(this.hideYTicks ? [] : null)
      .tickFormat((data) => tickFormat(data, 'raw'));
  }

  /**
   * @function
   * Calculate scales and axis generators for vertical (default) orientation
   */
  setVerticalScales(): void {
    const series = this.toSeriesFormat();
    this.layers = this.toStackFormat();

    // X = ordinal
    this.ordinalScale = scaleBand()
      .domain(this.getOrdinalKeys())
      .rangeRound([this.yLabelAdjustment(), this.width - this.marginLeft - this.marginRight - this.legendAdjustment()])
      .padding(0.1);

    this.xAxis
      .scale(this.ordinalScale)
      .tickSize(this.xTickSize)
      .tickValues(this.hideXTicks ? [] : null)
      .tickFormat((data) => tickFormat(data, 'raw'));

    // Y = linear
    this.linearScale = scaleLinear()
      .domain([0, max(series, (data) => data.total)])
      .range([this.height - this.marginBottom - this.xLabelAdjustment(), this.marginTop])
      .nice();

    this.yAxis
      .scale(this.linearScale)
      .tickSize(this.yTickSize)
      .tickValues(this.hideYTicks ? [] : null)
      .tickFormat((data) => tickFormat(data, this.linearFormat));
  }

  /**
   * @function
   * Format data into series formatting
   */
  toSeriesFormat(): Array<any> {
    const ret = [];

    this.getOrdinalKeys().forEach((item) => {
      let total;
      total = 0;
      const obj = { [`${this.valueMetric}`]: item };

      this.data
        .filter((fPos) => fPos[this.valueMetric] === item)
        .forEach((entry) => {
          const kIdx = entry[this.legendMetric];
          obj[`${kIdx}`] = entry[this.linearMetric];

          total += entry[this.linearMetric];
        });

      ret.push(Object.assign({}, obj, { total }));
    });

    // converting absolute values to % values
    if (this.linearDomain === 'percent') {
      ret.forEach((metric) => {
        Object.keys(metric).forEach((keys) => {
          if (keys !== 'total' && keys !== this.valueMetric) {
            metric[`${keys}`] = metric[keys] / metric.total;
            metric[`${keys}`] *= 100;
          }
        });
        metric.total = 100;
      });
    }

    return ret;
  }

  /**
   * @function
   * Convert data to a format that can be consumed
   * by the D3.js stack layout function
   */
  toStackFormat(): Array<any> {
    return stack().keys(this.getSeriesKeys()).order(stackOrderReverse)(this.toSeriesFormat());
  }

  xLabelAdjustment(): number {
    return this.isValidXLabel() ? this.xLabelPadding : 0;
  }

  yLabelAdjustment(): number {
    return this.isValidYLabel() ? this.yLabelPadding : 0;
  }

  render() {
    return (
      <div>
        <div id="tooltip"></div>
        <svg
          id={this.attrId}
          version="1.1"
          baseProfile="full"
          width={this.width}
          height={this.height}
          class="nexus-stacked-bar-chart"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
      </div>
    );
  }
}
