const buttonSearch = document.querySelector("#page-home main a") // Área verde, "Pesquisar pontos de coleta"
const modal = document.querySelector("#modal")
const closeX = document.querySelector("#modal .header a") // É o X de fechar

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide") // Removendo a classe hide a tela modal aparecerá
})

closeX.addEventListener("click", () => {
    modal.classList.add("hide")
})