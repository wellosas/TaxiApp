/**
 * loading d3.js from lib/d3/d3.js
 */
define([
    'lib/d3/d3'
], function(d3){
    return {
        SVGGraph: function() {
            d3.select('div .graph').append('svg')
                .attr('class', 'graph_display')
                .attr('xmlns', 'http://www.w3.org/2000/svg')
                .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        },
        svgProperties: function() {
            console.log(this.SVGGraph());
        }
    }
});