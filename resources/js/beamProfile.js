define([
    'lib/d3/d3'
], function(d3) {
    'use strict';
    return {
        SVGBeamProfile: function() {
            d3.select('div .beam-card').append('svg')
            .attr('class', 'beamProfile_display')
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        },
        initIbeam: function() {
            let sideMenu = d3.select('.sideMenu'),
            sel = document.querySelector('.sideMenu');

            console.log('side menu =>', sideMenu);
            var svg = sideMenu.append('svg')
                .attr('class', 'iBeam')
                .attr('xmlns', 'http://www.w3.org/2000/svg')
                .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
                .attr('baseProfile', 'full')
                .attr('width', () => {
                    return parseFloat(sel.offsetWidth) / 2;
                })
                .attr('height', () => {
                    return parseFloat(sel.offsetHeight) / 2;
                })
                .style('border', '1px dotted #ccc')
                .style('background', '#eee');

            svg.append('title')
                .text('I Beam Profile');
            var defs = svg.append('defs');

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

            svg.append('use')
                .attr('xlink:href', '#ibeam')
                .attr('x', ()=> {
                    return (parseFloat(sel.offsetWidth*0.25)) /2;
                })
                .attr('y', ()=> {
                    return parseFloat(sel.offsetHeight/16);
                });

        }
    }    
});