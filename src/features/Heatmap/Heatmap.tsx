import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { ShotData } from '@/Shot';

export type HeatmapProps = {
  data: ShotData[];
};

const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous SVG content
    d3.select(svgRef.current).selectAll('*').remove();

    const width = 500;
    const height = 500;

    // Create an SVG container
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Basketball court dimensions
    // const courtWidth = 100; // percentage width
    // const courtHeight = 100; // percentage height

    // Scale coordinates to SVG dimensions
    const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 100]).range([0, height]);

    // Background: Basketball court image
    svg
      .append('image')
      .attr('href', '/courts/basketball.svg') // Path to court image
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', height);

    // Draw shots as circles with varying color/intensity
    svg
      .selectAll('circle')
      .data(data)
      .join('circle')
      .attr('cx', (d) => xScale(d.x as unknown as d3.NumberValue))
      .attr('cy', (d) => yScale(d.y as unknown as d3.NumberValue))
      .attr('r', 6)
      .attr('fill', (d) =>
        d.m === '1' ? 'rgba(0, 255, 0, 0.7)' : 'rgba(255, 0, 0, 0.7)',
      )
      .attr('stroke', 'black')
      .attr('stroke-width', 0.5);

    // Add tooltip interaction
    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', '#fff')
      .style('border', '1px solid #ccc')
      .style('padding', '5px')
      .style('border-radius', '5px')
      .style('box-shadow', '0 0 5px rgba(0,0,0,0.3)');

    svg
      .selectAll('circle')
      .on('mouseover', (event, d) => {
        tooltip
          .style('visibility', 'visible')
          .html(
            `Player: ${(d as ShotData).player}<br>Quarter: ${(d as ShotData).quarter}`,
          );
      })
      .on('mousemove', (event) => {
        tooltip
          .style('top', `${event.pageY - 10}px`)
          .style('left', `${event.pageX + 10}px`);
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default Heatmap;
