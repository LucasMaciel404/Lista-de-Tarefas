// declarando minhas constantes
const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('#tarefas');





// minhas funções
function limparInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaLi(){
    const li = document.createElement('li');
    return li;
}

function criaTarefa(textoInput){
    const li = criaLi();
    li.innerText = textoInput;
    criaBotaoApagar(li);
    tarefas.appendChild(li)
    slavarTarefas();
}

function criaBotaoApagar(li){
    li.innerText += ' '
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class','apagar');
    botaoApagar.setAttribute('title', 'apagar esta tarefa?');
    li.appendChild(botaoApagar);
}

function slavarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar','').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);

    console.log(tarefasJSON);
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    
    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa);
    }
}












// adicionando as as minhas tarefas
adicionaTarefasSalvas();

// EVENTOS:


document.addEventListener('click', function(e){
    const el = e.target;
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        slavarTarefas();
    }
});
inputTarefa.addEventListener('keypress', function(e){
    if (e.keyCode === 13){
        criaTarefa(inputTarefa.value);
        limparInput();
    }
});
btnTarefa.addEventListener('click', function(){
    if (!inputTarefa.value && inputTarefa.value == '') return; // retornando o inputTarefas.value retorna inputTarefa caso verdadeiro.
    
    criaTarefa(inputTarefa.value);
});