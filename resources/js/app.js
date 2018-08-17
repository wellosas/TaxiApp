requirejs.config({
    baseUrl: './resources/js',
    paths: 'd3/d3'
});

requirejs(['lib/d3/d3', 'beamProfile' , 'report' ,'graph', 'selectOptionList'], function(d3, beamProfile, report ,graph, selectOptionList) {
    report.SVGBeamReport();
    graph.SVGGraph();
    selectOptionList.sel();
});