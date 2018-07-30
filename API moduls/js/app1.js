var data = require('./dataService.js');

var arrResult = [];
// var flag = 0;

// var block1=document.querySelector('.block1');
// var block2=document.querySelector('.block2');

var valueResult;

var el = document.getElementById("button");
el.addEventListener("click", render, false);

data
    .doAJAX('https://api.github.com/orgs/hillel-front-end/repos')
    .then(response => response.map(item => data.doAJAX(item.forks_url)))
    .then(promList => {
        return promiseAll(promList);
    })
    .then(e => {
        render(e)
    })



         
function promiseAll(arrPromis){
    //console.log(arrPromis);
    return new Promise((resolve, reject) => {
    Promise
        .all(arrPromis)
        .then(values => {
            console.log(values)
           // var arrResalt = [];
            values.forEach(item => {
                if (item.length>0){
                var obj = {};
                obj.name = item[0].name;
                obj.fork = item.map(elem => {
                    return elem.owner.login
                });
                arrResult.push(obj); 
                }              
            });
            
            console.log(arrResult);
            resolve();
        })
        .catch(function(values){
            reject(values);
        });

    });
}
            
// better

/*
data
    .doAJAX('https://api.github.com/orgs/hillel-front-end/repos')
    .then(response =>response.map(item => data.doAJAX(item.forks_url))
    .then(promList => console.log(promList))
*/

// function executeRequests(list){
//     var request = [];
//     list.forEach(function(item){
//        request.push(data.doAJAX(item));
//     });
//     console.log(request);
//     return request;    
// };





function render(){
    var ul = document.querySelector('.ul');
    var ul1 = document.querySelector('.ul1');

    ul.innerHTML = '';
    ul1.innerHTML = '';

    let str = document.getElementById('myInput').value;
    let arr = arrResult;
    for (var i = 0; i < arr.length; i++){
        if (!str || arr[i].search.indexOf(str) > -1){
            var li = document.createElement('li');
            li.innerHTML = arr[i].name;
            ul.appendChild(li);

            var ul1 = document.createElement('ul');
            li.appendChild(ul1);
            ul1.classList.add("nested");

            li.addEventListener('mousedown', function(event){
                if(event.target.firstElementChild.classList.contains('nested')){
                    event.target.firstElementChild.classList.toggle("show");
                } else {
                    event.target.firstElementChild.classList.toggle("nested");
                    
                }               
                      
            });

            let srch = '';
            for (var j = 0; j < arr[i].fork.length; j++) {
                if (!str || arr[i].fork[j].indexOf(str) > -1) {
                    var li1 = document.createElement('li');
                    li1.innerHTML = arr[i].fork[j];
                    if (!arr[i].search){
                        srch = srch +' ' + arr[i].fork[j];  
                    }
                    ul1.appendChild(li1);
                }
            }
            

            if (!arr[i].search){
               arr[i].search = arr[i].name + " " + srch;
            }

        }
    }
}


document.getElementById("button").addEventListener("click", myFunction);

function myFunction(event) {
    console.log(event)
    // var x = document.getElementById("myInput");
    // document.getElementById("demo").innerHTML = "You are searching for: " + x.value;
}


