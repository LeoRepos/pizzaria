//* criando seletores auxiliares para pegar elementos do HTML de forma simplificada  
const select        = (el) => document.querySelector(el); 
const selectAll     = (el) => document.querySelectorAll(el); 

//* Inserindo os dados das pizzas na tela
pizzaJson.map((el, index) => {
    let pizzaItem = select('.models .pizza-item').cloneNode(true);
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src     = el.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$: ${el.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML  = el.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML  = el.description;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {     
        e.preventDefault();    

        //* Inserindo as informações das pizzas no Modal
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        select('.pizzaBig img').src                 = pizzaJson[key].img;
        select('.pizzaInfo h1').innerHTML           = pizzaJson[key].name;
        select('.pizzaInfo--desc').innerHTML        = pizzaJson[key].description;
        select('.pizzaInfo--actualPrice').innerHTML = pizzaJson[key].price;

        //* Criando efeito no modal
        select('.pizzaWindowArea').style.opacity     = 0;
        select('.pizzaWindowArea').style.display     ='flex';
        setTimeout(() => {
            select('.pizzaWindowArea').style.opacity = 1;
        }, 200);        
    });

    select('.pizza-area').append(pizzaItem);
});
