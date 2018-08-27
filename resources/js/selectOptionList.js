define([
    'beamProfile',
    'fileLoader'
    ], 
    function(beamProfile, fileLoader) {
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
                var optionListArray = ["|","w|W", "c|C", "hss|HSS"];
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
                var optionListArray = [
                    "|", 
                    "w920x967|W920x967",
                    "w920x784|W920x784"
                ];
                for(let optionList in optionListArray){
                    var pair = optionListArray[optionList].split("|");
                    var newOption = document.createElement('option');
                    newOption.value = pair[0];
                    newOption.innerHTML = pair[1];
                    s2.options.add(newOption);
                }
            }
            else if (s1.selectedIndex == 2) {
                let use = document.querySelectorAll('use');
                if(!use){
                    return;
                }else{
                    beamProfile.drawCChannel();
                }
            }else if( s1.selectedIndex == 3 ){
                beamProfile.drawHssMetric();
                fileLoader.loadFile('./resources/doc/beam.json').then((response) => {
                   return JSON.parse(response);
                })
                .then((response) => {
                    return console.log('Yeh => ', response.ibeamMetric[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
                console.log('lenght prop => ', s1.options[selIndex].text);
            }
        }
            
    }
});