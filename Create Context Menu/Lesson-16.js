/*
Реализовать контекстное меню. Список хранить в памяти.
Применить меню к домашке с лекции №15 (персонаж). Создать actions: Jump, Remove, ChangeColor
Меню должно всегда открыватся в окне, не создавая скрола.
*/
var player=document.querySelector('.player');
var block1=document.querySelector('.block1');
var block2=document.querySelector('.block2');
var coordinatX;
var coordinatY;
//данные необходимые для Jump
var step = 10;
var h = 100;
var direction = -1;
var timer;
var player = document.querySelector('.player');
var level0 = player.offsetTop;
var stepUp = 2;
var flag = 1;



var contextmenu1 = { 
    actions: [
        {title: 'Jump', handler: 'Jump'},
        {title: 'ChangeColor', handler: 'ChangeColor'},
        {title:'Remove', handler: 'Remove'},
    ] 
};

var contextmenu2 = {
    actions: [
        {title: 'Left', handler: 'Left'},
        {title:'Right', handler: 'Right'},
        {title: 'Up', handler: 'Up'},
        {title: 'Down', handler: 'Down'}
    ]
}

//создание контекстменю и "навешивание" события (handler)
function createContxMenu(obj, block){
    for (var i=0; i<obj.actions.length; i++){
        var div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = obj.actions[i].title;
        div.addEventListener('mousedown', window[obj.actions[i].handler]);
        block.appendChild(div)

    };

};
// отображение контекстменю. Если координаты не переданы, то выводиться в зависимости от координат клика (выводим contextmenu1)
// Если координаты переданы, выводим по указанным координатам (выводим contextmenu2, что привязано до contextmenu1).
// Также вычисляем координаты, если клик блызко до границе экрана ("Меню должно всегда открыватся в окне, не создавая скрола")
function displayContextMenu(event, block, coordX, coordY){
    event.preventDefault();

    if (!coordX && !coordY){
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var clickX = event.pageX;
        var clickY = event.pageY;
        
        if ((windowWidth-clickX) < 80 ){
           block.style.left = windowWidth - block.style.width -210 + "px"; 
       } else {
            block.style.left = event.pageX + 'px';  
        }; 

       if ((windowHeight-clickY) < 100 ){
           block.style.top = windowHeight - block.style.height-160 + "px";
       } else {
            block.style.top = event.pageY + 'px';  
        };

        coordinatX = parseInt(block.style.left, 10) +103+ "px";
        coordinatY = parseInt(block.style.top, 10) +50+ "px";;
        
    } else {
        block.style.left = coordX;
        block.style.top = coordY;
    }
    block.classList.add("show");
    
}
// функция сброса отображения contextmenu1 и contextmenu2
function UndisplayContextMenu(){
    block1.classList.remove("show");
    block2.classList.remove("show");
}

function Jump(event){
    event.stopPropagation();
    UndisplayContextMenu();
    level_0 = player.offsetTop;
    timer = setInterval(function(){
        if ((player.offsetTop <= level0) && (player.offsetTop >= level0 - h) && direction == -1) {
            player.style.top = player.offsetTop + stepUp * direction + 'px';
        } else if (player.offsetTop < level0) {
            direction = 1;
            player.style.top = player.offsetTop + stepUp * direction + 'px';
        } else if (player.offsetTop >= level0 && direction == 1) {
            clearInterval(timer)
            direction = -1;
        };
    }, 20)   
};


function ChangeColor(event){
    event.stopPropagation();
    var color = prompt('Enter color');
    player.style.background = color;
    UndisplayContextMenu();
}

function Remove(event){
    event.stopPropagation();
    displayContextMenu(event, block2, coordinatX, coordinatY);
}

function Left(event){
    event.stopPropagation();
    UndisplayContextMenu();
    player.style.left = player.offsetLeft - step + 'px';
}

function Right(event){
    event.stopPropagation();
    UndisplayContextMenu();
    player.style.left = player.offsetLeft + step + 'px';
}

function Up(event){
    event.stopPropagation();
    UndisplayContextMenu();
    player.style.top = player.offsetTop - step + 'px';
}

function Down(event){
    event.stopPropagation();
    UndisplayContextMenu();
    player.style.top = player.offsetTop + step + 'px';
}

window.onload = function() {

    createContxMenu(contextmenu1, block1);
    createContxMenu(contextmenu2, block2);

    player.addEventListener('contextmenu', function(event){
        displayContextMenu(event, block1);
    });

    



    document.addEventListener('mousedown', function(event){
        UndisplayContextMenu();
    });

    

}


