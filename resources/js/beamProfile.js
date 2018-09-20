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
                        .attr('class', 'title').attr('id', 'title').style('text-anchor', 'middle').style('font-size', '10px')
                        .text("I Beam Metric");

                     // Draw Beam
                    g.append('g').attr('class', 'grpPath').append('path')
                        .datum(data)
                        .attr('d', line)
                        .attr('class', 'shape')
                        .style('fill', '#ccc').style('shape-rendering', 'geometricPrecision')
                        .style('fill-rule', 'evenodd').style('stroke', '#000');

                    g.append('g').attr('class', 'axis x-axis').attr('transform', 'translate(0,'+ (height + 10) + ')')
                        .style('font-size', '8px')
                        .call(xAxis.ticks(4));

                   g.append('g').attr('class', 'axis y-axis').style('font-size', '8px')
                        .attr('transform', 'translate(' + (-graphToolbox.margin.left * 0.25) + ',' + 0 + ')')
                        .call(yAxis.ticks(4));

                    var beamDim = g.append('g').attr('id', 'dim').classed('dim', true).style('display', 'none');
                    
                        
                        beamDim.append('line').attr('class', 'beamHeightLine')
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
                        beamDim.append('text')
                            .attr('class', 'beamHeightLabel')
                            .attr('x', () => {
                                return x(-graphToolbox.margin.left * 0.5 - 20);
                            })
                            .attr('y', () => {
                               
                                return y( ( distance / 2 ) );
                                    
                            })
                            .attr('transform', 'rotate(90' + ',' + x(-graphToolbox.margin.left * 0.5 - 20) + ',' + y( ( distance / 2 ) ) + ')')
                            .style('fill', '#000').style('text-anchor', "middle")
                            .text('d = ' + distance + ' mm');

                        // Ibeam Width 
                        
                        beamDim.append('line').attr('class', 'beamWidthLine')
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
                        beamDim.append('text').attr('class', 'beamWidthLabel')
                            .attr('x', () => {
                                return x(topFlangeWidth * 0.5);
                            })
                            .attr('y', () => {
                                return y(-height + graphToolbox.margin.bottom + graphToolbox.margin.top + 40)
                            })
                            .style('fill', "#000").style('text-anchor', 'middle')
                            .text('b = ' + topFlangeWidth + ' mm');

                        // Ibeam web dim                        
                        beamDim.append('line').attr('class', 'beamWebLine_right')
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

                        beamDim.append('line').attr('class', 'beamWebLine_left')
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

                        beamDim.append('text').attr('class', 'beamWebLabel').attr('id', 'dim')
                            .attr('x', () => {
                                return x( (topFlangeWidth * 0.5 + web * 0.5 + 20) / 1 );
                            })
                            .attr('y', () => {
                                return y( distance * 0.65  + 20);
                            })
                            .style('fill', '#000').style('text-anchor', 'start')
                            .text('Web = ' + web + ' mm');

                        // Flange Thickness                        
                            beamDim.append('path')
                                .attr('class', 'flangeThicknessLine')
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
                        beamDim.append('line').classed('flangeThicknessLineBottom', true)
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
                        beamDim.append('text')
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
                        let centerGravity = beamDim.append('g').attr('id', 'centerGravity').classed('centerGravity', true);
                            centerGravity.append('circle')
                                .attr('class', 'centerPoint').attr('cx', () => {
                                    return x(topFlangeWidth * 0.5)
                                })
                                .attr('cy', () => {
                                    return y(distance * 0.5);
                                })
                                .attr('r', () => {
                                    return x(web * 0.25);
                                })
                                .style('fill', 'none').style('stroke', '#000');

                            centerGravity.append('line')
                                .attr('class', 'cgy')
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

                            centerGravity.append('line')
                                .attr('class', 'cgx')
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

                            centerGravity.append('text')
                                .attr('class', 'cx')
                                .attr('x', () => {
                                    return x(topFlangeWidth * 0.5 + topFlangeWidth * 0.25 + 10);
                                })
                                .attr('y', () => {
                                    return y(distance * 0.5);
                                })
                                .style('fill', '#000').style('text-anchor', 'start')
                                .text('Cx = '+ topFlangeWidth * 0.5 + 'mm');
                        
                            centerGravity.append('text')
                                .attr('class','cy')
                                .attr('x', () => {
                                    return x(topFlangeWidth * 0.5);
                                })
                                .attr('y', () => {
                                    return y(distance * 0.5 + distance * 0.25 + 20);
                                })
                                .attr('dx', -5)
                                .style('fill', '#000').style('text-anchor', 'start')
                                .text('Cy = '+distance * 0.5 +'mm');                        
                    
                }else{
                    // update title
                    d3.select('.title').transition().duration(100).delay(25).text('W Beam');
                   //update shape
                   d3.select('.shape').datum(data).transition().duration(100).delay(30).attr('d', line);
                   // update x and y axis
                   d3.select('.x-axis').transition().duration(100).delay(35).call(xAxis.ticks(4));
                   d3.select('.y-axis').transition().duration(100).delay(36).call(yAxis.ticks(4));
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
                const g = svg.append('g').attr('id', 'grpRoot').attr('transform', 'translate(' + graphToolbox.margin.left + ',' + graphToolbox.margin.top + ')');

                // Append Title
                g.append('text').attr('x', () => { return width * 0.5; }).attr('y', () => { return -(graphToolbox.margin.top * 0.5); })
                .attr('class', 'title').attr('id', 'title').style('text-anchor', 'middle').style('font-size', '10px')
                .text("C-Channel Beam Metric");

                 // Draw Beam
                 g.append('path')
                 .datum(data)
                 .attr('d', line)
                 .attr('class', 'shape')
                 .style('fill', '#ccc').style('shape-rendering', 'optimizeSpeed')
                 .style('fill-rule', 'evenodd').style('stroke', '#000');
                 
                    // append x and y axis
                    g.append('g').attr('class', 'axis x-axis').style('font-size', '8px')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(xAxis.ticks(4));
                    g.append('g').attr('class', 'axis y-axis').style('font-size', '8px')
                    .call(yAxis.ticks(4));
            }else{
                 
                d3.select('.shape')
                .datum(data).transition().duration(100).delay(25)
                .attr('d', line).style('fill-rule', 'evenodd');
                 // clear title and update
                 d3.select('.title').text("");
                 d3.select('.title').transition().duration(100).delay(50).text("C-Channel Beam Metric");              

                d3.select('.x-axis').transition().duration(100).delay(55).call(xAxis.ticks(4));
                d3.select('.y-axis').transition().duration(100).delay(75).call(yAxis.ticks(4));                  
            }

                    
        },
        drawHssMetric: function() {            
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
                const g = svg.append('g').attr('id', 'grpRoot').attr('transform', 'translate(' + graphToolbox.margin.left + ',' + graphToolbox.margin.top + ')');

                // Append Title
                g.append('text').attr('x', () => { return width * 0.5; }).attr('y', () => { return -(graphToolbox.margin.top * 0.5); })
                .attr('class', 'title').attr('id', 'title').style('text-anchor', 'middle').style('font-size', '10px')
                .text("HSS Beam Metric");

                // Draw Beam
                g.append('path')
                .datum(data)
                .attr('d', line)
                .attr('class', 'shape')
                .style('fill', '#ccc').style('shape-rendering', 'optimizeSpeed')
                .style('fill-rule', 'evenodd').style('stroke', '#000');

                 // append x and y axis
                 var gx = g.append('g').attr('class', 'axis x-axis').style('font-size', '8px').attr('transform', 'translate(0,'+height+')')
                    .call(xAxis.ticks(4));
                var gy = g.append('g').attr('class', 'axis y-axis').style('font-size', '8px')
                    .call(yAxis.ticks(4));
            }else {
                 
                d3.select('.shape').datum(data)
                .transition().duration(100).delay(50).attr('d', line);

                // clear title and update
                d3.select('.title').text("");
                d3.select('.title').text("HSS Beam Metric");                
                
                d3.select('.x-axis').call(xAxis);
                d3.select('.y-axis').call(yAxis.ticks(4));
            }
        },
        drawAngleMetric: function() {
            const svg = d3.select('.beam').attr('width', () => {
                return graphToolbox.SVGProp.width;
            })
            .attr('height', () => {
                return graphToolbox.SVGProp.height;
            })
            .style('background', () => {
                return graphToolbox.SVGProp.backgroundColor;
            }).style('display', 'block'),

            width = +svg.attr('width') - graphToolbox.margin.left - graphToolbox.margin.right,
            height = +svg.attr('height') - graphToolbox.margin.top - graphToolbox.margin.bottom,
            x = d3.scaleLinear().range([0, width]),
            y = d3.scaleLinear().range([height, 0]),            
            xAxis = d3.axisBottom(x),
            yAxis = d3.axisLeft(y),
            line = d3.line().x( (d) => { return x(d.x); }).y( (d) => { return y(d.y); });

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

             function angleShapGenerator() {
                let b = angleWidth,
                t = angleThickness,
                d = angleDepth;
                return `M ${x(0)}, ${y(0)}
                        L ${x(b)}, ${y(0)}
                        L ${x(b)}, ${y(t/2)}
                        A ${x(t/2)}, ${y(t/2)} 0 0 0 ${x(b - t/2)} ${y(t)}
                        L ${x(t + t/2)}, ${y(t)}
                        A ${x(t/2)}, ${y(t/2)} 0 0 1 ${x(t)}, ${y(t + t/2)}
                        L ${x(t)}, ${y(d - t/2)}
                        A ${x(t/2)}, ${y(t/2)} 0 0 0 ${x(t/2)}, ${y(d)}
                        L ${x(0)}, ${y(d)}
                        L ${x(0)}, ${y(0)}
                `;
            };
            
            if(document.querySelectorAll('.beam #grpRoot').length == 0){
                const g = svg.append('g').attr('id', 'grpRoot').attr('transform', 'translate(' + graphToolbox.margin.left + ' ,' + graphToolbox.margin.top + ')');

                // Append title
                g.append('text').classed('title', true).attr('x', () => { return width*0.25; }).attr('y', () => { return -graphToolbox.margin.top * 0.5; })
                .text('Equal Legged Angle').style('text-anchor', 'start').append('tspan').attr('dy', 10)
                .attr('x', () => { return width*0.25; })
                .text('milimeters');

                g.append('g').attr('class', 'grpPath').append('path').datum(angleBeamData)
                .attr('d', line).classed('shape', true).style('stroke', '#000')
                .style('fill', '#ccc').style('shape-rendering', 'geometricPrecision');

                /*g.append('path').classed('path', true)
                    .attr('d', angleShapGenerator).style('stroke', 'red').style('fill', 'lightsteelblue').style('shape-rendering', 'geometricPrecision').style('stroke-width', '0.75');*/


                g.append('g').attr('class', 'x-axis axis').attr('transform', 'translate(0,' + (height + graphToolbox.margin.bottom * 0.25) +')')
                .style('font-size', '8px')
                .call(xAxis.ticks(4));

                g.append('g').attr('class', 'y-axis axis').style('font-size', '8px')
                .attr('transform', 'translate(' + (-graphToolbox.margin.left * 0.25) + ',' + 0 +')')
                .call(yAxis.ticks(4));                

                let beamDim = g.append('g').attr('class', 'dim').attr('id', 'dim').style('display', 'none');                  
                // Beam Depth : d
                beamDim.append('line').attr('class', 'beamHeigthLine')
                    .attr('x1', () => {
                        return (-graphToolbox.margin.left * 0.25);
                    })
                    .attr('x2', () => {
                        return (-graphToolbox.margin.left * 0.25);
                    })
                    .attr('y1', () => {
                        return y( angleDepth );
                    })
                    .attr('y2', () => {
                        return y(0);
                    }).style('marker-start', 'url(#arrow)').style('marker-end', 'url(#arrow)')
                    .style('stroke', '#000');
                    

                    // beam depth label
                    beamDim.append('text').attr('class', 'beamHeightLabel')
                    .attr('x', () => {
                        return (-graphToolbox.margin.left * 0.5 - 20);
                    })
                    .attr('y', () => {
                       
                        return y( ( angleDepth / 2 ) );
                            
                    })
                    .attr('transform', 'rotate(90' + ',' + (-graphToolbox.margin.left * 0.25 - 10) + ' ,' + y( ( angleDepth / 2 ) ) + ')')
                    .text('d = ' + angleDepth + ' mm');

                // Beam width : b
                beamDim.append('line').attr('class','beamWidthLine')
                    .attr('x1', () => {
                        return x(0);
                    })
                    .attr('x2', () => {
                        return x(angleWidth);
                    })
                    .attr('y1', () => {
                        return (height) + (graphToolbox.margin.bottom * 0.5);
                    })
                    .attr('y2', () => {
                        return (height) + (graphToolbox.margin.bottom * 0.5);
                    }).style('marker-start', 'url(#arrow)').style('marker-end', 'url(#arrow)')
                    .style('stroke', '#000');

                beamDim.append('text').attr('class', 'beamWidthLabel')
                    .attr('x', () => {
                       return x( angleWidth / 2 );
                    })
                    .attr('y', () => {
                        return (height) + (graphToolbox.margin.bottom * 0.35);
                    })
                    .text('b = ' + angleWidth + 'mm');

                // beam thickness
                beamDim.append('g').classed('grpThickness', true).append('line').classed('ext_line_upper', true)
                    .attr('x1', () => {
                        return  ( width + 2 );
                    })
                    .attr('x2', () => {
                        return (width + graphToolbox.margin.right / 2);
                    })
                    .attr('y1', () => {
                        return y(angleThickness);
                    })
                    .attr('y2', () => {
                        return y(angleThickness);
                    }).style('stroke', '#000');

                    d3.select('.grpThickness').append('line').classed('ext_line_lower', true)
                    .attr('x1', () => {
                        return  ( width + 2 );
                    })
                    .attr('x2', () => {
                        return (width + 2 + graphToolbox.margin.right / 2);
                    })
                    .attr('y1', () => {
                        return y(0);
                    })
                    .attr('y2', () => {
                        return y(0);
                    }).style('stroke', '#000');
                
                d3.select('.grpThickness').append('line').classed('tickLine_above', true)
                    .attr('x1', () => {
                        return  width  + graphToolbox.margin.right*0.25 ;
                    })
                    .attr('x2', () => {
                        return width  + graphToolbox.margin.right*0.25;
                    })
                    .attr('y1', () => {
                        return y(angleThickness);
                    })
                    .attr('y2', () => {
                        return y(angleThickness * 2);
                    }).style('marker-start', 'url(#arrow)').style('stroke', '#000');

                d3.select('.grpThickness').append('line').classed('tickLine_above_adden', true)
                    .attr('x1', () => {
                        return width  + graphToolbox.margin.right*0.25 ;
                    })
                    .attr('x2', () => {
                        return width*0.65  + graphToolbox.margin.right*0.25 ;
                    })
                    .attr('y1', () => {
                        return y(angleThickness*2);
                    })
                    .attr('y2', () => {
                        return y(angleThickness*2);
                    }).style('stroke', '#000');


                d3.select('.grpThickness').append('line').classed('thickLine_below', true)
                .attr('x1', () => {
                    return  width  + graphToolbox.margin.right*0.25 ;
                })
                .attr('x2', () => {
                    return width  + graphToolbox.margin.right*0.25;
                })
                .attr('y1', () => {
                    return y(0);
                })
                .attr('y2', () => {
                    return y(-angleThickness);
                }).style('marker-start', 'url(#arrow)').style('stroke', '#000');

                d3.select('.grpThickness').append('text').classed('beamThicknessLabel', true)
                    .attr('x', () => {
                        return width*0.85 + graphToolbox.margin.right*0.125;
                    })
                    .attr('y', () => {
                        return y(angleThickness * 2.125);
                    })
                    //.attr('transform', 'rotate(' + width + graphToolbox.margin.right + ',' + y(angleThickness * 2) + ')')
                    .text('t = ' + angleThickness + 'mm');

                // Center of gravity
                var cg = beamDim.append('g').classed('centerGravity', true)
                    .style('marker-start', 'url(#dot)').style('marker-end', 'url(#arrow)');
                    cg.append('circle').classed('centerPoint', true)
                    .attr('cx', () => {
                        return x(angleWidth/2);
                    })
                    .attr('cy', () => {
                        return y(angleDepth/2);
                    })
                    .attr('r', 5)
                    .style('fill', 'none').style('stroke', '#000');
        
                cg.append('line').classed('cgy', true).attr('x1', () => { return x(angleWidth/2); }).attr('x2', () => { return x(angleWidth/2); })
                    .attr('y1', () => { return y(angleDepth/2); }).attr('y2', () => { return y(angleDepth - angleDepth * 0.25); }).style('stroke-dasharray', 3)
                    .style('stroke', '#000');

                cg.append('line').classed('cgx', true)
                    .attr('x1', () => { return x(angleWidth/2); }).attr('x2', () => { return x(angleWidth - angleWidth * 0.25); })
                    .attr('y1', () => { return y(angleDepth/2); }).attr('y2', () => { return y(angleDepth/2); }).style('stroke-dasharray', 3)
                    .style('stroke', '#000');

                cg.append('text').classed('cgxLabel', true)
                    .attr('x', () => { return x(angleWidth - angleWidth * 0.25 + 2); }).attr('y', () => {return y(angleDepth/2)}).style('text-anchor', 'start')
                    .text('cx = '+0.00+'mm');

                cg.append('text').classed('cgyLabel', true).attr('x', () => { return x(angleWidth/2); }).attr('y', () => { return y(angleDepth - angleDepth * 0.25 + 2); })
                    .text('cy = ' + 0.00 + 'mm');
            }else{                
                // update title
                d3.select('.title').transition().duration(100).delay(25).text("Equal Legged Angle");

                // update path                
                d3.select('.shape').datum(angleBeamData).transition().duration(100).delay(50)
                .attr('d', line);

                // update x and y axis
                d3.select('.x-axis').transition().duration(100).delay(80).call(xAxis.ticks(4));
                d3.select('.y-axis').transition().duration(100).delay(75).call(yAxis.ticks(4));
            }
        }   
    }    
});