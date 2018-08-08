define([
    'lib/d3/d3'
], function(d3) {
    'use strict';
    return {
        SVGBeamReport: function() {
            d3.select('div .report').append('svg')
            .attr('class', 'beamReport_display')
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        }
    }    
});