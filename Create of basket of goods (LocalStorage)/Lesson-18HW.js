/*Эмулируем работу корзины. В правом верхнем углу список набранных товаров (определяем по id). Товары расположены в ряд по центру. Создаем 5 разных типов товаров.
Кнопка Add to cart
Кнопка Remove (из корзины)
Кнопка Remove All
При перезагрузке страницы прорисовываются ранее выбранные товары
* При клике на товар, корзина прорисовывает список выбранных товаров

** Если товар уже ранее был выбран, то увеличивается счетчик - Товар "id 205" x2 штуки
*/
window.onload = function(){
    setTimeout(checkCart, 10);//запускаем функцию проверки значений в localStorage и отображения их в корзине


    var buttons = document.querySelectorAll('[value="Add"]');
    console.log(buttons);

    buttons.forEach(function(b){
        b.addEventListener('click', function(event){
            if(localStorage.getItem(b.parentElement.innerText)){//если данное значение в key есть, то берем Value+1;
                var value = parseInt(localStorage.getItem(b.parentElement.innerText), 10)+1;
                localStorage.setItem(b.parentElement.innerText, value);//записываем значение key:value в localStorage
            } else {
                localStorage.setItem(b.parentElement.innerText, 1);//если данного значение key нет, то записываем его. value = 1.
            }
            
        });

        b.addEventListener('click', function(event){
            checkCart();
        });
    
    })

   
    function checkCart(){
        var list = document.querySelector(".list");   
        list.innerHTML = "";//перед тем как прорисовать все данные с localStorage, удаляем предыдущие

        Object.keys(localStorage).forEach(function(key){//преобразовываем данные Обьекта в массив и навешиваем обработчики на каждый элемент 
            var newBlock = document.createElement('div');
            newBlock.className = "value";
            newBlock.innerHTML = '<div id="' + key + '">' + key +'&nbsp'+localStorage.getItem(key)+'&nbsp'+ ' <input type="button" value="Remove"></div>';
            list.appendChild(newBlock);
        });

        var k = document.querySelectorAll('[value="Remove"]'); 
        k.forEach(function(b){
            b.addEventListener('click', function(event){

                var key = event.target.parentElement.id;
                console.log(key);
                localStorage.removeItem(key);
                this.parentElement.remove();
            })
        });


    }


var buttonsRemoveAll = document.querySelector('[value="Remove All"]');
        buttonsRemoveAll.addEventListener('click', function(event){
        
        localStorage.clear();
        checkCart();
        });


}
