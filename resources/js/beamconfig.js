define([
    'lib/d3/d3'
], function(d3) {
    'use strict';
    return {
        initBeamWindow: function(){
            let defs = d3.select('.beam').append('defs');
            let dotMarker = defs.append('marker').attr('id', 'dot')
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

            let arrowMarker = defs.append('marker')
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

            let svgTitle = defs.append('title').text('Beams Design Properties');
        }
    }
});