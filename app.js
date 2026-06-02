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
    `<div class="tarefa" data-index="${i}">
        ${dado[i]} 
        <div class="buttons">
            <button class="delete" data-index="${i}">Apagar</button>
            <button class="edit" data-index="${i}">Editar</button>
        </div>
    </div>`;

    // Correção do LocalStorage: Usar o índice 'i' como chave faz mais sentido
    localStorage.setItem(i, dado[i]);

    i++; // Incrementa para a próxima tarefa
    input.value = '';
}
function gerenciarTarefa(event){
    if(event.target.getAttribute('data-index') === 0){
        event.target.parentElement.parentElement.remove()
        localStorage.removeItem(0)
    }
    if(event.target.classList.contains("edit")){
        tarefa = prompt("Edite o seu Texto aqui:")
        display.innerHTML = 
    `<div class="tarefa">
        ${tarefa} 
        <div class="buttons">
            <button class="delete">Apagar</button>
            <button class="edit">Editar</button>
        </div>
    </div>`

    }

}

button.addEventListener("click", inserirTarefa)

display.addEventListener("click", gerenciarTarefa)
