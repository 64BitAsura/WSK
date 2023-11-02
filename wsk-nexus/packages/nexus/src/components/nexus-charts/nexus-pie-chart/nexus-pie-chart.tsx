/* eslint-disable complexity */
/**
 * src/components/nexus-pie-chart/nexus-pie-chart.tsx
 * Pie chart component class
 */
import { Component, h, Prop, Element, Event, EventEmitter, Listen } from '@stencil/core';
import { event } from 'd3';
import { scaleOrdinal } from 'd3-scale';
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
import { arc, pie } from 'd3-shape';
import { NexusPieChartProps } from '../interfaces/nexus-pie-chart';
import { colorSchemeProp, strokeProp, legendFontSizeProp, TickFormatProp, strokeWidthProp } from '../utils/chartsTypes';

// utilities
import { calculateLegendLabelClass, t25, t50, t100, t500, tickFormat } from '../utils';

@Component({
  tag: 'nexus-pie-chart',
  styleUrl: 'nexus-pie-chart.scss',
  shadow: true
})
export class NexusPieChart {
  arcObject: any;
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

  defaultArcOpacity: number = 0.8;
  defaultLineOpacity: number = 0.7;

  // <g>
  gCanvas: Selection<Element, any, HTMLElement, any>;
  gLegend: Selection<Element, any, HTMLElement, any>;
  gPie: Selection<Element, any, HTMLElement, any>;
  // end </g>

  pieLayout: any = pie();
  spaceBetweenPieAndLegend: number = 25;
  svg: Selection<Element, any, HTMLElement, any>;
  tooltipDiv: Selection<Element, any, HTMLElement, any>;

  @Element() private chartElement: HTMLElement;
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
   * Nexus pie chart props
   */
  @Prop({ mutable: true }) data: NexusPieChartProps = [];
  /**
   * The Prop 'chartData' is deprecated. Kindly use the 'data' Prop.
   */
  @Prop() chartData: NexusPieChartProps = [];
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
  @Prop() colorScheme: colorSchemeProp = 'category10';
  /**
   * Chart inner radius.
   */
  @Prop() innerRadius: number = 0;
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
   * Canvas margin bottom offset. Default value is 0.
   */
  @Prop({ reflect: true }) marginBottom: number = 0;
  /**
   * Canvas margin left offset. Default value is 0.
   */
  @Prop({ reflect: true }) marginLeft: number = 0;
  /**
   * Canvas margin right offset. Default value is 0.
   */
  @Prop({ reflect: true }) marginRight: number = 0;
  /**
   * Canvas margin top offset. Default value is 0.
   */
  @Prop({ reflect: true }) marginTop: number = 0;
  /**
   * Pie chart edge color. Valid values are 'transparent', 'black', 'white' and 'gray'.
   */
  @Prop() stroke: strokeProp = 'transparent';
  /**
   * Pie chart edge width. Valid values are 1, 2, 3 and 5.
   */
  @Prop() strokeWidth: strokeWidthProp;
  /**
   * Should display tooltips. Default value is 'true'.
   */
  @Prop() tooltips: boolean = true;
  /**
   * Set value format. Valid values are 'USD', 'localestring', 'localestring1d', 'localestring2d', 'percent', 'percent1d', 'percent2d', 'YYYY', 'M/D/YYYY', 'M/D/YY', 'MM/DD/YYYY', 'MM YYYY', 'MMM D, YYYY', 'ISODATE', 'raw'
   */
  @Prop() valueFormat: TickFormatProp;
  /**
   * Set Value metric string to key from your data set. For example: dataSet = [{ make: 'Volkswagen', model: 'ID4', year: '2020', }]  Then valueMetric = 'make'.
   */
  @Prop() valueMetric: string;

