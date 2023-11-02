/* eslint-disable complexity */
import { Component, h, Prop, Element, Event, EventEmitter, Listen } from '@stencil/core';
import isArray from 'lodash/isArray';
import { event, max, min } from 'd3';
import { axisBottom, axisLeft } from 'd3-axis';
import { scaleLinear, scaleOrdinal } from 'd3-scale';
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
import { line } from 'd3-shape';
import {
  axisTickFontFamilyProp,
  colorSchemeProp,
  interpolationProp,
  axisTickFontSizeProp,
  legendFontSizeProp,
  TickFormatProp,
  strokeWidthProp
} from '../utils/chartsTypes';

// utilities
import {
  calculateAxisClass,
  calculateAxisLabelClass,
  calculateLegendLabelClass,
  getInterpolation,
  t25,
  t50,
  t100,
  t250,
  t500,
  tickFormat
} from '../utils';
import { NexusLineChartProps } from '../interfaces/nexus-line-chart';

@Component({
  tag: 'nexus-line-chart',
  styleUrl: 'nexus-line-chart.scss',
  shadow: true
})
export class NexusLineChart {
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

  defaultLineOpacity: number = 0.7;

  // <g> elements
  gCanvas: Selection<Element, any, HTMLElement, any>;
  gGrid: Selection<Element, any, HTMLElement, any>;
  gLegend: Selection<Element, any, HTMLElement, any>;
  gXAxis: Selection<Element, any, HTMLElement, any>;
  gYAxis: Selection<Element, any, HTMLElement, any>;
  // end </g>

  maxTooltipWidth: number = 125;
  svg: Selection<Element, any, HTMLElement, any>;
  tooltipDiv: Selection<Element, any, HTMLElement, any>;
  xAxis: any;
  xLabelPadding: number = 30;
  xMax: number;
  xMin: number;
  xScale: any;
  yAxis: any;
  yLabelPadding: number = 30;
  yMax: number;
  yMin: number;
  yScale: any;

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
   * Canvas Height
   */
  @Prop({
    reflect: true,
    mutable: true
  })
  height: number;

  /**
   * The Prop 'canvasHeight' is deprecated. Kindly use the 'height' Prop.
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
   * Nexus line chart props
   */
  @Prop({ mutable: true }) data: NexusLineChartProps = [];
  /**
   * The Prop 'chartData' is deprecated. Kindly use the 'data' Prop.
   */
  @Prop() chartData: NexusLineChartProps = [];
  /**
   * Chart unique Identifier
   */
  @Prop({ mutable: true }) attrId: string = '';
  /**
   * The Prop 'chartId' is deprecated. Kindly use the 'attrId' Prop.
   */
  @Prop() chartId: string;
  /**
   * Chart color scheme. Uses <a href="https://github.com/d3/d3-scale-chromatic">d3-scale-chromatic</a> themes.
   */
  @Prop() colorScheme: colorSchemeProp;
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
   * Hide Y-Ticks. Default value is 'false'.
   */
  @Prop() hideYTicks: boolean = false;
  /**
   * Interpolation type. Valid values are 'linear', 'basic', 'monotone', 'step-before' and 'step-after'.
   */
  @Prop() interpolation: interpolationProp;
  /**
   * Invert background colors. Default value is 'false'
   */
  @Prop() inverse: boolean = false;
  /**
   * Should display legend. Default value is 'true'.
   */
  @Prop() legend: boolean = true;
  /**
   * Set legend font size. Valid values are 10, 12, 14.
   */
  @Prop() legendFontSize: legendFontSizeProp;
  /**
   * Set legend metric string to key from your data set. For example: dataSet = [{ make: 'Volkswagen', model: 'ID4', year: '2020', }]  Then legendMetric = 'make'.
   */
  @Prop() legendMetric: string;
  /**
   * Set legend width.
   */
  @Prop() legendWidth: number;
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
   * Edge of the line graph. Valid values are 1, 2, 4 and 6.
   */
  @Prop() strokeWidth: strokeWidthProp;
  /**
   * Should display tooltips. Default value is 'true'.
   */
  @Prop() tooltips: boolean = true;
  /**
   * Should display vertices. Default value is 'true'.
   */
  @Prop() vertices: boolean = true;
  /**
   * X-axis label.
   */
  @Prop() xLabel: string = '';
  /**
   * Set X-axis metric string to key from your data set. For example: dataSet = [{ make: 'Volkswagen', model: 'ID4', year: '2020', }]  Then linearMetric = 'make'.
   */
  @Prop({ mutable: true }) linearMetric: string;
  /**
   * The Prop 'xMetric' is deprecated. Kindly use the 'linearMetric' Prop.
   */
  @Prop() xMetric: string;
  /**
   * Set X-axis tick format. Valid values are 'USD', 'localestring', 'localestring1d', 'localestring2d', 'percent', 'percent1d', 'percent2d', 'YYYY', 'M/D/YYYY', 'M/D/YY', 'MM/DD/YYYY', 'MM YYYY', 'MMM D, YYYY', 'ISODATE', 'raw'
   */
  @Prop({ mutable: true }) linearFormat: TickFormatProp;
  /**
   * The Prop 'xTickFormat' is deprecated. Kindly use the 'linearFormat' Prop.
   */
  @Prop() xTickFormat: TickFormatProp;
  /**
   * X-axis tick size.
   */
  @Prop() xTickSize: number;
  /**
   * Y-axis Label.
   */
  @Prop() yLabel: string = '';
  /**
   * Set Y-axis metric string to key from your data set. For example: dataSet = [{ make: 'Volkswagen', model: 'ID4', year: '2020', }]  Then valueMetric = 'make'.
   */
  @Prop({ mutable: true }) valueMetric: string;
  /**
   * The Prop 'yMetric' is deprecated. Kindly use the 'valueMetric' Prop.
   */
  @Prop() yMetric: string;
  /**
   * Set Y-axis tick format. Valid values are 'USD', 'localestring', 'localestring1d', 'localestring2d', 'percent', 'percent1d', 'percent2d', 'YYYY', 'M/D/YYYY', 'M/D/YY', 'MM/DD/YYYY', 'MM YYYY', 'MMM D, YYYY', 'ISODATE', 'raw'
   */
  @Prop({ mutable: true }) valueFormat: TickFormatProp;
  /**
   * The Prop 'yTickFormat' is deprecated. Kindly use the 'valueFormat' Prop.
   */
  @Prop() yTickFormat: TickFormatProp;
  /**
   * Y-axis tick size.
   */
  @Prop() yTickSize: number;

