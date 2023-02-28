let modalQt = 1;
let cart = [];
let modalKey = 0;

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
    modalKey = key;
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
    select('.pizza-area').append(pizzaItem);  
});

//* Ação de fechar modal
function closeModal() {
    select('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        select('.pizzaWindowArea').style.display = 'none'
    }, 500);
};    
    selectAll('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton').forEach((item) => {
    item.addEventListener('click', closeModal);  
});

//* Eventos do modal
select('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQt > 1) {    
        modalQt-=1;
        select('.pizzaInfo--qt').innerHTML = modalQt;
    };
});

select('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQt++;
    select('.pizzaInfo--qt').innerHTML = modalQt;
});

selectAll('.pizzaInfo--size').forEach((size) => {
    size.addEventListener('click', () => {
        select('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

//* função para preencher o carrinho de compras
select('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(select('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identifier = `${pizzaJson[modalKey].id}@${size}`;

    cart.push({
        identifier,
        id:pizzaJson[modalKey].id,
        size,
        qt:modalQt
    });       
    console.log(cart);

});



