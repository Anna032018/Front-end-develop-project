//var render = require('./render.js');
var data = require('./dataService.js');

//DOM function
//controller

data.doAJAX('https://api.github.com/orgs/hillel-front-end/repos')
            .then(function(response){
               console.log(response);
                var arrForcUrl = response.map(function(item){
                    return item.forks_url;
                });
                return arrForcUrl;
            })
            .then(executeRequests)
            // .then(promiseAll);
            
// better

/*

data
    .doAJAX('https://api.github.com/orgs/hillel-front-end/repos')
    .then(response =>response.map(item => data.doAJAX(item.forks_url))
    .then(promList => console.log(promList))


*/
function promiseAll(arrPromis){
    Promise
        .all(arrPromis)
        .then(function(values){
            console.log(values);
            // values.map(function(item){
            //     var obj = {};
            //     obj.name = item[0].name;
            //     obj.fork = item.map(function(elem){

            //         return elem.owner.login
            //     });
            //     console.log(obj);
                
            // });
            
           // console.log(arrRes);
        });
        
        .catch(function(values){
            console.error(values);
        });
}
            

function executeRequests(list){
    var request = [];
    list.forEach(function(item){
       request.push(data.doAJAX(item));
    });
    return request;
    
};



function createContxMenu(obj, block){
    for (var i=0; i<obj.length; i++){
        var div = document.createElement('div');
        //div.classList.add('item');
        div.innerHTML = obj[i];
        //div.addEventListener('mousedown', window[obj.actions[i].handler]);
        block.appendChild(div)

    };

};





// Promise.all(promList)
//                         .then(function render on page)


// function doAjax(method, url){
//     var xhr = new XMLHttpRequest();
//     xhr.open(method, url, true);
    
//     return new Promise(function(resolve, reject){
//         xhr.send();

//         xhr.onreadystatechange = function(){
//             if (xhr.readyState != 4) {
//                 return;
//             }

//             if (xhr.status != 200) {
//                 reject(xhr);
//             }

//             resolve(JSON.parse(xhr.responseText));
//         }
//     });
// }

// Promise
//     .all([
//         doAjax('GET', '/data.json'), 
//         doAjax('GET', '/data2.json')
//     ])
//     .then(function(values){
//         console.log(values);
//     })
//     .catch(function(values){
//         console.error(values);
//     });
















/*
console.log('Loading with SystemJS');

// add click handler to the start game button
document.getElementById('startGame').addEventListener('click', function() {
    player.setName(document.getElementById('playername').value);
    game.printGame();
});

// add click handler to the calculate score button
document.getElementById('calculate').addEventListener('click', function() {
    game.calculateScore();
});

// set the default number of problems
document.getElementById('problemCount').value = game.getProblemCount();

*/