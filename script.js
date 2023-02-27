let modalQt = 1;

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
    modalQt = 1;
    select('.pizzaBig img').src                 = pizzaJson[key].img;
    select('.pizzaInfo h1').innerHTML           = pizzaJson[key].name;
    select('.pizzaInfo--desc').innerHTML        = pizzaJson[key].description;
    select('.pizzaInfo--actualPrice').innerHTML = `R$: ${pizzaJson[key].price.toFixed(2)}`;
    select('.pizzaInfo--size.selected').classList.remove('selected');
    selectAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
        if (sizeIndex == 2) {
            size.classList.add('selected');
        } 
        size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
    });

    select('.pizzaInfo--qt').innerHTML = modalQt;

    //* Criando efeito no modal
    select('.pizzaWindowArea').style.opacity     = 0;
    select('.pizzaWindowArea').style.display     = 'flex';
    setTimeout(() => {
        select('.pizzaWindowArea').style.opacity = 1;
    }, 200);        
});
    //* Ação de fechar modal
    select('.pizzaInfo--cancelButton').addEventListener('click', () => {
        select('.pizzaWindowArea').style.display = 'none';
    });  
    
    //* Ação de fechar modalMobile
    select('.pizzaInfo--cancelMobileButton').addEventListener('click', () => {
        select('.pizzaWindowArea').style.display = 'none';
    });   

    select('.pizza-area').append(pizzaItem);    
});