  /**
   * On load even on loading line chart ('nexusLineChartLoaded').
   */
  @Event({
    eventName: 'nexusLineChartLoaded',
    bubbles: true,
    composed: true
  })
  componentLoaded: EventEmitter;

  //
  // LIFECYCLE
  //
  componentDidLoad(): void {
    // Deprecated Props
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
    if (!this.linearMetric && this.xMetric) {
      this.linearMetric = this.xMetric;
    }
    if (!this.valueMetric && this.yMetric) {
      this.valueMetric = this.yMetric;
    }
    if (!this.linearFormat && this.xTickFormat) {
      this.linearFormat = this.xTickFormat;
    }
    if (!this.valueFormat && this.yTickFormat) {
      this.valueFormat = this.yTickFormat;
    }

    this.svg = select(this.chartElement.shadowRoot.querySelector('svg.nexus-line-chart'));
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

    this.tooltipDiv = select(this.chartElement.shadowRoot.querySelector('#tooltip'))
      .attr('class', 'tooltip')
      .style('opacity', 0);

    // responsive configuration
    if (
      this.chartElement.parentElement.getBoundingClientRect().width > 50 &&
      this.chartElement.parentElement.getBoundingClientRect().height > 50
    ) {
      this.width = this.chartElement.parentElement.getBoundingClientRect().width;
      this.height = this.chartElement.parentElement.getBoundingClientRect().height;
    }

    // color scale, if color not bound in data
    this.colorScale = scaleOrdinal();

    // emit component loaded event
    this.componentLoaded.emit({
      component: 'nexus-line-chart',
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
    if (this.isValiddata() && this.chartElement.parentElement.getBoundingClientRect().width > 50) {
      this.width = this.chartElement.parentElement.getBoundingClientRect().width;
      this.draw();
    }
  }

  //
  // CLASS METHODS
  //
  /**
   * @function
   * Call the X/Y axis generator functions
   */
  callAxes(): void {
    this.gXAxis
      .style('font-size', `${this.axisTickFontSize}px`)
      .attr('class', calculateAxisClass(this.inverse, this.axisTickFontFamily))
      .attr('transform', () => {
        if (this.xZeroDomain()) {
          return 'translate(0, 0)';
        }
        const yCoordinate = this.yMin >= 0 ? this.yScale(this.yMin) : this.yScale(0);

        return `translate(0, ${yCoordinate})`;
      })
      .style('opacity', () => (this.hideXAxis || this.xZeroDomain() ? 0 : 1))
      .call(this.xAxis);

    this.gYAxis
      .style('font-size', `${this.axisTickFontSize}px`)
      .attr('class', calculateAxisClass(this.inverse, this.axisTickFontFamily))
      .attr('transform', () => {
        if (this.yZeroDomain()) {
          return 'translate(0, 0)';
        }

        return `translate(${this.marginLeft + this.yLabelAdjustment()}, 0)`;
      })
      .style('opacity', () => (this.hideYAxis || this.yZeroDomain() ? 0 : 1))
      .call(this.yAxis);
  }

  /**
   * @function
   * Drawing wrapper function
   */
  draw(): void {
    this.setScales();
    this.callAxes();
    this.setColorScale();
    this.handleGridlines();
    this.handlePaths();
    this.handleAxisLabels();
    this.handleVertices();
    this.handleLegend();
  }

  /**
   * @function
   * X/Y axis labels (if configured)
   */
  handleAxisLabels(): void {
    //
    // X
    //
    if (this.isValidXLabel()) {
      this.gCanvas.selectAll('text.x-axis-label').remove();

      this.gCanvas
        .append('text')
        .attr('class', calculateAxisLabelClass(this.inverse, 'x'))
        .style('text-anchor', 'middle')
        .text(this.xLabel)
        .style('font-size', `${this.axisLabelFontSize}`)
        .attr('transform', () => {
          const xCoordinate =
            this.marginLeft + this.yLabelAdjustment() + (this.xScale.range()[1] - this.xScale.range()[0]) / 2;
          const yCoordinate = this.height - this.xLabelPadding / 2;

          return `translate(${xCoordinate}, ${yCoordinate})`;
        });
    } else {
      this.gCanvas.selectAll('text.x-axis-label').transition(t100).style('opacity', 0).remove();
    }

    //
    // Y
    //
    if (this.isValidYLabel()) {
      this.gCanvas.selectAll('text.y-axis-label').remove();

      this.gCanvas
        .append('text')
        .attr('class', calculateAxisLabelClass(this.inverse, 'y'))
        .style('text-anchor', 'middle')
        .style('font-size', `${this.axisLabelFontSize}`)
        .text(this.yLabel)
        .attr('transform', () => {
          const xCoordinate = this.xLabelPadding / 2;
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
   * Show/hide X + Y gridlines
   */
  handleGridlines(): void {
    if (!this.gridlines) {
      this.gGrid.selectAll('line').transition(t500).style('opacity', 0).remove();

      return;
    }

    // X gridlines (north/south)
    const xGridSelection = this.gGrid.selectAll('line.x-gridline').data(this.xScale.ticks());

    xGridSelection.exit().remove();

    const xSel = xGridSelection
      .enter()
      .append('svg:line')
      .attr('class', 'x-gridline')
      .style('stroke', '#bbb')
      .style('stroke-width', 0.5)
      .style('stroke-dasharray', '7,3')
      .style('opacity', 0);

    xSel
      .merge(xGridSelection)
      .attr('x1', (dimension) => this.xScale(dimension))
      .attr('x2', (dimension) => this.xScale(dimension))
      .attr('y1', this.marginTop)
      .transition(t100)
      .style('opacity', 1)
      .attr('y2', () => this.height - this.marginBottom - this.xLabelAdjustment());

    // Y gridlines (east/west)
    const yGridSelection = this.gGrid.selectAll('line.y-gridline').data(this.yScale.ticks());

    yGridSelection.exit().remove();

    const ySel = yGridSelection
      .enter()
      .append('svg:line')
      .attr('class', 'y-gridline')
      .style('stroke', '#bbb')
      .style('stroke-width', 0.5)
      .style('stroke-dasharray', '7,3')
      .style('opacity', 0);

    ySel
      .merge(yGridSelection)
      .attr('x1', () => this.marginLeft + this.yLabelAdjustment())
      .attr('x2', () => this.xScale.range()[1])
      .attr('y1', (dimension) => this.yScale(dimension))
      .transition(t100)
      .style('opacity', 1)
      .attr('y2', (dimension) => this.yScale(dimension));
  }

  /**
   * @function
   * Show/hide the legend
   */
  handleLegend(): void {
    const lineIncrement = 25;

    // transform "gLegend" grouping
    this.gLegend.attr('transform', () => {
      const xCoordinate = this.width - this.legendWidth;
      const yCoordinate = this.marginTop;

      return `translate(${xCoordinate}, ${yCoordinate})`;
    });

    if (this.legend) {
      //
      // legend lines
      //
      const lineSel = this.gLegend.selectAll('line.legend-line').data(this.data);

      lineSel.exit().remove();

      lineSel
        .enter()
        .append('line')
        .attr('class', 'legend-line')
        .attr('x', 0)
        .attr('x2', 10)
        .style('opacity', 0)
        .style('stroke-width', 3)
        .merge(lineSel)
        .transition(t50)
        .attr('y1', (_dimension, index) => index * lineIncrement)
        .attr('y2', (_dimension, index) => index * lineIncrement)
        .style('stroke', (data, index) => data.color || this.colorScale(index))
        .transition(t25)
        .style('opacity', this.defaultLineOpacity);

      //
      // legend text
      //
      const textSel = this.gLegend.selectAll('text.legend-label').data(this.data);

      textSel.exit().remove();

      textSel
        .enter()
        .append('text')
        .style('opacity', 0)
        .on('mouseover', (_data, index) => {
          // highlight matches
          this.gCanvas
            .selectAll('path.main')
            .filter((_entry, jIndex) => index === jIndex)
            .style('opacity', 1)
            .style('stroke-width', this.strokeWidth + 2);

          // deemphasize non-matches
          this.gCanvas
            .selectAll('path.main')
            .filter((_entry, jIndex) => index !== jIndex)
            .style('opacity', 0.25);
        })
        .on('mouseout', (_data, index) => {
          this.gCanvas
            .selectAll('path.main')
            .filter((_entry, jIndex) => index === jIndex)
            .style('opacity', this.defaultLineOpacity)
            .style('stroke-width', this.strokeWidth);

          this.gCanvas
            .selectAll('path.main')
            .filter((_entry, jIndex) => index !== jIndex)
            .style('opacity', this.defaultLineOpacity);
        })
        .merge(textSel)
        .attr('class', calculateLegendLabelClass(this.inverse))
        .style('font-size', `${this.legendFontSize}px`)
        .text((dimension) => dimension[this.legendMetric] || '')

        .attr('x', 15)
        .attr('y', (_data, index) => index * lineIncrement + 4)
        .transition(t50)
        .style('opacity');
    } else {
      this.gLegend.selectAll('line.legend-line').remove();
      this.gLegend.selectAll('text').remove();
    }
  }

  /**
   * @function
   * Draw the line series
   */
  handlePaths(): void {
    const lineFn = line()
      .x((data) => this.xScale(data[this.linearMetric]))
      .y((data) => this.yScale(data[this.valueMetric]))
      .curve(getInterpolation(this.interpolation));

    const pathSelection = this.gCanvas.selectAll('path.main').data(this.data);

    pathSelection.exit().remove();

    pathSelection
      .enter()
      .append('path')
      .attr('class', 'main')
      .style('fill', 'none')
      .style('opacity', this.defaultLineOpacity)
      .merge(pathSelection)
      .style('stroke', (data, index) => data.color || this.colorScale(index))
      .style('stroke-width', this.strokeWidth)
      .transition(t250)
      .attr('d', (dimension) => lineFn(dimension.data));
  }

  /**
   * @function
   * Show/hide vertex connection points (svg circle)
   */
  handleVertices(): void {
    if (!this.vertices) {
      this.gCanvas.selectAll('circle').transition(t100).style('opacity', 0).remove();

      return;
    }

    // normalize the data for circle generation
    // need a circle at each X/Y
    const normalized = this.data
      .map((metric, index) =>
        metric.data.map((item) => {
          if (metric.color) {
            return Object.assign(item, { color: metric.color });
          }

          return Object.assign(item, { color: this.colorScale(index) });
        })
      )
      .flat();

    const circleSelection = this.gCanvas.selectAll('circle.vertex').data(normalized);

    circleSelection.exit().remove();

    circleSelection
      .enter()
      .append('circle')
      .attr('r', 4)
      .style('opacity', 0)
      .attr('class', 'vertex')
      .style('stroke', '#fff')
      .style('stroke-width', 1)
      .on('mouseover', (data) => {
        this.tooltipDiv
          .style('left', () => {
            let xCoordinate;
            xCoordinate = event.pageX;

            // not enough room on the right side for full tooltip
            if (this.xScale.range()[1] - this.xScale(data[this.linearMetric]) < this.maxTooltipWidth) {
              xCoordinate -= this.maxTooltipWidth;
            }

            return `${xCoordinate}px`;
          })
          .style('top', () => `${event.pageY - 15}px`)
          .style('opacity', () => (this.tooltips ? 0.9 : 0))
          .html(
            () => `<div class="key">
              ${tickFormat(data[this.linearMetric], this.linearFormat)}
              </div>
              <div class="value">
              ${tickFormat(data[this.valueMetric], this.valueFormat)}
              </div>`
          );
      })
      .on('mouseout', () => {
        this.tooltipDiv.style('opacity', 0).html('');
      })
      .merge(circleSelection)
      .transition(t100)
      .style('fill', (data, index) => data.color || this.colorScale(index))
      .attr('cx', (data) => this.xScale(data[this.linearMetric]))
      .attr('cy', (data) => this.yScale(data[this.valueMetric]))
      .transition(t100)
      .style('opacity', 1);
  }

  /**
   * @function
   * @return bool
   */
  isValiddata(): boolean {
    return (
      isArray(this.data) &&
      this.data.length > 0 &&
      this.linearMetric in this.data[0].data[0] &&
      this.valueMetric in this.data[0].data[0]
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
   * Setting color scale options
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
   * Calculate X/Y scales
   */
  setScales(): void {
    const linearMetricValues = this.data
      .map((metrics) => metrics.data.map((metrics2) => metrics2[this.linearMetric]))
      .flat();

    const valueMetricValues = this.data
      .map((metrics) => metrics.data.map((metrics2) => metrics2[this.valueMetric]))
      .flat();

    //
    // min/max X and Y values
    //
    this.xMin = min(linearMetricValues, (data) => data);
    this.xMax = max(linearMetricValues, (data) => data);
    this.yMin = min(valueMetricValues, (data) => data);
    this.yMax = max(valueMetricValues, (data) => data);

    //
    // X scale
    //
    const rightMarginOrLegend = this.legend ? this.legendWidth + 25 : this.marginRight;

    this.xScale = scaleLinear()
      .domain([this.xMin, this.xMax])
      .range([this.marginLeft + this.yLabelAdjustment(), this.width - rightMarginOrLegend]);

    this.xAxis = axisBottom()
      .scale(this.xScale)
      .tickSize(this.xTickSize)
      .tickFormat((data) => tickFormat(data, this.linearFormat));

    if (this.hideXTicks) {
      this.xAxis.tickValues([]);
    }

    //
    // Y axis
    //
    this.yScale = scaleLinear()
      .domain([this.yMin, this.yMax])
      .range([this.height - this.marginBottom - this.xLabelAdjustment(), this.marginTop]);

    this.yAxis = axisLeft()
      .scale(this.yScale)
      .tickSize(this.yTickSize)
      .tickFormat((data) => tickFormat(data, this.valueFormat));

    if (this.hideYTicks) {
      this.yAxis.tickValues([]);
    }
  }

  /**
   * @function
   * Adjust for possible X-axis label
   */
  xLabelAdjustment(): number {
    return this.isValidXLabel() ? this.xLabelPadding : 0;
  }

  /**
   * @function
   * Determine invalid X domain
   */
  xZeroDomain(): boolean {
    return (
      this.xScale.domain()[0] === this.xScale.domain()[1] ||
      Math.abs(this.xScale.domain()[0]) === Infinity ||
      Math.abs(this.xScale.domain()[1]) === Infinity
    );
  }

  /**
   * @function
   * Adjust for possible Y-axis label
   */
  yLabelAdjustment(): number {
    return this.isValidYLabel() ? this.yLabelPadding : 0;
  }

  /**
   * @function
   * Determine invalid Y domain
   */
  yZeroDomain(): boolean {
    return (
      this.yScale.domain()[0] === this.yScale.domain()[1] ||
      Math.abs(this.yScale.domain()[0]) === Infinity ||
      Math.abs(this.yScale.domain()[1]) === Infinity
    );
  }

  render() {
    return (
      <div>
        <div id="tooltip"></div>
        <svg
          version="1.1"
          baseProfile="full"
          width={this.width}
          height={this.height}
          class="nexus-line-chart"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
      </div>
    );
  }
}
