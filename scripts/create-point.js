// document
//     .querySelector("select[name=uf]") // Procure o select que tem o name = uf
//     .addEventListener("change", () => {  // Ouvidor de eventos
//         console.log("Mudei.")
//     }) // function(){} == () => {}, duas maneiras de se criar uma função anônima

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {return res.json()}) // res => res.json()  <= Em situações assim de 1 pra 1 pode escrever a função anônima dessa forma também
    .then(states => { // Esse states é um array de estados
        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` // Só com o "=" ele ia substituir o que tá lá, com "+=" ele adiciona a mais
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]") // A variável tá recebendo o <select name="city" id="" disabled> que tá no documento HTML
    const stateInput = document.querySelector("input[name=state]")

    // console.log(event.target.value) // Esse target vai trazer o "select[name=uf]"

    const ufValue = event.target.value                        // O .value é state.id
    
    const indexOfSelectedState = event.target.selectedIndex // Ele vai falar o número do index(0 a 26)
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios` // Sempre que o target.value mudar, a URL vai mudar também 

    citySelect.innerHTML = "<option value>Selecione o estado</option>" // Reescreve o conteúdo interno toda vez que ele entrar nessa função, para que o conteúdo do select city mude conforme o estado
    citySelect.disabled = true // Bloqueia novamente o conteúdo interno

    fetch(url)
    .then(res => res.json())
    .then(cities => {

        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        
        citySelect.disabled = false 
    })
}


document
.querySelector("select[name=uf]")
.addEventListener("change", getCities) // O evento é mudar, então o objeto evento vai mandar informações, uma delas sendo o target(Refere-se a onde o evento foi executado)

// Itens de Coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) { // event é o parêmetro que será passado toda vez que um evento for disparado
    const itemLi = event.target
    
    // Adicionar ou remover uma classe com JS
    itemLi.classList.toggle("selected") // Se exister a classe selected no item, o toggle removerá, se não, o toggle adicionará
    
    const itemId = itemLi.dataset.id // Pega o número dos ids com data-id="" dos itens clicados
    
    // Verificar se existe itens selecionados, se sim
    // pegar os itens selecionados
    const alreadySelected = selectedItems.findIndex(function(item){ // Função booleana para achar o index
        const itemFound = item == itemId // Isso será true ou false
        return itemFound
    })

    // se já estiver selecionado...
    if(alreadySelected >= 0){ // Ser >=0 significa que ele está dentro do array de itens selecionados(selectedItems), se não estivesse, o valor da variável seria 0 
        // ...tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // se não estiver selecionado, adicionar a seleção
        selectedItems.push(itemId)
    }

    // atualizar o campo escondido(input type="hidden") com os itens selecionados
    collectedItems.value = selectedItems
}