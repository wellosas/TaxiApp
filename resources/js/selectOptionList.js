define([
    'beamProfile',
    'fileLoader',
    'lib/d3/d3'
    ], 
    function(beamProfile, fileLoader, d3) {
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
                            console.log(cChannel[c].designation);
                            var newOption = document.createElement('option')
                            newOption.innerHTML = cChannel[c].designation;
                            s2.options.add(newOption);
                        }
                    }).catch((err) => { return console.log(err); });
                
            }else if( s1.options[selIndex].text == "HSS" ){
                beamProfile.drawHssMetric();
                fileLoader.loadJson('./resources/doc/beam.json');
            }
        },
        selectOptionBeamDesignationMetric: function(){
            document.querySelector('#beam_designation').addEventListener('change', () => {
                this.onChangeDesignationMetric();
            }, false);

        },
        onChangeDesignationMetric: function(s1) {
            var s1 = document.querySelector('#beam_designation');
            let selIndex = s1.selectedIndex;
            console.log('selectedindex => ', selIndex);            

            let switchAction = s1.options[selIndex].text;
            switch (switchAction) {
                case  "W920x967" :
                    fileLoader.ajax('./resources/doc/wBeamMetric.json')
                    .then((e) => {
                        let wBeamDataset = JSON.parse(e);                        

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
                        data.forEach((v) => {
                            v.x = +v.x;
                            v.y = +v.y;                            
                        });
                    })
                    .catch((err) => { return console.log(err)});
                break;
            }            
        }
            
    }
});