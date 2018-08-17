define([
    'lib/d3/d3'
], function(d3) {
    'use strict';
    return {
        initIbeam: function() {
            let sideMenu = document.querySelector('.sideMenu');
            let svg = d3.select('.beam')
                    .attr('width', () => { return 200; })
                    .attr('height', () => { return 200; });
            
            svg.append('title')
                .text('I Beam Profile');
            /**
             * Check if defs element is already part of the DOM
             * if not create one
             */
            let defsLength = document.querySelectorAll('defs');
            console.log('defs length => ', defsLength.length);
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
                    console.groupCollapsed;
                        console.log('flange width => ', flangeWidth);
                        console.log('Beam Height => ', beamHeight)
                        console.log('flange thickness => ', flangeThickness);
                    console.groupEnd;
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
                    .style('stroke-width', 0.75)
                    .style('stroke-dasharray', '4 1 2 3');

            /**
             * Check if use element is already appended to the DOM
             */

             var use = document.querySelectorAll('use');
             console.log('first use length =>', use.length);
             if(use.length == 0){
                svg.append('use')
                .attr('xlink:href', '#ibeam')
                .attr('x', ()=> {
                    return  parseFloat(svg.attr('width')) * 0.25;
                })
                .attr('y', ()=> {
                    return parseFloat( svg.attr('height') ) * 0.125;
                });
             }else if (use.length == 1){
                var grid = defs.append('g')
                .attr('id', 'grid');
            var i = parseFloat(svg.attr('width'))/20;
            console.log('i => ',i);
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
                    .style('stroke-dasharray', '4 1 2 3')
                    .style('stroke-width', 0.5)
                    .style('stroke', 'blue');
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
                    .style('stroke-dasharray', '4 1 2 3')
                    .style('stroke-width', 0.5)
                    .style('stroke', 'blue');
            }
                svg.append('use')
                .attr('xlink:href', '#grid')
                .attr('x', 0)
                .attr('y', 0);
             }
        }
    }    
});