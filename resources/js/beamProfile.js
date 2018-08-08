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
        }
    }    
});