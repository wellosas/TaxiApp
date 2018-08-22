define([
    'beamProfile'
    ], 
    function(beamProfile) {
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
            console.dirxml('on change event => ', s1, s2);

            s2.innerHTML = "";
            if (s1.value == ""){
                return;
            }else if (s1.value == "w") {
                beamProfile.initIbeam();
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
            }
        }
            
    }
});