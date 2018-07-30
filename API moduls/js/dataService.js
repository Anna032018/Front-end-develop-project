
function doAJAX(file){

    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        
        xhr.open('GET', file, true);
        xhr.send();

        xhr.onreadystatechange = function(){
            if (xhr.readyState != 4) {
                return;
            }
            
            if (xhr.status != 200 || xhr.responseText == '{}') {
                reject(xhr);
            } else {
                resolve(JSON.parse(xhr.responseText));
            }
        }   
    });
}


module.exports = { 
    doAJAX   
};
