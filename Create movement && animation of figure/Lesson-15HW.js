window.onload = function() {
    var step = 10;
    var h = 100;
    var direction = -1;
    var timer;
    var player = document.querySelector('.player');
    var level0 = player.offsetTop;
    var stepUp = 2;
    var flag = 1;

// функция анимации: поднятие на h верх и возврат вниз в начальное положение
function Jump(){
    if ((player.offsetTop <= level0) && (player.offsetTop >= level0 - h) && direction == -1) {
            player.style.top = player.offsetTop + stepUp * direction + 'px';
        } else if (player.offsetTop < level0) {
            direction = 1;
            player.style.top = player.offsetTop + stepUp * direction + 'px';
        } else if (player.offsetTop >= level0 && direction == 1) {
            clearInterval(timer)
            direction = -1;
        }

}


function Remove(){
    if (event.key == 'ArrowRight') {
            player.style.left = player.offsetLeft + step + 'px';
        } else if (event.key == 'ArrowLeft') {
            player.style.left = player.offsetLeft - step + 'px';
        } else if (event.key == 'ArrowDown' && event.ctrlKey == false) {
            player.style.top = player.offsetTop + step + 'px';
        } else if (event.key == 'ArrowUp' && event.ctrlKey == false) {
            player.style.top = player.offsetTop - step + 'px';
        } else if (event.code == 'Space' && event.ctrlKey == false) {
            level_0 = player.offsetTop;
            timer = setInterval(playAnimation, 20);
        } else if (event.ctrlKey == true && flag == 1) {
            player.style.height = player.offsetHeight - (player.offsetHeight * 40) / 100 + 'px';
            player.style.width = player.offsetWidth + (player.offsetWidth * 15) / 100 + 'px';
            flag = 0;

        }
}

    // function playAnimation() {
    //     if ((player.offsetTop <= level0) && (player.offsetTop >= level0 - h) && direction == -1) {
    //         player.style.top = player.offsetTop + stepUp * direction + 'px';
    //     } else if (player.offsetTop < level0) {
    //         direction = 1;
    //         player.style.top = player.offsetTop + stepUp * direction + 'px';
    //     } else if (player.offsetTop >= level0 && direction == 1) {
    //         clearInterval(timer)
    //         direction = -1;
    //     }
    // }
// функция нажание клавиши:
// -> в право на 1 step; <--влево на 1 step; аналогично ввер, вниз.
// при нажатии "пробел"-прыжок вверх и возврат (функция анимация).
// при нажатии CTRL элемент "присел". При CTRL не работает режим "вверх", "вниз", "анимация"
    function keyDown(event) {

        if (event.key == 'ArrowRight') {
            player.style.left = player.offsetLeft + step + 'px';
        } else if (event.key == 'ArrowLeft') {
            player.style.left = player.offsetLeft - step + 'px';
        } else if (event.key == 'ArrowDown' && event.ctrlKey == false) {
            player.style.top = player.offsetTop + step + 'px';
        } else if (event.key == 'ArrowUp' && event.ctrlKey == false) {
            player.style.top = player.offsetTop - step + 'px';
        } else if (event.code == 'Space' && event.ctrlKey == false) {
            level_0 = player.offsetTop;
            timer = setInterval(playAnimation, 20);
        } else if (event.ctrlKey == true && flag == 1) {
            player.style.height = player.offsetHeight - (player.offsetHeight * 40) / 100 + 'px';
            player.style.width = player.offsetWidth + (player.offsetWidth * 15) / 100 + 'px';
            flag = 0;

        }
    }

// функция отпускание клавиши CTRL-из режима "присел" в режим "встал"(возврат первоначальных значений Player)
    function keyUp(event) {
        if (event.ctrlKey == false & flag == 0) {
            player.style.height = player.style.width = 100 + 'px';
            flag = 1;
        }
    }
// навешиваем события на нажатия клавиш, и отпускание CTRL
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
}
