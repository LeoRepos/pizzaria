let modalQt  = 1;
let cart     = [];
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
    let key = cart.findIndex((item) => item.identifier == identifier);
    
    //* condição para verificar se o item adicionado é diferente do item já adicionado 
        if(key > -1) {
            cart[key].qt += modalQt;
        } else {
        cart.push({
            identifier,
            id:pizzaJson[modalKey].id,
            size,
            qt:modalQt
        }); 
        updateCart();
        closeModal();
    };
});

select('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0) {
        select('aside').style.left = '0';
    }
});

select('.menu-closer').addEventListener('click', () => {
    select('aside').style.left = '100vw';
});

function updateCart() {

    select('.menu-openner span').innerHTML = cart.length;     

    if (cart.length > 0) {
        select('aside').classList.add('show');
        select('.cart').innerHTML = '';


        let subTotal = 0;
        let desconto = 0;
        let total    = 0; 

        for(let i in cart) {
            
            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
            subTotal += pizzaItem.price * cart[i].qt;

            let cartItem  = select('.models .cart--item').cloneNode(true);            
            let pizzaSizeName;

            switch(cart[i].size) {
                case 0:
                    pizzaSizeName = 'Pequena';                        
                    break;
                case 1:
                    pizzaSizeName = 'Media';
                    break; 
                case 2:
                    pizzaSizeName = 'Grande';
                    break;
            };
            let pizzaItemName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaItemName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            //* Evento para remover os itens do carrinho 
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].qt > 1) {
                    cart[i].qt --;                 
                } else {
                    cart.splice(i, 1);      
                };
                updateCart();
            }); 
            
            //* Evento para acrescentar itens do carrinho 
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                updateCart();
            });

            select('.cart').append(cartItem);        
        }

        desconto = subTotal * 0.1;
        total    = subTotal - desconto;

        select('.subtotal span:last-child').innerHTML = `R$: ${subTotal.toFixed(2)}`;
        select('.desconto span:last-child').innerHTML = `R$: ${desconto.toFixed(2)}`;
        select('.total span:last-child').innerHTML    = `R$: ${total   .toFixed(2)}`;

    } else {
        select('aside').classList.remove('show');
        select('aside').style.left = '100vw';
    };  
};

select('.cart--finalizar').addEventListener('click', () => {
    select('aside').style.left = '100vw';
    alert('Obrigado pela Compra!');
});


