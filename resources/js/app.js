requirejs.config({
    baseUrl: './resources/js',
    paths: 'd3/d3'
});

requirejs(['lib/d3/d3', 'beamProfile' , 'report' ,'graph'], function(d3, beamProfile, report ,graph) {
    console.log(beamProfile);
    beamProfile.SVGBeamProfile();
    beamProfile.initIbeam();
    report.SVGBeamReport();
    graph.SVGGraph();
});