  /**
   * On load even on loading pie chart ('nexusPieChartLoaded').
   */
  @Event({
    eventName: 'nexusPieChartLoaded',
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

    this.svg = select(this.chartElement.shadowRoot.querySelector('svg.nexus-pie-chart'));
    this.gCanvas = this.svg.append('svg:g').attr('class', 'canvas');
    this.gPie = this.gCanvas.append('svg:g');
    this.gLegend = this.svg.append('svg:g').attr('class', 'legend');

    this.tooltipDiv = select(this.chartElement.shadowRoot.querySelector('#tooltip'))
      .attr('class', 'tooltip')
      .style('opacity', 0);

    // responsive configuration
    if (
      this.chartElement.parentElement.getBoundingClientRect().height > 50 &&
      this.chartElement.parentElement.getBoundingClientRect().width > 50
    ) {
      this.height = this.chartElement.parentElement.getBoundingClientRect().height;
      this.width = this.chartElement.parentElement.getBoundingClientRect().width;
    }

    // color scale, if "color" property not bound in data
    this.colorScale = scaleOrdinal();

    // emit component loaded event
    this.componentLoaded.emit({
      component: 'nexus-pie-chart',
      attrId: this.attrId
    });
  }

  //
  // LIFECYCLE
  //
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
  calculateDrawableHeight(): number {
    return this.height - this.marginTop - this.marginBottom;
  }

  calculateDrawableWidth(): number {
    let drawableWidth;
    drawableWidth = this.width - this.marginLeft - this.marginRight;
    if (this.legend) {
      drawableWidth -= this.legendWidth - this.spaceBetweenPieAndLegend;
    }

    return drawableWidth;
  }

  draw(): void {
    this.setColorScale();
    this.handlePie();
    this.handleLegend();
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
      const yCoordinate = lineIncrement;

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
        .attr('y1', (_detail, index) => index * lineIncrement)
        .attr('y2', (_detail, index) => index * lineIncrement)
        .style('stroke', (detail, index) => detail.color || this.colorScale(index))
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
        .on('mouseover', (_detail, index) => {
          this.gCanvas
            .selectAll('path.wedge')
            .filter((_entry, jIndex) => index === jIndex)
            .style('opacity', 1)
            .style('stroke-width', this.strokeWidth + 2);
        })
        .on('mouseout', (_detail, index) => {
          this.gCanvas
            .selectAll('path.wedge')
            .filter((_entry, jIndex) => index === jIndex)
            .style('opacity', this.defaultArcOpacity)
            .style('stroke-width', this.strokeWidth);
        })
        .merge(textSel)
        .attr('class', calculateLegendLabelClass(this.inverse))
        .style('font-size', `${this.legendFontSize}px`)
        .text((data) => data[this.legendMetric] || '')
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
   * Handle the arcs and paths
   */
  handlePie(): void {
    // translate gCanvas
    this.gCanvas.attr('transform', () => {
      const width = this.calculateDrawableWidth() / 2 + (this.marginLeft + this.marginRight) / 2;
      const height = this.calculateDrawableHeight() / 2 + (this.marginTop + this.marginBottom) / 2;

      return `translate(${width}, ${height})`;
    });

    // set the arc object
    this.arcObject = arc()
      .outerRadius(() => Math.min(this.calculateDrawableWidth() / 2, this.calculateDrawableHeight() / 2))
      .innerRadius(
        () => Math.min(this.calculateDrawableWidth() / 2, this.calculateDrawableHeight() / 2) * this.innerRadius
      );

    // configure pieLayout generator
    this.pieLayout.value((data) => data[this.valueMetric]).sort(null);

    //
    // JRAT
    //
    // join new arcs with old arcs
    const arcSelection = this.gPie.selectAll('g.arc').data(this.pieLayout(this.data));

    // remove old arcs gracefully
    arcSelection.exit().transition(t100).style('opacity', 0).remove();

    // add new arcs
    const newArcs = arcSelection.enter().append('svg:g').attr('class', 'arc');

    // append path to each new arc
    newArcs
      .append('path')
      .attr('class', 'wedge')
      .style('opacity', 0)
      .style('fill', 'transparent')
      .style('stroke-width', this.strokeWidth)
      .attr('d', arc().outerRadius(0).innerRadius(0))
      .on('mouseover', (detail, index, array) => {
        select(array[index])
          .style('opacity', 1)
          .style('stroke-width', this.strokeWidth + 2);

        this.tooltipDiv
          .style('left', () => `${event.pageX}px`)
          .style('top', () => `${event.pageY + 15}px`)
          .style('opacity', () => (this.tooltips ? 0.9 : 0))
          .html(
            () => `<div class="key">
              ${detail.data[this.legendMetric]}
              </div>
              <div class="value">
              ${tickFormat(detail.data[this.valueMetric], this.valueFormat)}
              </div>`
          );
      })
      .on('mouseout', (_detail, index, array) => {
        select(array[index]).style('opacity', this.defaultArcOpacity).style('stroke-width', this.strokeWidth);
        this.tooltipDiv.style('opacity', 0).html('');
      })
      .on('mousemove', () => {
        this.tooltipDiv.style('left', `${event.pageX}px`).style('top', `${event.pageY + 15}px`);
      });

    // bind data and transition paths
    this.gPie
      .selectAll('g.arc path')
      .data(this.pieLayout(this.data))
      .attr('d', this.arcObject)
      .transition(t500)
      .style('stroke', this.stroke)
      .style('stroke-width', this.strokeWidth)
      .style('fill', (detail, index) => detail.data.color || this.colorScale(index))
      .style('opacity', this.defaultArcOpacity);
  }

  /**
   * @function
   * Determine if data is valid format
   */
  isValiddata(): boolean {
    return this.data.length > 0 && this.legendMetric in this.data[0] && this.valueMetric in this.data[0];
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

  render() {
    return (
      <div>
        <div id="tooltip"></div>
        <svg
          version="1.1"
          baseProfile="full"
          width={this.width}
          height={this.height}
          class="nexus-pie-chart"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
      </div>
    );
  }
}
