const input = document.getElementById('input')
const display = document.getElementById('lista-tarefas')
const button = document.getElementById('button')
let dado = []
let i = 0; // Controla o índice atual


window.onload = function() {
    Object.keys(localStorage).sort((a, b) => a - b).forEach(chave => {
        if (!isNaN(chave)) {
            const indiceNum = parseInt(chave);
            const valorTarefa = localStorage.getItem(chave);
            
            dado[indiceNum] = valorTarefa;
            if (indiceNum >= i) {
                i = indiceNum + 1; 
            }

            
            renderizarTarefaNaTela(indiceNum, valorTarefa);
        }
    });
}

function renderizarTarefaNaTela(indice, texto) {
    display.innerHTML += 
    `<div class="tarefa" id="tarefa-${indice}">
        ${texto} 
        <div class="buttons">
            <button class="delete" data-index="${indice}">Apagar</button>
            <button class="edit" data-index="${indice}">Editar</button>
        </div>
    </div>`;
}

function inserirTarefa(){
    if (input.value.trim() === ''){
        alert("insira uma tarefa, por favor");
        return;
    }

    dado.push(input.value);

    // Usa a função auxiliar para colocar na tela
    renderizarTarefaNaTela(i, input.value);

    // Salva no LocalStorage usando o índice atual
    localStorage.setItem(i, input.value);

    i++; // Incrementa para a próxima tarefa
    input.value = '';
}

function gerenciarTarefa(event){
    const index = event.target.getAttribute('data-index');

    if(event.target.classList.contains("delete")){
        localStorage.removeItem(index);
        
        // Remove também do array para manter sincronizado
        delete dado[index]; 
        
        const tarefaElemento = document.getElementById(`tarefa-${index}`);
        if (tarefaElemento) {
            tarefaElemento.remove();
        }
    }
    
    if(event.target.classList.contains("edit")){
        const novoTexto = prompt("Edite o seu Texto aqui:");
        
        if (novoTexto && novoTexto.trim() !== "") {
            dado[index] = novoTexto;
            localStorage.setItem(index, novoTexto);
            
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