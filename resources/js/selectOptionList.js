define([
    'beamProfile',
    'fileLoader',
    'lib/d3/d3',
    'graphToolbox'
    ], 
    function(beamProfile, fileLoader, d3, graphToolbox) {
    return {
        sel: function() {
            
            document.querySelector('#sys_int_units').addEventListener('change', () => {
                this.changeEventHandler();
            });        
        },
        changeEventHandler: function(s1, s2) {
            s1 = document.querySelector('#sys_int_units');
            s2 = document.querySelector('#beam_shape');
            s2.innerHTML = "";

            if(s1.value == "mm") {
                var optionListArray = ["|","w|W", "c|C", "hss|HSS", "angle|Angle"];
            }
            for( let optionList in optionListArray){
                var pair = optionListArray[optionList].split("|");
                var newOption = document.createElement('option');
                newOption.value = pair[0];
                newOption.innerHTML = pair[1];
                s2.options.add(newOption);
            }
        },
        selectOptionBeamShapeMetric: function() {
            document.querySelector('#beam_shape').addEventListener('change', () => {
                this.onChangeBeamShapeMetric();
            }, false);
        },
        onChangeBeamShapeMetric: function(s1 , s2) {
            s1 = document.querySelector('#beam_shape');
            s2 = document.querySelector('#beam_designation');
            let selIndex = s1.selectedIndex;
            s2.innerHTML = "";
            if (s1.value == ""){
                return;
            }else if (s1.options[selIndex].text == "W") {
                beamProfile.drawIbeamMetric();
                /*d3.json('./resources/doc/beamGeoProp.json', (d) => {
                     console.log(d.BeamsGeometricData[0].data[0]);

                    var wBeam = d.BeamsGeometricData[0].data;

                    for( var i in  wBeam )
                    {
                        var newOption = document.createElement('option')
                            newOption.innerHTML = wBeam[i];
                            s2.options.add(newOption);
                    }
                });*/
               fileLoader.ajax('./resources/doc/wBeamMetric.json')
                    .then((e) => { 
                        var wBeam = JSON.parse(e);
                        for(var i in wBeam){
                            var newOption = document.createElement('option')
                            newOption.innerHTML = wBeam[i].designation;
                            s2.options.add(newOption);                           
                        }                       
                     })
                    .catch((err) => { return console.log(err); });
            }
            else if (s1.options[selIndex].text == "C") {               
                    beamProfile.drawCChannelMetric();
                    fileLoader.ajax('./resources/doc/cChannelMetric.json').then((o) => {
                        var cChannel = JSON.parse(o);
                        for(var c in cChannel){
                            //console.log(cChannel[c].designation);
                            var newOption = document.createElement('option')
                            newOption.innerHTML = cChannel[c].designation;
                            s2.options.add(newOption);
                        }
                    }).catch((err) => { return console.log(err); });
                
            }else if( s1.options[selIndex].text == "HSS" ){
                beamProfile.drawHssMetric();                
            }else if (s1.options[selIndex].text == "Angle") {
                beamProfile.drawAngleMetric();
                fileLoader.ajax('./resources/doc/angleBeamMetric.json')
                    .then( (o) => {
                        var angleBeam = JSON.parse(o);
                        //console.log(angleBeam);
                        for(var l in angleBeam){
                            //console.log(cChannel[c].designation);
                            var newOption = document.createElement('option')
                            newOption.innerHTML = angleBeam[l].designation;
                            s2.options.add(newOption);
                        }
                    })
                    .catch((err) => { return console.log(err); });
            }
        },
        selectOptionBeamDesignationMetric: function(){
            document.querySelector('#beam_designation').addEventListener('change', () => {
                this.onChangeDesignationMetric();
                this.onChangeAngleMetric();
            }, false);

        },
        onChangeDesignationMetric: function(s1) {
            var s1 = document.querySelector('#beam_designation');
            let selIndex = s1.selectedIndex;           

            let switchAction = s1.options[selIndex].text;

            let svg = d3.select('.beam');
            svg.style('background-color', () => {
                return graphToolbox.SVGProp.backgroundColor;
            });

            let width = +svg.attr('width') - graphToolbox.margin.left - graphToolbox.margin.right;
            let height = +svg.attr('height') - graphToolbox.margin.top - graphToolbox.margin.bottom;
            let x = d3.scaleLinear().range([0, width]);
            let y =  d3.scaleLinear().range([height, 0]);
            let xAxis = d3.axisBottom(x);
            let yAxis = d3.axisLeft(y);
            let line = d3.line().x( (d) => { return x(d.x); }).y( (d) => { return y(d.y); });

            fileLoader.ajax('./resources/doc/wBeamMetric.json')
                .then( (e) => {
                    let wBeamDataset = JSON.parse(e);                   
                    switch (switchAction) {
                        case "W920x967" :
                            var data = [
                                {
                                    x : 0,
                                    y : 0
                                },
                                {
                                    x : wBeamDataset[1].topFlangeWidth,
                                    y : 0
                                },
                                {
                                    x : wBeamDataset[1].topFlangeWidth,
                                    y : wBeamDataset[1].topFlangeThickness,
                                },
                                {
                                    x : (wBeamDataset[1].topFlangeWidth * 0.5) + (wBeamDataset[1].web * 0.5),
                                    y : wBeamDataset[1].topFlangeThickness
                                },
                                {
                                    x : (wBeamDataset[1].topFlangeWidth * 0.5) + (wBeamDataset[1].web * 0.5),
                                    y : wBeamDataset[1].distance - wBeamDataset[1].topFlangeThickness
                                },
                                {
                                    x : wBeamDataset[1].topFlangeWidth,
                                    y : wBeamDataset[1].distance - wBeamDataset[1].topFlangeThickness
                                },
                                {
                                    x : wBeamDataset[1].topFlangeWidth,
                                    y : wBeamDataset[1].distance
                                },
                                {
                                    x : 0,
                                    y : wBeamDataset[1].distance
                                },
                                {
                                    x : 0,
                                    y : wBeamDataset[1].distance - wBeamDataset[1].topFlangeThickness
                                },
                                {
                                    x : (wBeamDataset[1].topFlangeWidth * 0.5) - (wBeamDataset[1].web * 0.5),
                                    y :  wBeamDataset[1].distance - wBeamDataset[1].topFlangeThickness
                                },
                                {
                                    x : (wBeamDataset[1].topFlangeWidth * 0.5) - (wBeamDataset[1].web * 0.5),
                                    y : wBeamDataset[1].topFlangeThickness
                                },
                                {
                                    x : 0,
                                    y : wBeamDataset[1].topFlangeThickness
                                },
                                {
                                    x : 0,
                                    y : 0
                                }
                            ];
                            data.forEach((d) => {
                                d.x = +d.x;
                                d.y = +d.y;                                                     
                            });

                            x.domain(d3.extent(data, (d) => { return d.x; }));
                            y.domain(d3.extent(data, (d) => { return d.y; }));

                            // Update Profile
                            d3.select('.line').datum(data).transition().duration(100).delay((d, i) => { return i / 2; })
                            .attr('d', line);

                            var wBeamDerivedProp = {
                                wBeamWidth : wBeamDataset[1].topFlangeWidth,
                                wBeamDepth : wBeamDataset[1].distance,
                                wBeamThickness : wBeamDataset[1].topFlangeThickness,
                                wBeamWeb : wBeamDataset[1].web,
                                flangeAreaTopBottom  : function(){
                                    // Center of gravity for bottom flange
                                    // Horizontal axis coincide and parallel to the bottom flange                                    
                                    return this.wBeamWidth * this.wBeamThickness;
                                },
                                CMGBottomFlangeVertical : function(){
                                    return this.wBeamThickness * 0.5;
                                },
                                CMGTopFlangeVertical : function(){
                                    return (this.wBeamDepth - this.wBeamThickness - this.wBeamThickness)  + this.wBeamThickness + this.wBeamThickness / 2;
                                },
                                webArea: function() {
                                    // Middle section                                    
                                    return (this.wBeamDepth - 2 * this.wBeamThickness) * this.wBeamWeb;
                                },
                                CMGWebVertical : function() {
                                    return  this.wBeamThickness + (this.wBeamDepth - this.wBeamThickness - this.wBeamThickness) / 2;
                                },
                                CGMWBeamVertical : function() {
                                    let ay = this.flangeAreaTopBottom() * this.CMGBottomFlangeVertical() + this.webArea() * this.CMGWebVertical()  + this.flangeAreaTopBottom() * this.CMGTopFlangeVertical(),
                                    sa = this.flangeAreaTopBottom() + this.webArea() + this.flangeAreaTopBottom();
                                    return ( ay ) / ( sa );
                                },
                                CMGBeamHorizontal : function() {
                                    return this.wBeamWidth * 0.5;
                                }
                              
                            };        
                
                            // Update Title
                            d3.select('.title').text(wBeamDataset[1].designation);

                            //Update Dimensions and label
                            d3.select('.iBeamHeightLine')
                            .attr('x1', () => {
                                return x(-graphToolbox.margin.left * 0.5 - 30);
                            })
                            .attr('x2', () => {
                                return x(-graphToolbox.margin.left * 0.5 - 30);
                            })
                            .attr('y1', () => {
                                return y(0);
                            }).transition().duration(100).delay(50)
                            .attr('y2', () => {
                                return y(wBeamDataset[1].distance);
                            });

                            d3.select('.iBeamHeightLabel').text('d = '+ wBeamDataset[1].distance + ' mm');

                            d3.select('.ibeamWidthLine')
                                .attr('x1', () => {
                                    return x(0);
                                })
                                .attr('x2', () => {
                                    return x(wBeamDataset[1].topFlangeWidth);
                                })
                                .attr('y1', () => {
                                    return y( -height + graphToolbox.margin.bottom + graphToolbox.margin.top + 20 );
                                })
                                .attr('y2', () => {
                                    return y( -height + graphToolbox.margin.bottom + graphToolbox.margin.top + 20 );
                                });

                            d3.select('.ibeamWidthLabel')
                            .attr('x', () => {
                                return x(wBeamDataset[1].topFlangeWidth * 0.5);
                            })
                            .attr('y', () => {
                                return y(-height + graphToolbox.margin.bottom + graphToolbox.margin.top + 40)
                            })
                            .text('b = '+wBeamDataset[1].topFlangeWidth+'mm');

                            d3.select('.ibeamWebLine')
                            .attr('x1', () => {
                                return x(wBeamDataset[1].topFlangeWidth * 0.5 + wBeamDataset[1].web * 0.5);
                            })
                            .attr('x2', () => {
                                return x(wBeamDataset[1].topFlangeWidth  * 0.75);
                            })
                            .attr('y1', () => {
                                return y(wBeamDataset[1].distance * 0.65);
                            })
                            .attr('y2', () => {
                                return y(wBeamDataset[1].distance * 0.65);
                            });

                            d3.select('.ibeamWebLabel')
                            .attr('x', () => {
                                return x( (wBeamDataset[1].topFlangeWidth * 0.5 + wBeamDataset[1].web * 0.5 + 20) / 1 );
                            })
                            .attr('y', () => {
                                return y( wBeamDataset[1].distance * 0.65  + 20);
                            })
                            .text('Web = '+wBeamDataset[1].web +'mm');

                            d3.select('.flangeThicknessLine')
                            .attr('d', () => {
                                return `
                                M ${x(wBeamDataset[1].topFlangeWidth * 0.85)}, ${y(wBeamDataset[1].distance)}
                                    L ${x(wBeamDataset[1].topFlangeWidth * 0.85)}, ${y(wBeamDataset[1].topFlangeThickness + wBeamDataset[1].distance)}
                                    ${x(wBeamDataset[1].topFlangeWidth)}, ${y(wBeamDataset[1].topFlangeThickness  + wBeamDataset[1].distance)}                                       
                                    `
                            });

                            d3.select('.flangeThicknessLineBottom')
                            .attr('x1', () => {
                                return x(wBeamDataset[1].topFlangeWidth * 0.85);
                            })
                            .attr('x2', () => {
                                return x(wBeamDataset[1].topFlangeWidth * 0.85);
                            })
                            .attr('y1', () => {
                                return y(wBeamDataset[1].distance - wBeamDataset[1].topFlangeThickness );
                            })
                            .attr('y2', () => {
                                return y(wBeamDataset[1].distance - wBeamDataset[1].topFlangeThickness * 2);
                            });

                            d3.select('.flangeThicknessLabel')
                            .attr('x', () => {
                                return x(wBeamDataset[1].topFlangeWidth * 0.85);
                            })
                            .attr('dy', -4.0)
                            .attr('y', () => {
                                return y(wBeamDataset[1].distance + wBeamDataset[1].topFlangeThickness  * 0.95);
                            })
                            .text('Tk = ' + wBeamDataset[1].topFlangeThickness + 'mm');

                            d3.select('.cg_xy')
                            .attr('class', 'cg_xy').attr('cx', () => {
                                
                                return x( wBeamDerivedProp.CMGBeamHorizontal() );
                            })
                            .attr('cy', () => {
                                
                                return y( wBeamDerivedProp.CGMWBeamVertical() );
                            })
                            .attr('r', () => {
                                return x(wBeamDataset[1].web * 0.25);
                            });

                            d3.select('.cgm_x_axis')
                            .attr('x1', () => {
                                return x(wBeamDerivedProp.wBeamWidth * 0.5);
                            })
                            .attr('x2', () => {
                                return x(wBeamDerivedProp.wBeamWidth * 0.5 + wBeamDerivedProp.wBeamWidth * 0.25);
                            })
                            .attr('y1', () => {
                                return y(wBeamDerivedProp.wBeamDepth * 0.5);
                            })
                            .attr('y2', () => {
                                return y(wBeamDerivedProp.wBeamDepth * 0.5);
                            });

                            d3.select('.cgm_y_axis')
                            .attr('x1', () => {
                                return x(wBeamDataset[1].topFlangeWidth * 0.5);
                            })
                            .attr('x2', () => {
                                return x(wBeamDataset[1].topFlangeWidth * 0.5);
                            })
                            .attr('y1', () => {
                                return y(wBeamDataset[1].distance * 0.5);
                            })
                            .attr('y2', () => {
                                return y(wBeamDataset[1].distance * 0.5 + wBeamDataset[1].distance * 0.25);
                            });

                            d3.select('.cgm_x_axis_label')
                            .attr('x', () => {
                                return x(wBeamDataset[1].topFlangeWidth * 0.5 + wBeamDataset[1].topFlangeWidth * 0.25 + 10);
                            })
                            .attr('y', () => {
                                return y(wBeamDataset[1].distance * 0.5);
                            }).text('Cx = '+wBeamDerivedProp.CMGBeamHorizontal().toFixed(2) + 'mm');

                            d3.select('.cgm_y_axis_label')
                            .attr('x', () => {
                                return x(wBeamDataset[1].topFlangeWidth * 0.5);
                            })
                            .attr('y', () => {
                                return y(wBeamDataset[1].distance * 0.5 + wBeamDataset[1].distance * 0.25 + 20);
                            })
                            .attr('dx', -5)
                            .text('Cy = ' + wBeamDerivedProp.CGMWBeamVertical().toFixed(2) + 'mm');
                        break;

                        case "W920x784" :
                            var data = [
                                {
                                    x : 0,
                                    y : 0
                                },
                                {
                                    x : wBeamDataset[2].topFlangeWidth,
                                    y : 0
                                },
                                {
                                    x : wBeamDataset[2].topFlangeWidth,
                                    y : wBeamDataset[2].topFlangeThickness,
                                },
                                {
                                    x : (wBeamDataset[2].topFlangeWidth * 0.5) + (wBeamDataset[2].web * 0.5),
                                    y : wBeamDataset[2].topFlangeThickness
                                },
                                {
                                    x : (wBeamDataset[2].topFlangeWidth * 0.5) + (wBeamDataset[2].web * 0.5),
                                    y : wBeamDataset[2].distance - wBeamDataset[2].topFlangeThickness
                                },
                                {
                                    x : wBeamDataset[2].topFlangeWidth,
                                    y : wBeamDataset[2].distance - wBeamDataset[2].topFlangeThickness
                                },
                                {
                                    x : wBeamDataset[2].topFlangeWidth,
                                    y : wBeamDataset[2].distance
                                },
                                {
                                    x : 0,
                                    y : wBeamDataset[2].distance
                                },
                                {
                                    x : 0,
                                    y : wBeamDataset[2].distance - wBeamDataset[2].topFlangeThickness
                                },
                                {
                                    x : (wBeamDataset[2].topFlangeWidth * 0.5) - (wBeamDataset[2].web * 0.5),
                                    y :  wBeamDataset[2].distance - wBeamDataset[2].topFlangeThickness
                                },
                                {
                                    x : (wBeamDataset[2].topFlangeWidth * 0.5) - (wBeamDataset[2].web * 0.5),
                                    y : wBeamDataset[2].topFlangeThickness
                                },
                                {
                                    x : 0,
                                    y : wBeamDataset[2].topFlangeThickness
                                },
                                {
                                    x : 0,
                                    y : 0
                                }
                            ];
                            data.forEach((d) => {
                                d.x = +d.x;
                                d.y = +d.y;                        
                            });

                            x.domain(d3.extent(data, (d) => { return d.x; }));
                            y.domain(d3.extent(data, (d) => { return d.y; }));

                            // Update Profile
                            d3.select('.line').datum(data).transition().duration(100).delay((d, i) => { return i / 2; })
                            .attr('d', line);

                            var wBeamDerivedProp = {
                                wBeamWidth : wBeamDataset[2].topFlangeWidth,
                                wBeamDepth : wBeamDataset[2].distance,
                                wBeamThickness : wBeamDataset[2].topFlangeThickness,
                                wBeamWeb : wBeamDataset[2].web,
                                flangeAreaTopBottom  : function(){
                                    // Center of gravity for bottom flange
                                    // Horizontal axis coincide and parallel to the bottom flange                                    
                                    return this.wBeamWidth * this.wBeamThickness;
                                },
                                CMGBottomFlangeVertical : function(){
                                    return this.wBeamThickness * 0.5;
                                },
                                CMGTopFlangeVertical : function(){
                                    return (this.wBeamDepth - this.wBeamThickness - this.wBeamThickness)  + this.wBeamThickness + this.wBeamThickness / 2;
                                },
                                webArea: function() {
                                    // Middle section                                    
                                    return (this.wBeamDepth - 2 * this.wBeamThickness) * this.wBeamWeb;
                                },
                                CMGWebVertical : function() {
                                    return  this.wBeamThickness + (this.wBeamDepth - this.wBeamThickness - this.wBeamThickness) / 2;
                                },
                                CGMWBeamVertical : function() {
                                    let ay = this.flangeAreaTopBottom() * this.CMGBottomFlangeVertical() + this.webArea() * this.CMGWebVertical()  + this.flangeAreaTopBottom() * this.CMGTopFlangeVertical(),
                                    sa = this.flangeAreaTopBottom() + this.webArea() + this.flangeAreaTopBottom();
                                    return ( ay ) / ( sa );
                                },
                                CMGBeamHorizontal : function() {
                                    return this.wBeamWidth * 0.5;
                                }
                              
                            };
                            
                            // Update Title
                            d3.select('.title').text(wBeamDataset[2].designation);

                            //Update Dimensions and label
                            d3.select('.iBeamHeightLine')
                            .attr('x1', () => {
                                return x(-graphToolbox.margin.left * 0.5 - 30);
                            })
                            .attr('x2', () => {
                                return x(-graphToolbox.margin.left * 0.5 - 30);
                            })
                            .attr('y1', () => {
                                return y(0);
                            }).transition().duration(100).delay(50)
                            .attr('y2', () => {
                                return y(wBeamDerivedProp.wBeamDepth);
                            });

                            d3.select('.iBeamHeightLabel').text('d = '+ wBeamDataset[2].distance + ' mm');

                            d3.select('.ibeamWidthLine')
                                .attr('x1', () => {
                                    return x(0);
                                })
                                .attr('x2', () => {
                                    return x(wBeamDataset[2].topFlangeWidth);
                                })
                                .attr('y1', () => {
                                    return y( -height + graphToolbox.margin.bottom + graphToolbox.margin.top + 20 );
                                })
                                .attr('y2', () => {
                                    return y( -height + graphToolbox.margin.bottom + graphToolbox.margin.top + 20 );
                                });
                        break;
                    }// end switch statment
                })
                .catch((err) => { return console.log(err); });
            
        },
        selectOptionAngleDesignationMetric : function(){
            document.querySelector('#beam_designation').addEventListener('change', () => {

            },false);
        },
        onChangeAngleMetric: function(s) {
            var s = document.querySelector('#beam_designation');
            let selIndex = s.selectedIndex,
            switchAction = s.options[selIndex].text;
            const svg = d3.select('.beam').style('background-color', () => {
                return graphToolbox.SVGProp.backgroundColor;
            });
            let width = +svg.attr('width') - graphToolbox.margin.left - graphToolbox.margin.right;
            let height = +svg.attr('height') - graphToolbox.margin.top - graphToolbox.margin.bottom;
            let x = d3.scaleLinear().range([0, width]);
            let y =  d3.scaleLinear().range([height, 0]);
            let xAxis = d3.axisBottom(x);
            let yAxis = d3.axisLeft(y);
            let line = d3.line().x( (d) => { return x(d.x); }).y( (d) => { return y(d.y); });

            fileLoader.ajax('./resources/doc/angleBeamMetric.json')
                .then((o) => {
                    let angleBeamdata = JSON.parse(o);
                    angleBeamdata.forEach((d) => {
                        var map = new Map();
                        map.set(Object.keys(d), Object.values(d));
                        return console.log(map)
                    });
                    switch (switchAction){
                        case "L98x98x9.5":
                            var data = [
                                {
                                    x : 0,
                                    y : 0
                                },
                                {
                                    x : angleBeamdata[1].b,
                                    y : 0
                                },
                                {
                                    x : angleBeamdata[1].b,
                                    y : angleBeamdata[1].t
                                },
                                {
                                    x : angleBeamdata[1].t,
                                    y : angleBeamdata[1].t
                                },
                                {
                                    x : angleBeamdata[1].t,
                                    y : angleBeamdata[1].d
                                },
                                {
                                    x : 0,
                                    y : angleBeamdata[1].d
                                },
                                {
                                    x : 0,
                                    y : 0
                                }
                            ];
                            data.forEach( (d) => {
                                d.x = +d.x;
                                d.y = +d.y;
                                console.log(d.x ,d.y);
                            });

                            var angleAreaProp = {
                                d : angleBeamdata[1].d,
                                b : angleBeamdata[1].b,
                                t : angleBeamdata[1].t,

                                sectionOne_area : function() {
                                    return this.d * this.t;
                                },
                                sectionTwo_area : function(){
                                    return (this.b - this.t) * this.t;
                                },
                                sectionOne_y1 : function(){
                                    return this.d / 2;
                                },
                                sectionTwo_y1 : function(){
                                    return this.t / 2;
                                },
                                sectionOne_x1 : function() {
                                    return this.t / 2;
                                },
                                sectionTwo_x1 : function(){
                                    return (this.b - this.t)/2 + this.t;
                                },
                                angleArea : function(){
                                    return this.sectionOne_area() + this.sectionTwo_area();
                                },
                                angleCy : function(){
                                    return (this.sectionOne_area() * this.sectionOne_y1() + this.sectionTwo_area() * this.sectionTwo_y1()) / (this.angleArea());
                                },
                                angleCx : function(){
                                    return (this.sectionOne_area()*this.sectionOne_x1() + this.sectionTwo_area()*this.sectionTwo_x1()) / (this.angleArea());
                                },
                                print : function() {
                                    var map = new Map();
                                    map.set('Section One Area', this.sectionOne_area());                                   
                                    map.set('Ciy Section One', this.sectionOne_y1());
                                    map.set("Cix Section One", this.sectionOne_x1());
                                    map.set('Section Two Area', this.sectionTwo_area());
                                    map.set('Section Two Ciy', this.sectionTwo_y1());
                                    map.set("Cix Section Two", this.sectionTwo_x1());
                                    map.set('Area', this.angleArea());
                                    map.set('Cy', this.angleCy());
                                    map.set('Cx', this.angleCx());
                                    for ( var [key, value] of map.entries()){
                                        console.log(key + ' => ' + value);
                                    }
                                    //console.table(map);
                                }
                            };
                            x.domain(d3.extent(data, (d) => { return d.x; }));
                            y.domain(d3.extent(data, (d) => { return d.y; }));
                            // update title
                            d3.select('.title').transition().duration(100).delay(25).text(angleBeamdata[1].designation);
                            d3.select('.title').attr('dy', 2).append('tspan').text('Dimensions are in milimeters');
                            // remove x and y axis
                            d3.selectAll('.axis').transition().duration(100).delay(25).remove();
                            // update shape
                            d3.select('.shape').datum(data).transition().duration(100).delay( (d, i) => { return i; })
                                .attr('d', line);
                            //display dimensions and update them
                            d3.select('.dim').style('display', 'block');
                            // update beam depth
                            d3.select('.beamHeigthLine').attr('x1', () => { return -graphToolbox.margin.left * 0.25; })
                                .attr('x2', () => { return -graphToolbox.margin.left * 0.25; })
                                .attr('y1', () => { return y(angleBeamdata[1].d); })
                                .attr('y2', () => { return y(0); });
                            d3.select('.beamHeightLabel').attr('y', () => { return y(angleBeamdata[1].d * 0.5); })
                                .text('d = '+angleBeamdata[1].d + 'mm');

                            // update beam width
                            d3.select('.beamWidthLine').attr('x1', () => { return x(0); })
                                .attr('x2', () => { return x(angleBeamdata[1].b); });

                            d3.select('.beamWidthLabel').attr('x', () => { return x(angleBeamdata[1].b *0.5); })
                                .text('b = '+angleBeamdata[1].b + 'mm');

                            // update beam thickness
                            d3.select('.ext_line_upper').attr('y1', () => { return y(angleBeamdata[1].t); })
                            .attr('y2', () => { return y(angleBeamdata[1].t); });

                            d3.select('.tickLine_above').attr('y1', () => { return y(angleBeamdata[1].t); })
                            .attr('y2', () => { return y(angleBeamdata[1].t * 2); });

                            d3.select('.tickLine_above_adden').attr('y1', () => { return y(angleBeamdata[1].t * 2); })
                                .attr('y2', () => { return y(angleBeamdata[1].t * 2); });

                            d3.select('.beamThicknessLabel').attr('y', () => { return y(angleBeamdata[1].t * 2.125); })
                                .text('t = '+angleBeamdata[1].t+'mm').style('text-anchor', 'middle');

                            d3.select('.centerPoint').attr('cx', () => { return x(angleAreaProp.angleCx()); })
                                .attr('cy', () => { return y(angleAreaProp.angleCy()); });

                            d3.select('.cgy').attr('x1', () => {
                                return x(angleAreaProp.angleCx());
                            })
                            .attr('x2', () => {
                                return x(angleAreaProp.angleCx());
                            })
                            .attr('y1', () => {
                                return y(angleAreaProp.angleCy());
                            })
                            .attr('y2', () => {
                                return y(angleBeamdata[1].d - angleBeamdata[1].d * 0.25);
                            });

                            d3.select('.cgx').attr('x1', () => {
                                return x(angleAreaProp.angleCx());
                            })
                            .attr('x2', () => {
                                return x(angleBeamdata[1].b - angleBeamdata[1].b * 0.25);
                            })
                            .attr('y1', () => {
                                return y(angleAreaProp.angleCy());
                            })
                            .attr('y2', () => {
                                return y(angleAreaProp.angleCy());
                            });

                            d3.select('.cgxLabel').attr('x', () => {
                                return x(angleBeamdata[1].b - angleBeamdata[1].b * 0.25 + 2);
                            })
                            .attr('y', () => {
                                return y(angleAreaProp.angleCy());
                            }).text('Cx = '+angleAreaProp.angleCx().toFixed(2))
                            .style('text-anchor', 'start');

                            d3.select('.cgyLabel').attr('x', () => {
                                return x(angleAreaProp.angleCx());
                            }).attr('y', () => {
                                return y(angleBeamdata[1].d - angleBeamdata[1].d * 0.25 +2)
                            })
                            .style('text-anchor', 'start')
                            .text('Cy = ' + angleAreaProp.angleCy().toFixed(2));
                        break;
                    }
                })
                .catch( (err) => { return console.error(err); })
        }
    
            
    } // end main method
});