// supondo que esteja pegando os dados no banco de dados

//dados fixos 
 const products = [
    
    {
        id: 0,
        title: 'Mouse',
        price: 19.9,
        poster: 'https://images.tcdn.com.br/img/img_prod/1053291/mouse_apple_magic_2_1424022183_1_0a9e5e83bc02779dff1f332f429f8dbc.jpg'   
    },
    {
        id: 1,
        title: 'Computador',
        price: 12.9,
        poster: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-green-selection-hero-202104?wid=986&hei=980&fmt=jpeg&qlt=90&.v=1617492405000'   
    },
    {
        id: 2,
        title: 'Tablet',
        price: 9.9,
        poster: 'https://www.atacadogames.com/imagem/apple/tablet-apple-ipad-pro-m1-mhr23ll-a-2tb-wi-fi-tela-11-cinza-espacial/2/123138.jpg?pfdrid_c=true'   
    },
    {
        id: 3,
        title: 'Nootboock',
        price: 30.9,
        poster: 'https://imgs.extra.com.br/55051841/1g.jpg?imwidth=500'   
    },
    {
        id: 4,
        title: 'Monitor',
        price: 12.1,
        poster: 'https://www.informaticashop.com.br/media/catalog/product/cache/1/image/900x900/17f82f742ffe127f42dca9de82fb58b1/m/o/monitor_lcd_27_-_apple_-_mc914bz.jpg'   
    },
    {
        id: 5,
        title: 'Gabinete',
        price: 1.9,
        poster: 'https://img.olx.com.br/images/74/746393759945393.jpg'   
    },
    {
        id: 6,
        title: 'Placa de Video',
        price: 99.9,
        descricao:'Tipo de produtfsdafkosfksndfknsdkfnskdnflksdnflksndfklnsd',
        poster: 'https://images.tcdn.com.br/img/img_prod/660648/placa_de_video_geforce_apple_gt_120_512mb_compativel_apenas_com_apple_3751_1_1d0b2bbef54b7e55b865a7ea05c1d8df.jpg'   
    },
    {
        id: 7,
        title: 'Memoria RAM',
        price: 99.9,
        poster: 'https://http2.mlstatic.com/D_NQ_NP_856849-MLA40928711096_022020-O.jpg'   
    },
    {
        id: 8,
        title: 'Teclado',
        price: 99.9,
        poster: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MK293_AV3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1628007108000'   
    },
    {
        id: 9,
        title: 'Fone',
        price: 99.9,
        poster: 'https://teravirt.s3-accelerate.amazonaws.com/uploads/sites/94/2021/08/new-1-1-4-5-1-1-114511-1610559450_1610559450.jpg'   
    },
    {
        id: 10,
        title: 'Mi Pad',
        price: 99.9,
        poster: 'https://www.planetenumerique.com/IMG/arton4123.jpg?1648209915'   
    },
    {
        id: 11,
        title: 'Camera',
        price: 99.9,
        poster: 'https://http2.mlstatic.com/D_NQ_NP_970781-MLB52363219242_112022-O.jpg'   
    },

]



const listContainer = document.querySelector('#list')
const header = document.querySelector('#header')
const search = document.querySelector('#searchInput')



 function searchInkeyUp(event) {
	const searched = event.target.value;

	const productsFound = productsFilterInSearch(searched)

	productsFound.length > 0
		? renderListAndHeader(productsFound)
		: (listContainer.innerHTML = 'Nenhum produto encontrado');
}

function productsFilterInSearch(searched) {
    console.log(searched)
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


function renderListAndHeader(products){
    render (products);
    renderHeader(products);
}

// utilizando o template string
function render(products){
    let list = '';

    if(products.length <= 0){
        list+= `<div id="no-products">Nenhum produto disponivel</div>`
    }
    else{
        products.forEach((product, index)=>{
            list += `
                <div class="product" onclick='navegar()'>
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


//funcao para navegação de tela
// function navegar() {
//     window.location.href = 'ShowProducts/show.html'
// }


// function for remove produtc

function removeProduct(productId){
    const index = products.findIndex((product)=>{
        return +product.id ===  +productId;
    })

    if(index > -1){
        products.splice(index, 1);

        if(search.value !== ''){
            const productFiltered = productsFilterInSearch(search.value);
            renderListAndHeader(productFiltered)
            if(productFiltered.length == 0){
                search.value = '';
            }

            return;
        }
        renderListAndHeader(products);
    }


    console.log(index)

}


// confirmação do deletar
function confirmarRemove(productId){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'tem certeza?',
        text: "Deseja deletar esse produto?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim, deletar agora!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Muito bem!',
            'Produto deletado com sucesso',
            'success'
          )
          removeProduct(productId);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Produto não deletado :)',
            'error'
          )
        }
      })
}



document.body.addEventListener('click', function(event){
    event.preventDefault();
   
    console.log(event)

    const productId = event.target.getAttribute('data-remove');

    if(productId){
        // console.log('remove', target)
        confirmarRemove(productId);
        // removeProduct(productId);
    }
})

renderListAndHeader(products);





// sistema de busca vai ser trabalhado com o lodest
