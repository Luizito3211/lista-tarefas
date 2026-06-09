const input = document.getElementById('input')
const display = document.getElementById('lista-tarefas')
const button = document.getElementById('button')
let dado = []
let i = 0; // Controla o índice atual

function inserirTarefa(){
    if (input.value.trim() === ''){
        alert("insira uma tarefa, por favor");
        return;
    }

    dado.push(input.value);

    // Inserimos o data-index na div principal e nos botões
    display.innerHTML += 
    `<div class="tarefa" id="tarefa-${i}">
        ${dado[i]} 
        <div class="buttons">
            <button class="delete" data-index="${i}">Apagar</button>
            <button class="edit" data-index="${i}">Editar</button>
        </div>
    </div>`;

    // Salva no LocalStorage usando o índice atual
    localStorage.setItem(i, dado[i]);

    i++; // Incrementa para a próxima tarefa
    input.value = '';
}

function gerenciarTarefa(event){
    // Captura o índice do botão que foi clicado
    const index = event.target.getAttribute('data-index');

    // Se o clique foi no botão de deletar
    if(event.target.classList.contains("delete")){
        // 1. Remove do LocalStorage usando o índice capturado
        localStorage.removeItem(index);
        
        // 2. Remove o elemento visual do HTML
        const tarefaElemento = document.getElementById(`tarefa-${index}`);
        if (tarefaElemento) {
            tarefaElemento.remove();
        }
    }
    
    // Se o clique foi no botão de editar
    if(event.target.classList.contains("edit")){
        const novoTexto = prompt("Edite o seu Texto aqui:");
        
        if (novoTexto && novoTexto.trim() !== "") {
            // Atualiza no array e no LocalStorage
            dado[index] = novoTexto;
            localStorage.setItem(index, novoTexto);
            
            // Atualiza apenas o texto na tela (recarregando a estrutura daquela tarefa específica)
            const tarefaElemento = document.getElementById(`tarefa-${index}`);
            tarefaElemento.innerHTML = `
                ${novoTexto} 
                <div class="buttons">
                    <button class="delete" data-index="${index}">Apagar</button>
                    <button class="edit" data-index="${index}">Editar</button>
                </div>
            `;
        }
    }
}

button.addEventListener("click", inserirTarefa)
display.addEventListener("click", gerenciarTarefa)