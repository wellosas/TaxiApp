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

                width = +svg.attr('width') - graphToolbox.margin.left - graphToolbox.margin.right,
                height = +svg.attr('height') - graphToolbox.margin.top - graphToolbox.margin.bottom,
                x = d3.scaleLinear().range([0, width]),
                y = d3.scaleLinear().range([height, 0]),
                xAxis = d3.axisBottom(x),
                yAxis = d3.axisLeft(y),
                line = d3.line().x( (d) => { return x(d.x); }).y( (d) => { return y(d.y); }),

                topFlangeWidth = 550,
                flangeThickness = 70,
                web = 45,
                distance = 800;

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
                    const g = svg.append('g').attr('id', 'grpRoot').attr('transform', 'translate(' + graphToolbox.margin.left + ',' + graphToolbox.margin.top + ')');

                    // Append title
                    g.append('text').attr('x', () => { return width * 0.5; }).attr('y', () => { return -(graphToolbox.margin.top * 0.5); })
                        .attr('class', 'title').attr('id', 'title').style('text-anchor', 'end').style('font-size', '10px')
                        .text("I Beam Metric");

                     // Draw Beam
                    g.append('g').attr('class', 'grpPath').append('path')
                        .datum(data)
                        .attr('d', line)
                        .attr('class', 'line')
                        .style('fill', '#ccc').style('shape-rendering', 'optimizeSpeed')
                        .style('fill-rule', 'evenodd').style('stroke', '#000');

                    /*g.append('g').attr('class', 'axis x-axis').attr('transform', 'translate(0,'+ (height + 10) + ')')
                        .style('font-size', '8px')
                        .call(xAxis.ticks(4));

                   g.append('g').attr('class', 'axis y-axis').style('font-size', '8px')
                        .attr('transform', 'translate(' + (-margin.left * 0.25) + ',' + 0 + ')')
                        .call(yAxis.ticks(4));*/

                    // check if dimension line has been appended to the dom
                    if ( document.querySelectorAll('.iBeamHeightDim').length == 0 ){
                        let iBeamHeightDim = d3.select('#grpRoot').append('g').attr('class', 'iBeamHeightDim').attr('id', 'iBeamHeightDim');
                        iBeamHeightDim.append('line').attr('class', 'iBeamHeightLine')
                            .attr('x1', () => {
                                return x(-graphToolbox.margin.left * 0.5 - 30);
                            })
                            .attr('x2', () => {
                                return x(-graphToolbox.margin.left * 0.5 - 30);
                            })
                            .attr('y1', () => {
                                return y( distance );
                            })
                            .attr('y2', y(0))
                            .style('stroke', "#000").style('marker-start', 'url(#arrow)').style('marker-end', 'url(#arrow)');

                        // Ibeam Height Dim label
                        iBeamHeightDim.append('text')
                            .attr('class', 'iBeamHeightLabel')
                            .attr('x', () => {
                                return x(-graphToolbox.margin.left * 0.5 - 20);
                            })
                            .attr('y', () => {
                                //y(-wBeamDataset[1].distance * 0.5); 
                                return y( ( distance / 2 ) );
                                    
                            })
                            .attr('transform', 'rotate(90' + ',' + x(-graphToolbox.margin.left * 0.5 - 20) + ',' + y( ( distance / 2 ) ) + ')')
                            .style('fill', '#000').style('text-anchor', "middle")
                            .text('d = ' + distance + ' mm');

                        // Ibeam Width 
                        let iBeamWidthDim = d3.select('#grpRoot').append('g').attr('class', 'iBeamWidthDim').attr('id', 'iBeamWidthDim');
                        iBeamWidthDim.append('line').attr('class', 'ibeamWidthLine')
                            .attr('x1', () => {return x(0); })
                            .attr('x2', () => {
                                return x(topFlangeWidth);
                            })
                            .attr('y1', () => {
                                return y( -height + graphToolbox.margin.bottom + graphToolbox.margin.top + 20);
                            })
                            .attr('y2', () => {
                                return y( -height + graphToolbox.margin.bottom + graphToolbox.margin.top + 20);
                            })
                            .style('stroke', '#000').style('marker-start', 'url(#arrow)').style('marker-end', 'url(#arrow)');

                        // Ibeam width label
                        iBeamWidthDim.append('text').attr('class', 'ibeamWidthLabel')
                            .attr('x', () => {
                                return x(topFlangeWidth * 0.5);
                            })
                            .attr('y', () => {
                                return y(-height + graphToolbox.margin.bottom + graphToolbox.margin.top + 40)
                            })
                            .style('fill', "#000").style('text-anchor', 'middle')
                            .text('b = ' + topFlangeWidth + ' mm');

                        // Ibeam web dim
                        let iBeamWebDim = d3.select('#grpRoot').append('g').attr('class', 'iBeamWebDim').attr('id', 'iBeamWebDim');
                        iBeamWebDim.append('line').attr('class', 'iBeamWebLine')
                            .attr('x1', () => {
                                return x(topFlangeWidth * 0.5 - web * 0.5);
                            })
                            .attr('x2', () => {
                                return x( topFlangeWidth * 0.25);
                            })
                            .attr('y1', () => {
                                return y(distance * 0.65);
                            })
                            .attr('y2', () => {
                                return y(distance * 0.65);
                            })
                            .style('stroke', '#000').style('marker-start', 'url(#arrow)');

                        iBeamWebDim.append('line').attr('class', 'iBeamWebLine')
                            .attr('x1', () => {
                                return x(topFlangeWidth * 0.5 + web * 0.5);
                            })
                            .attr('x2', () => {
                                return x(topFlangeWidth * 0.75);
                            })
                            .attr('y1', () => {
                                return y(distance * 0.65);
                            })
                            .attr('y2', () => {
                                return y(distance * 0.65);
                            })
                            .style('stroke', '#000').style('marker-start', 'url(#arrow)');

                        iBeamWebDim.append('text').attr('class', 'ibeamWebLabel').attr('id', 'dim')
                            .attr('x', () => {
                                return x( (topFlangeWidth * 0.5 + web * 0.5 + 20) / 1 );
                            })
                            .attr('y', () => {
                                return y( distance * 0.65  + 20);
                            })
                            .style('fill', '#000').style('text-anchor', 'start')
                            .text('Web = ' + web + ' mm');

                        // Flange Thickness
                        var flangeThicknessDim = d3.select('#grpRoot').append('g').classed('flangeThicknessDim', true);
                            flangeThicknessDim.append('path')
                                .attr('class', 'flangeThicknessLine').attr('id', 'dim')
                                .attr('d', () => {
                                    return `
                                    M ${x(topFlangeWidth * 0.85)}, ${y(distance)}
                                        L ${x(topFlangeWidth * 0.85)}, ${y(flangeThickness + distance)}
                                        ${x(topFlangeWidth)}, ${y(flangeThickness + distance)}                                       
                                        `
                                })
                                .style('fill', 'none').style('stroke', '#000').style('stroke-width', 0.85)
                                .style('marker-start', 'url(#arrow)');

                        // Bottom arrow for Flange Thickness
                        flangeThicknessDim.append('line').attr('id', 'dim').classed('flangeThicknessLineBottom', true)
                                .attr('x1', () => {
                                    return x(topFlangeWidth * 0.85);
                                })
                                .attr('x2', () => {
                                    return x(topFlangeWidth * 0.85);
                                })
                                .attr('y1', () => {
                                    return y(distance - flangeThickness);
                                })
                                .attr('y2', () => {
                                    return y(distance - flangeThickness * 2);
                                })
                                .style('marker-start', 'url(#arrow)').style('stroke', '#000');

                        // Web Label
                        flangeThicknessDim.append('text')
                                .attr('class', 'flangeThicknessLabel')
                                .attr('x', () => {
                                    return x(topFlangeWidth * 0.85);
                                })
                                .attr('dy', -4.0)
                                .attr('y', () => {
                                    return y(distance + flangeThickness * 0.95);
                                })
                                .style('fill', '#000').style('text-anchor', 'middle')
                                .text('Tk = ' + flangeThickness + ' mm');

                        // Center of Gravity
                        let centerGravity = d3.select('#grpRoot').append('g').attr('id', 'centerGravity').classed('centerGravity', true);
                            centerGravity.append('circle')
                                .attr('class', 'cg_xy').attr('cx', () => {
                                    return x(topFlangeWidth * 0.5)
                                })
                                .attr('cy', () => {
                                    return y(distance * 0.5);
                                })
                                .attr('r', () => {
                                    return x(web * 0.25);
                                })
                                .style('fill', 'none').style('stroke', '#000');

                            centerGravity.append('g').attr('class', 'cgm_vert').append('line')
                                .attr('class', 'cgm_y_axis')
                                .attr('x1', () => {
                                    return x(topFlangeWidth * 0.5);
                                })
                                .attr('x2', () => {
                                    return x(topFlangeWidth * 0.5);
                                })
                                .attr('y1', () => {
                                    return y(distance * 0.5);
                                })
                                .attr('y2', () => {
                                    return y(distance * 0.5 + distance * 0.25);
                                })
                                .style('stroke', '#000').style('marker-end', 'url(#arrow)').style('stroke-dasharray', 2);

                            centerGravity.append('g').attr('class', 'cgm_hor').append('line')
                                .attr('class', 'cgm_x_axis')
                                .attr('x1', () => {
                                    return x(topFlangeWidth * 0.5);
                                })
                                .attr('x2', () => {
                                    return x(topFlangeWidth * 0.5 + topFlangeWidth * 0.25);
                                })
                                .attr('y1', () => {
                                    return y(distance * 0.5);
                                })
                                .attr('y2', () => {
                                    return y(distance * 0.5);
                                })
                                .style('stroke', '#000').style('marker-end', 'url(#arrow)').style('stroke-dasharray', 2);

                        d3.select('.cgm_hor').append('text')
                                .attr('class', 'cgm_x_axis_label')
                                .attr('x', () => {
                                    return x(topFlangeWidth * 0.5 + topFlangeWidth * 0.25 + 10);
                                })
                                .attr('y', () => {
                                    return y(distance * 0.5);
                                })
                                .style('fill', '#000').style('text-anchor', 'start')
                                .text('Cx = '+ topFlangeWidth * 0.5 + 'mm');
                        
                        d3.select('.cgm_vert').append('text')
                            .attr('class','cgm_y_axis_label')
                            .attr('x', () => {
                                return x(topFlangeWidth * 0.5);
                            })
                            .attr('y', () => {
                                return y(distance * 0.5 + distance * 0.25 + 20);
                            })
                            .attr('dx', -5)
                            .style('fill', '#000').style('text-anchor', 'start')
                            .text('Cy = '+distance * 0.5 +'mm');

                        
                    }
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
            const svg = d3.select('.beam').attr('width', () => {
                return graphToolbox.SVGProp.width;
            }).attr('height', () => {
                return graphToolbox.SVGProp.height;
            })
            .style('display', 'block'),
            width = +svg.attr('width') - graphToolbox.margin.left - graphToolbox.margin.right,
            height = +svg.attr('height') - graphToolbox.margin.top - graphToolbox.margin.bottom,
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
                 
                d3.select('.line')
                .datum(data)
                .attr('d', line).style('fill-rule', 'evenodd');
                 // clear title and update
                 d3.select('.title').text("");
                 d3.select('.title').text("C-Channel Beam Metric");

                 var g = d3.select('#grpRoot');

                 x.domain(d3.extent(data, (d) => { return d.x; }));
                 y.domain(d3.extent(data, (d) => { return d.y; }));

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
        },
        drawAngleMetric: function() {
            let svg = d3.select('.beam').style('background', () => {
                return graphToolbox.SVGProp.backgroundColor;
            }).style('display', 'block'),

            width = +svg.attr('width') - graphToolbox.margin.left - graphToolbox.margin.right,
            height = +svg.attr('height') - graphToolbox.margin.top - graphToolbox.margin.bottom,
            x = d3.scaleLinear().range([0, width]),
            y = d3.scaleLinear().range([height, 0]),
            line = d3.line().x( (d) => { return x(d.x); }).y( (d) => { return y(d.y); }),
            xAxis = d3.axisBottom(x),
            yAxis = d3.axisLeft(y);

            var angleDepth = 50.50,
            angleWidth = 50.50,
            angleThickness = 7.25,
            angleBeamData = [
                {
                    x : 0,
                    y : 0
                },
                {
                    x : angleWidth,
                    y : 0
                },
                {
                    x : angleWidth,
                    y : angleThickness
                },
                {
                    x : angleThickness,
                    y : angleThickness
                },
                {
                    x : angleThickness,
                    y : angleDepth
                },
                {
                    x : 0,
                    y : angleDepth
                },
                {
                    x : 0,
                    y : 0
                }
            ];

            angleBeamData.forEach((d) => {
                d.x = +d.x;
                d.y = +d.y;
            });

            x.domain(d3.extent(angleBeamData, (d) => { return d.x; }));
            y.domain(d3.extent(angleBeamData, (d) => { return d.y; }));
            if(document.querySelectorAll('#grpRoot').length == 0){
                let g = svg.append('g').attr('class', 'grpRoot')
                .attr('transform', 'translate(' + graphToolbox.margin.left + ',' + graphToolbox.margin.top + ')');

                // Append title
                g.append('text').attr('x', () => { return width*0.25; }).attr('y', () => { return -graphToolbox.margin.top * 0.5; })
                .text('Equal Legged Angle').style('text-anchor', 'start');

                g.append('g').attr('class', 'grpLine').append('path').datum(angleBeamData)
                .attr('d', line).style('stroke', '#000').style('fill', '#ccc').style('shape-rendering', 'optimizeSpeed');
            }else{

            }
        }   
    }    
});