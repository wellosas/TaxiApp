requirejs.config({
    baseUrl: './resources/js',
    paths: 'd3/d3'
});

requirejs([
    'lib/d3/d3', 
    'beamProfile', 
    'report',
    'graph',
    'selectOptionList',
    'beamconfig'
], function(d3, beamProfile, report ,graph, selectOptionList, beamconfig) {
    report.SVGBeamReport();
    graph.SVGGraph();
    selectOptionList.sel();
    selectOptionList.selectOptionBeamShapeMetric();
    selectOptionList.selectOptionBeamDesignationMetric();
    beamconfig.initBeamWindow();
});