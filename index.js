// supondo que esteja pegando os dados no banco de dados

const products = [
    {
        id: 1,
        title: 'Mouse',
        price: 19.9,
        poster: 'https://m.media-amazon.com/images/I/61UxfXTUyvL._AC_SL1500_.jpg'   
    },
    {
        id: 1,
        title: 'Computador',
        price: 12.9,
        poster: 'https://m.media-amazon.com/images/I/61UxfXTUyvL._AC_SL1500_.jpg'   
    },
    {
        id: 2,
        title: 'Tablet',
        price: 9.9,
        poster: 'https://m.media-amazon.com/images/I/61UxfXTUyvL._AC_SL1500_.jpg'   
    },
    {
        id: 3,
        title: 'Nootboock',
        price: 30.9,
        poster: 'https://m.media-amazon.com/images/I/61UxfXTUyvL._AC_SL1500_.jpg'   
    },
    {
        id: 4,
        title: 'PC gamer',
        price: 59.9,
        poster: 'https://m.media-amazon.com/images/I/61UxfXTUyvL._AC_SL1500_.jpg'   
    },
    {
        id: 5,
        title: 'Gabinete',
        price: 1.9,
        poster: 'https://m.media-amazon.com/images/I/61UxfXTUyvL._AC_SL1500_.jpg'   
    },
    {
        id: 6,
        title: 'Placa de Video',
        price: 99.9,
        poster: 'https://m.media-amazon.com/images/I/61UxfXTUyvL._AC_SL1500_.jpg'   
    },
    {
        id: 7,
        title: 'Memoria RAM',
        price: 99.9,
        poster: 'https://m.media-amazon.com/images/I/61UxfXTUyvL._AC_SL1500_.jpg'   
    },
]


const listContainer = document.querySelector('#list')
const header = document.querySelector('#header')
const search = document.querySelector('#searchInput')


 function searchInkeyUp(event) {
	const searched = event.target.value;

	const productsFound = productsFilterInSearch(searched);

	productsFound.length > 0
		? renderListAndHeader(console.log(productsFound))
		: (listContainer.innerHTML = 'Nenhum produto encontrado');
}

function productsFilterInSearch(searched) {
	return products.filter((product) => {
		return product.title.toLowerCase().includes(searched.toLowerCase());
	});
}


// trabalhando com o sistema de busca
search.addEventListener('keyup', _.debounce(searchInkeyUp, 400));


function renderHeader(products){
    const totalProducts = products.length;
     
    header.innerHTML =  totalProducts > 0 ? `${totalProducts} produtos disponiveis` : (header.innerHTML = `${totalProducts}  produtos disponiveis`)

}


function renderListAndHeader(product){
    render (products);
    renderHeader(products);
}

// utilizando o template string
function render(products){
    let list = ``;

    if(products.length <= 0){
        list+= `<div id="no-products">Nenhum produto disponivel</div>`
    }
    else{
        products.forEach((product, index)=>{
            list += `
                <div class="product">
                <div class="product-image">
                <img class='imagens' alt="imagem" src="${product.poster}">
                </div>
                ${product.title} - ${product.price}
                <button class='btn btn-primary' data-remove="${product.id}">Deletar</button>
                </div>
            `;
        });
    }
    listContainer.innerHTML = list;

}


// function for remove produtc

function removeProduct(productId){
    const index = products.findIndex((product)=>{
        return +product.id ===  +productId;
    })

    if(index > -1){
        products.splice(index, 1);
        renderListAndHeader(products);
    }

    console.log(index)

}


document.body.addEventListener('click', function(event){
    event.preventDefault();
    console.log('PEGOU')


    const productId = event.target.getAttribute('data-remove');

    if(productId){
        // console.log('remove', target)
        removeProduct(productId);
    }
})

renderListAndHeader(products);


// sistema de busca vai ser trabalhado com o lodest
