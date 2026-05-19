const input = document.getElementById('input')
const display = document.getElementById('lista-tarefas')
const button = document.getElementById('button')

function inserirTarefa(){
    let tarefa = input.value
    display.innerHTML += 
    `<div class="tarefa">
        ${tarefa} 
        <div class="buttons">
            <button class="delete">Apagar</button>
            <button class="edit">Editar</button>
        </div>
    </div>`

    input.value = ''
}

if(input.value != ''){
    button.addEventListener("click", inserirTarefa)
}else{
    alert('Por favor, insira uma Tarefa')
}
