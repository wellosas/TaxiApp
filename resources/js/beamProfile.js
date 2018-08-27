define([
    'lib/d3/d3'
], function(d3) {
    'use strict';
    return {
        drawIbeamMetric: function() {      
                const dotMarker = defs.append('marker')
                    .attr('id', 'dot')
                    .attr('viewBox', '0 0 10 10')
                    .attr('refX', '5')
                    .attr('refY', '5')
                    .attr('markerWidth', 5)
                    .attr('markerHeight', 5);

                dotMarker.append('circle')
                    .attr('cx', 5)
                    .attr('cy', 5)
                    .attr('r', 5)
                    .attr('fill', '#000');

                const arrowMarker = defs.append('marker')
                    .attr('id', 'arrow')
                    .attr('viewBox', '0 0 10 10')
                    .attr('refX', 10)
                    .attr('refY', 5)
                    .attr('markerWidth', 5)
                    .attr('markerHeight', 5)
                    .attr('orient', 'auto-start-reverse');

                arrowMarker.append('path')
                    .attr('d', 'M 0 0 L 10 5 L 0 10 z')
                    .attr('fill', '#000');
               
        },
        drawCChannel: function() {
            const svg = d3.select('.beam').attr('width', 340).attr('height', 125)
            .style('display', 'block'),
            margin = {
                top : 20,
                bottom : 20,
                left : 10,
                right : 50
            },
            width = +svg.attr('width') - margin.left - margin.right,
            height = +svg.attr('height') - margin.top - margin.bottom,
            x = d3.scaleLinear().range([0, width]),
            y = d3.scaleLinear().range([height, 0]),
            xAxis = d3.axisBottom(x),
            yAxis = d3.axisLeft(y),
            line = d3.line().x( (d) => { return x(d.x); }).y( (d) => { return y(d.y); });

            var data = [
                {
                    x: 0, 
                    y: 0
                },
                {
                    x: 43.00, 
                    y: 0
                },
                {
                    x: 43.00, 
                    y: 7.50
                },
                {
                    x: 8.20,
                    y: 15.00
                },
                {
                    x: 8.20,
                    y: 87.00
                },
                {
                    x: 43.00,
                    y: 94.50
                },
                {
                    x: 43.00,
                    y: 102.00
                },
                {
                    x: 0,
                    y: 102.00
                },
                {
                    x: 0,
                    y: 0
                }
            ];
            
            data.forEach( (d) => {
                d.x = +d.x;
                d.y = +d.y;
            });

            x.domain([width, 0]);
            y.domain([height, 0]);

            if ( document.querySelectorAll('.beam #grpRoot').length == 0  ){           
                const g = svg.append('g').attr('id', 'grpRoot').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

                // Append Title
                g.append('text').attr('x', () => { return width * 0.5; }).attr('y', () => { return -(margin.top * 0.5); })
                .attr('class', 'title').attr('id', 'title').style('text-anchor', 'middle').style('font-size', '10px')
                .text("C-Channel Beam Metric");

                 // Draw Beam
                 g.append('path')
                 .datum(data)
                 .attr('d', line)
                 .attr('class', 'line')
                 .style('fill', '#ccc').style('shape-rendering', 'optimizeSpeed')
                 .style('fill-rule', 'evenodd').style('stroke', '#000');               
            }else{
                 // clear all unwanted dom elements
                 d3.select('.line').transition().duration(100).delay(50).remove();
                
                 // clear title and update
                 d3.select('.title').text("");
                 d3.select('.title').text("C-Channel Beam Metric");

                 var g = d3.select('#grpRoot');
 
                  // Draw Beam
                  g.append('path')
                  .datum(data)
                  .attr('d', line)
                  .attr('class', 'line')
                  .style('fill', '#ccc').style('shape-rendering', 'optimizeSpeed')
                  .style('fill-rule', 'evenodd').style('stroke', '#000');
            }

                    
        },
        drawHssMetric: function() {            
            const svg = d3.select('.beam').attr('width', 340).attr('height', 125)
            .style('display', 'block'),
            margin = {
                top : 20,
                bottom : 20,
                left : 50,
                right : 50
            },
            width = +svg.attr('width') - margin.left - margin.right,
            height = +svg.attr('height') - margin.top - margin.bottom,
            x = d3.scaleLinear().range([0, width]),
            y = d3.scaleLinear().range([height, 0]),
            xAxis = d3.axisBottom(x),
            yAxis = d3.axisLeft(y),
            line = d3.line().x( (d) => { return x(d.x); }).y( (d) => { return y(d.y); });

            var outerWidth = 51.00,
                outerHeight = 102.00,
                thickness = 3.18,
                innerWidth = outerWidth - thickness,
                innerHeight = outerHeight - thickness;

            var data = [
                {
                    x : 0,
                    y : 0                    
                },
                {
                    x : outerWidth,
                    y : 0
                },
                {
                    x : outerWidth,
                    y : outerHeight
                },
                {
                    x : 0,
                    y : outerHeight
                },
                {
                    x : 0,
                    y : 0
                },
                {
                    x : thickness,
                    y : thickness
                },
                {
                    x : innerWidth,
                    y : thickness
                },
                {
                    x : innerWidth,
                    y : innerHeight
                },
                {
                    x : thickness,
                    y : innerHeight
                },
                {
                    x : thickness,
                    y : thickness
                }
            ];

            data.forEach( (d) => {
                d.x = +d.x;
                d.y = +d.y;
            });

            x.domain([0, width]);
            y.domain([height, 0]);

            //Check if root group hans been created
            if ( document.querySelectorAll('.beam #grpRoot').length == 0 ){
                const g = svg.append('g').attr('id', 'grpRoot').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

                // Append Title
                g.append('text').attr('x', () => { return width * 0.5; }).attr('y', () => { return -(margin.top * 0.5); })
                .attr('class', 'title').attr('id', 'title').style('text-anchor', 'middle').style('font-size', '10px')
                .text("HSS Beam Metric");

                // Draw Beam
                g.append('path')
                .datum(data)
                .attr('d', line)
                .attr('class', 'line')
                .style('fill', '#ccc').style('shape-rendering', 'optimizeSpeed')
                .style('fill-rule', 'evenodd').style('stroke', '#000');
            }else {
                 // clear all unwanted dom elements
                d3.select('.line').transition().duration(100).delay(50).remove();

                // clear title and update
                d3.select('.title').text("");
                d3.select('.title').text("HSS Beam Metric");

                var g = d3.select('#grpRoot');
                 // Draw Beam
                 g.append('path')
                 .datum(data)
                 .attr('d', line)
                 .attr('class', 'line')
                 .style('fill', '#ccc').style('shape-rendering', 'optimizeSpeed')
                 .style('fill-rule', 'evenodd').style('stroke', '#000');
            }
        }    
    }    
});