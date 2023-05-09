let myForm = document.getElementById('myForm');


myForm.addEventListener('submit', function (e){
  let boleto = myForm.boleto.value
  if(boleto == ''){
    campoVazaio();
  }
  else{
    validarBoleto(boleto)
  }
  e.preventDefault()
})


function validarBoleto(boleto) {

    // Remove espaços em branco e pontos do código do boleto     ok
    boleto = boleto.replace(/\s|\./g, '');
  

    // Verifica se o código do boleto tem 47 caracteres    ok
    if (boleto.length !== 47) {
      return erro()
    }

     // Verifica se o código do boleto contém apenas números   ok
     if (!/^\d+$/.test(boleto.substr(6))) {
      return erro_number();
     }
 

    // Verifica o dígito verificador do boleto usando o algoritmo de módulo 10 ok
    var codigo = boleto.substr(0, 4) + boleto.substr(32, 15);
    var dv = boleto.substr(4, 1);
  
    if (modulo10(codigo) != dv) {
      // Se chegou até aqui, o boleto é válido   ok
      return sucesso()
    }
    else{
      console.log('invalido')

      return invalido();

      
  }
}

function sucesso(){
  Swal.fire(
    'Sucesso',
    'Esse boleto é valido!',
    'success'
  )
}

function erro(){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Por favor, informe todos os digitos!'
  })
}

function erro_number(){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Por favor, Insira apenas numeros no Código do boleto!'
  })
}

function invalido(){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Esse boleto é invalido!'
  })
}

function campoVazaio(){
   
Swal.fire(
  'Preencha o campo vazio!',
  'Por favor',
  'warning'
)
}


  
function modulo10(codigo) {

    var soma = 0;
    var peso = 5;
    var codigo = codigo.toString().replace(/[^0-9]/g, '');


  
    for (var i = codigo.length - 1; i >= 0; i--) {
      var valor = parseInt(codigo.charAt(i)) * peso;
      if (valor > 9) {
        valor = valor.toString().split('');
        valor = parseInt(valor[0]) + parseInt(valor[1]);
      }
      soma += valor;
      peso = peso == 2 ? 1 : 2;
      
    }
  
    var digito = ((Math.floor(soma / 10) + 1) * 10 - soma) % 10;
    return digito;
  }




function openMenu(){
  let menu = document.querySelector('#nav-bar')
  if(menu.style.width == '0px'){
    menu.style.width = '250px'
  }
  else{
    menu.style.width = '0px'
  }
}

function manutencao(){
  alert('Funcionalidade indisponivel no momento!')
}


// SweetAlert2


