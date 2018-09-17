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
            fileLoader.ajax('./resources/doc/angleBeamMetric.json')
                .then((o) => {
                    let angleBeamdata = JSON.parse(o);
                    switch (switchAction){
                        case "L98x98x9.5":
                        console.log(s.options[selIndex].text)
                        break;
                    }
                })
                .catch( (err) => { return console.error(err); })
        }
    
            
    } // end main method
});