let numerosSorteados = []; //lista (array) vazia que ira receber os numeros gerados
let limite = prompt('Defina o número maximo do desafio:');
let numeroSecreto = numeroAleatorio(); //sempre defina variáveis no início do código, as funções são içadas (hoisting)
console.log(numeroSecreto);
let tentativas = 1;
function exibirTexto(tag, texto){ //a função pode ter múltiplos parâmetros (a, b, c, ..., n)
    let campo = document.querySelector(tag); //Função document acessa o arquivo HTML
    //tag são os elementos de HTML
    //querySelector chama uma determinada variável do HTML para compor a variável do JavaScript
    campo.innerHTML = texto; //innerHTML serve para injetar um parametro na variável chamada
}

MensagemInicial();

function MensagemInicial(){
exibirTexto('h1', 'Jogo do Número Secreto'); //quando tag = h1, campo do html = Jogo do Número Secreto
let subtitulo = `Digite um número entre 1 e ${limite}`;
//o HTML pode não interpretar bem a template string, é melhor transformar em variável para chamar dentro da função
exibirTexto('p', subtitulo);
}

function verificarChute(){
    let chute = document.querySelector('input').value; //apenas o valor colocado no campo, não o campo HTML inteiro
    let pluralSingular = tentativas > 1? 'tentativas':'tentativa';
    let mensagem = `Você descobriu o Número Secreto com ${tentativas} ${pluralSingular}`;
    let maiorMenor = chute > numeroSecreto ? 'menor':'maior';
    let mensagemNova = 0;
    if (chute==numeroSecreto){
        exibirTexto('h1','Parabéns! Você acertou!');
        tentativas = mensagemNova > 0 ? tentativas++ : tentativas;
        exibirTexto('p', mensagem);
        document.getElementById("reiniciar").removeAttribute("disabled");
        //aqui o comando getElementById resgata no HTML trecho com o id marcado e remove o atributo "disabled"
        //Ou seja, o botão passa a estar habilitado a partir disso
    } else {
        exibirTexto('h1','Você errou!');
        let dica = `Tente um número ${maiorMenor} do que ${chute}!`;
        exibirTexto('p', dica);
        mensagemNova++;
        limparCampo();
    }
    tentativas++;
}

function reiniciarJogo(){
    numeroSecreto = numeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemNova = 0;
    MensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
    //semelhante ao comando anterior, mas a função setAttribute coloca um atributo no trecho HTML
    //o parâmetro "true" serve para informar o estado que o atributo irá ser settado
}

function numeroAleatorio(){
    let numeroGerado = parseInt(Math.random()*limite + 1);
    let quantidadeDeNumerosGerados = numerosSorteados.length; //length determina o tamanho da lista

    if (quantidadeDeNumerosGerados == limite){
        numerosSorteados = []; //limpeza da lista
        ////SE A LISTA NÃO FOR LIMPA O CÓDIGO FICARÁ TENTANDO PRA SEMPRE POIS OS ELEMENTOS POSSÍVEIS ACABARAM///
    }

    if (numerosSorteados.includes(numeroGerado)){ //verifica se o numero gerado já está na lista
        return numeroAleatorio(); // recursão = pedir para a função reiniciar dentro da própria função
    } else {
        numerosSorteados.push(numeroGerado); //comando push adiciona um elemento ao final da lista
        return numeroGerado; //return irá retornar o que está na linha de código, dentro da função
    //sem o return a função seria invocada, mas não retornaria/armazenaria valor
    }
}

function limparCampo(){
    chute = document.querySelector('input'); //selecionar o campo todo
    chute.value = ''; //pegar o valor do campo e zerar
}