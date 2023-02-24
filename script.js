//* cruiando seletores auxiliares para pegar elementos do HTML de forma simplificada  
const select = (el) => document.querySelector(el); 
const selectAll = (el) => document.querySelectorAll(el); 



pizzaJson.map((el, index) => {
    let pizzaItem = select('.models .pizza-item').cloneNode(true);
    pizzaItem.querySelector('.pizza-item--name').innerHTML = el.name;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$: ${el.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = el.description;
    pizzaItem.querySelector('.pizza-item--img img').src = el.img;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {     
        e.preventDefault();    

        select('.pizzaWindowArea').style.opacity = 0;
        select('.pizzaWindowArea').style.display ='flex';
        setTimeout(() => {
            select('.pizzaWindowArea').style.opacity = 1;
        }, 200);        
    });


    select('.pizza-area').append(pizzaItem);
})
