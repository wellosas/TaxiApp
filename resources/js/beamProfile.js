define([
    'lib/d3/d3'
], function(d3) {
    'use strict';
    return {
        initIbeam: function() {
            let sideMenu = document.querySelector('.sideMenu');
            let svg = d3.select('.beam')
                    .attr('width', () => { return 300; })
                    .attr('height', () => { return 125; })
                    .style('display', 'block');

            /**
             * Check to see if title is already present in the
             * DOM element, if not append a new title
             */
            let svgTitle = document.querySelectorAll('svg title');
            if(svgTitle.length == 0){
                svg.append('title')
                .text('I Beam Profile');
            }else{
                return;
            }
            
            /**
             * Check if defs element is already part of the DOM
             * if not create one
             */
            let defsLength = document.querySelectorAll('defs');           
            if( defsLength.length == 0 ) {
                var defs = svg.append('defs');
            }else{ return; }

            var grpIbeam =defs.append('g')
                .attr('id', 'ibeam');
            
            grpIbeam.append('path')
                .attr('d', () => {
                    let flangeWidth = parseFloat(svg.attr('width')) * 0.5;
                    let beamHeight = parseFloat(svg.attr('height')) * 0.75;
                    let flangeThickness = parseFloat(svg.attr('height')) * 0.125;
                    return `
                    M0, 0
                    L${flangeWidth}, 0
                    L${flangeWidth}, ${flangeThickness}
                    L${flangeWidth/2 + flangeWidth/8}, ${flangeThickness}
                    L${flangeWidth/2 + flangeWidth/8}, ${beamHeight - flangeThickness}
                    L${flangeWidth}, ${beamHeight - flangeThickness}
                    L${flangeWidth}, ${beamHeight}
                    L0, ${beamHeight}
                    L0, ${beamHeight - flangeThickness}
                    L${flangeWidth/2 - flangeWidth/8}, ${beamHeight - flangeThickness}
                    L${flangeWidth/2 - flangeWidth/8}, ${flangeThickness}
                    L0, ${flangeThickness}
                    Z
                    `
                })
                .style('stroke', '#000')
                .style('fill', 'silver');

                grpIbeam.append('line')
                    .attr('id', 'x-axis')
                    .attr('x1', () => {
                        return parseFloat(svg.attr('width'))/4;
                    })
                    .attr('y1', -20)
                    .attr('x2', () => {
                        return parseFloat(svg.attr('width'))/4;
                    })
                    .attr('y2', () => {
                        return parseFloat(svg.attr('height')) * 1.25;
                    })
                    .style('stroke', "red")
                    .style('stroke-width', 0.5)
                    .style('stroke-dasharray', '4 1 2 3');

            /**
             * Check if use element is already appended to the DOM
             */

             var use = document.querySelectorAll('use');             
             if(use.length == 0){
                svg.append('use')
                .attr('xlink:href', '#ibeam')
                .attr('x', ()=> {
                    return  parseFloat(svg.attr('width')) * 0.25;
                })
                .attr('y', ()=> {
                    return parseFloat( svg.attr('height') ) * 0.125;
                });

                /**
                 * Grid Horizontal - Vertical
                 */
                var grid = defs.append('g')
                .attr('id', 'grid');
                var i = parseFloat(svg.attr('width'))/20;
                for ( i = 0; i < parseFloat(svg.attr('width')); i+=20) {
                    grid.append('line')
                        .attr('id', 'horizontalGrid')
                        .attr('x1', () => {
                            return i;
                        })
                        .attr('y1', 0)
                        .attr('x2', () => {
                            return i;
                        })
                        .attr('y2', () => {
                            return parseFloat(svg.attr('height'));
                        })
                        .style('stroke-dasharray', '5')
                        .style('stroke-width', 0.5)
                        .style('stroke', '#000');
                }

                let j = parseFloat(svg.attr('height'))/20;
                for( j = 0; j < parseFloat(svg.attr('height')); j+=20){
                    grid.append('line')
                        .attr('id', 'horizontalGrid')
                        .attr('x1', () => {
                            return 0;
                        })
                        .attr('y1', () => { return j; })
                        .attr('x2', () => {
                            return parseFloat(svg.attr('width'));
                        })
                        .attr('y2', () => {
                            return j;
                        })
                        .style('stroke-dasharray', '5')
                        .style('stroke-width', 0.5)
                        .style('stroke', '#000');
                }
                svg.append('use')
                .attr('xlink:href', '#grid')
                .attr('x', 0)
                .attr('y', 0);

                /**
                 * Dimension
                 * with arrow heads and circle
                 */
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

                /**
                 * Flange Width Dimension
                 */
                const GRPFlangeDimension = defs.append('g')
                        .attr('id', 'GRPFlangeDimension');
                const FlangeWidthDimension = parseFloat(svg.attr('width')) * 0.5;
                const FlangeHeightDimension = parseFloat(svg.attr('height')) * 0.5;
                GRPFlangeDimension.append('line')
                    .attr('id', 'FlangeWidthDimension')
                    .attr('x1', () => { return 0; })
                    .attr('y1', () => { return -20; })
                    .attr('x2', () => { return FlangeWidthDimension; })
                    .attr('y2', () => { return -20; })
                    .attr('stroke', '#000')
                    .attr('stroke-width', 1)
                    .attr('marker-start', 'url(#arrow)')
                    .attr('marker-end', 'url(#arrow)');

                GRPFlangeDimension.append('text')
                    .attr('id', "flangeWithDimensionLabel")
                    .attr('x', () => { return FlangeWidthDimension * 0.25; })
                    .attr('y', () => { return -22; })
                    //.attr('dy', -8)
                    .style('text-anchor', 'start').style('fill', '#000')
                    .text('d = 0.00');

                /**
                 * Display Dimension
                 */
                svg.append('use')
                    .attr('xlink:href', '#GRPFlangeDimension')
                    .attr('x', () => { return FlangeWidthDimension * 0.5; })
                    .attr('y', () => { return FlangeHeightDimension * 0.45; });
             }else{
               return;
             }
        }
    }    
});