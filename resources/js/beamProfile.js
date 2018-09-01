define([
    'lib/d3/d3',
    'graphToolbox'
], function(d3, graphToolbox) {
    'use strict';
    return {
        drawIbeamMetric: function() {
            
            const svg = d3.select('.beam').attr('width', () => {
                return graphToolbox.SVGProp.width;
            }).attr('height', () => {
                return graphToolbox.SVGProp.height;
            })
                .style('display', 'block'),
            
                margin = {
                    top : 25,
                    bottom : 25,
                    left : 50,
                    right : 25
                },

                width = +svg.attr('width') - margin.left - margin.right,
                height = +svg.attr('height') - margin.top - margin.bottom,
                x = d3.scaleLinear().range([0, width]),
                y = d3.scaleLinear().range([height, 0]),
                xAxis = d3.axisBottom(x),
                yAxis = d3.axisLeft(y),
                line = d3.line().x( (d) => { return x(d.x); }).y( (d) => { return y(d.y); }),

                topFlangeWidth = 446.00,
                flangeThickness = 89.90,
                web = 50.00,
                distance = 1028.00;

                var data = [
                    {
                        x : 0,
                        y : 0
                    },
                    {
                        x : topFlangeWidth,
                        y : 0
                    },
                    {
                        x : topFlangeWidth,
                        y : flangeThickness
                    },
                    {
                        x : (topFlangeWidth * 0.5) + (web * 0.5),
                        y : flangeThickness
                    },
                    {
                        x : (topFlangeWidth * 0.5) + (web * 0.5),
                        y : distance - flangeThickness
                    },
                    {
                        x : topFlangeWidth,
                        y : distance - flangeThickness
                    },
                    {
                        x : topFlangeWidth,
                        y : distance
                    },
                    {
                        x : 0,
                        y : distance
                    },
                    {
                        x : 0,
                        y : distance - flangeThickness
                    },
                    {
                        x : topFlangeWidth * 0.5 - web * 0.5,
                        y : distance - flangeThickness
                    },
                    {
                        x : topFlangeWidth * 0.5 - web * 0.5,
                        y : flangeThickness
                    },
                    {
                        x : 0,
                        y : flangeThickness
                    },
                    {
                        x : 0,
                        y : 0
                    }
                ];

                data.forEach( (d) => {
                    d.x = +d.x;
                    d.y = +d.y;
                });
                x.domain(d3.extent(data, (d) => { return d.x; }));
                y.domain(d3.extent(data, (d) => { return d.y; }));

                if( document.querySelectorAll('.beam #grpRoot').length == 0 ){
                    const g = svg.append('g').attr('id', 'grpRoot').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

                    // Append title
                    g.append('text').attr('x', () => { return width * 0.5; }).attr('y', () => { return -(margin.top * 0.5); })
                        .attr('class', 'title').attr('id', 'title').style('text-anchor', 'middle').style('font-size', '10px')
                        .text("I Beam Metric");

                     // Draw Beam
                    g.append('g').attr('class', 'grpPath').append('path')
                        .datum(data)
                        .attr('d', line)
                        .attr('class', 'line')
                        .style('fill', '#ccc').style('shape-rendering', 'optimizeSpeed')
                        .style('fill-rule', 'evenodd').style('stroke', '#000');

                    g.append('g').attr('class', 'axis x-axis').attr('transform', 'translate(0,'+ (height + 10) + ')')
                        .style('font-size', '8px')
                        .call(xAxis.ticks(4));

                    g.append('g').attr('class', 'axis y-axis').style('font-size', '8px')
                        .attr('transform', 'translate(' + (-margin.left * 0.25) + ',' + 0 + ')')
                        .call(yAxis.ticks(4));
                }else{
                    // Clear Screen
                    d3.select('.line').transition().duration(100).delay(25).remove();                  

                    // Update Title
                    d3.select('.title').transition().duration(100).delay(25).text('I Beam Design Properties');
                    let g = d3.select('#grpRoot');

                    x.domain(d3.extent(data, (d) => { return d.x; }));
                    y.domain(d3.extent(data, (d) => { return d.y; }));

                    g.append('g').attr('id', 'line').attr('class', 'line')
                        .append('path')
                        .datum(data)
                        .attr('d', line)
                        .attr('class', 'line')
                        .style('fill', '#ccc').style('shape-rendering', 'optimizeSpeed')
                        .style('fill-rule', 'evenodd').style('stroke', '#000');

                    //Clear Reappend the x and y axis
                    //d3.selectAll('.axis').remove();
                    /*var gx = g.append('g').attr('class', 'x-axis').attr('transform', 'translate(0,'+ height + ')')
                        .style('font-size', '8px')
                        .call(xAxis);

                    var gy = g.append('g').attr('class', 'y-axis').style('font-size', '8px')
                        .call(yAxis); */

                    let gx = d3.select('.x-axis').call(xAxis.ticks(4));
                    let gy = d3.select('.y-axis').call(yAxis.ticks(4));

                }
        },
        drawCChannelMetric: function() {
            const svg = d3.select('.beam').attr('width', 335).attr('height', 335)
            .style('display', 'block'),
            margin = {
                top : 50,
                bottom : 50,
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

            x.domain(d3.extent(data, (d) => { return d.x; }));
            y.domain(d3.extent(data, (d) => { return d.y; }));

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
                 
                    // append x and y axis
                    var gx = g.append('g').attr('class', 'axis x-axis').style('font-size', '8px').attr('transform', 'translate(0,' + height + ')')
                            .call(xAxis.ticks(4));
                    var gy = g.append('g').attr('class', 'axis y-axis').style('font-size', '8px')
                            .call(yAxis.ticks(4));
            }else{
                 
                d3.select('.line').remove();
                 // clear title and update
                 d3.select('.title').text("");
                 d3.select('.title').text("C-Channel Beam Metric");

                 var g = d3.select('#grpRoot');

                 x.domain(d3.extent(data, (d) => { return d.x; }));
                 y.domain(d3.extent(data, (d) => { return d.y; }));
 
                  // Draw Beam
                  g.append('path')
                  .datum(data)
                  .attr('d', line)
                  .attr('class', 'line')
                  .style('fill', '#ccc').style('shape-rendering', 'optimizeSpeed')
                  .style('fill-rule', 'evenodd').style('stroke', '#000');

                  //clear x and y axis, then reappend
                  //d3.selectAll('.axis').remove();
                  // append x and y axis
                    /*var gx = g.append('g').attr('class', 'x-axis').style('font-size', '8px').attr('transform', 'translate(0,'+height+')')
                            .call(xAxis);
                    var gy = g.append('g').attr('class', 'y-axis').style('font-size', '8px')
                            .call(yAxis);*/

                    let gx = d3.select('.x-axis').call(xAxis.ticks(4));
                    let gy = d3.select('.y-axis').call(yAxis.ticks(4));
                  
            }

                    
        },
        drawHssMetric: function() {            
            const svg = d3.select('.beam').attr('width', 335).attr('height', 335)
            .style('display', 'block'),
            margin = {
                top : 50,
                bottom : 50,
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
                thickness = 3.18;

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
                    x : outerWidth - thickness,
                    y : thickness
                },
                {
                    x : outerWidth - thickness,
                    y : outerHeight - thickness
                },
                {
                    x : thickness,
                    y : outerHeight - thickness
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

            x.domain(d3.extent(data, (d) => { return d.x; }));
            y.domain(d3.extent(data, (d) => { return d.y; }));

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

                 // append x and y axis
                 var gx = g.append('g').attr('class', 'axis x-axis').style('font-size', '8px').attr('transform', 'translate(0,'+height+')')
                    .call(xAxis.ticks(4));
                var gy = g.append('g').attr('class', 'axis y-axis').style('font-size', '8px')
                    .call(yAxis.ticks(4));
            }else {
                 // clear all unwanted dom elements
                d3.select('.line').transition().duration(100).delay(50).remove();

                // clear title and update
                d3.select('.title').text("");
                d3.select('.title').text("HSS Beam Metric");

                var g = d3.select('#grpRoot');

                x.domain(d3.extent(data, (d) => { return d.x; }));
                y.domain(d3.extent(data, (d) => { return d.y; }));
                 // Draw Beam
                 g.append('g').attr('id', 'line')
                 .append('path')
                 .datum(data)
                 .attr('d', line)
                 .attr('class', 'line')
                 .style('fill', '#ccc').style('shape-rendering', 'optimizeSpeed')
                 .style('fill-rule', 'evenodd').style('stroke', '#000');
                
                let gx = d3.select('.x-axis').call(xAxis);
                let gy = d3.select('.y-axis').call(yAxis.ticks(4));
            }
        }    
    }    
});