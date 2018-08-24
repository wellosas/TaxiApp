define(() => {
    return {
        loadFile: function(url) {
            return new Promise( (resolve, reject) => {
                var req = new XMLHttpRequest();
                req.open('GET', url);
        
                req.onload = () => {
                    // This is called even on 404 etc
                    // so check the status
                    if ( req.status == 200 ) {
                        // Resolve the promise
                        resolve(req.response);
                    }else{
                        // Otherwise reject with the status text
                        // which will hopefully be meaningful error
                        reject(Error(req.statusText));
                    }
                };
        
                // Handle Newtwork error
                req.onerror = () => {
                    reject(Error('Network Error !'));
                };
        
                // Make the request
                req.send();
            });
        }
    }
});