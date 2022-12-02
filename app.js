//retorna os dados da api
const key = '23ffa58c23334a09a64ac25be33d8cf6'

async function retornaJogos(qtd) {
    const res = await fetch(`https://api.rawg.io/api/games?key=${key}&page_size=${qtd}`);
    const data = await res.json();
  
    return data;
}

async function retornaPlataformas(qtd) {
    const res = await fetch(`https://api.rawg.io/api/platforms?key=${key}&page_size=${qtd}`);
    const data = await res.json();

    return data;
}

async function retornaDetalhesJogo(idGame){
    const res = await fetch(`https://api.rawg.io/api/games/${idGame}?key=${key}`)
    const data = await res.json();

    return data;
}

async function retornaPesquisa(termo){
    const res = await fetch(`https://api.rawg.io/api/games?key=${key}&search=${termo}`)
    const data = await res.json()

    return data;
}



async function populaCarousel() {
    const jogos = await retornaJogos(4)
    escondeSpinner(1)

    const objJogos = jogos.results

    const divCarousel = document.getElementById('carousel-inner')

    for(let i = 0 ; i < objJogos.length ; i++){
        let divCarouselInner = document.createElement("div");

        let genero = ""
        objJogos[i].genres.forEach((genre) => {
            genero += genre.name + ", "
        })

        let plataformas = ""
        objJogos[i].platforms.forEach((platform) => {
            plataformas += platform.platform.name + ", "
        })

        if(i == 0 ){
            divCarouselInner.className = "carousel-item active"
        }else{
            divCarouselInner.className = "carousel-item"
        }
        
        divCarouselInner.innerHTML = `
        <section class="row destaques container mx-auto">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 dest">
                <img src="${objJogos[i].background_image}" height="300" width="533" />
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6">
                <h2 class="my-1">${objJogos[i].name}</h2>
                <p><b>Lançamento:</b> ${objJogos[i].released}</p>
                <p> <b>Plataformas:</b> ${plataformas}</p>
                <p> <b>Genero:</b> ${genero}</p>
                <p> <b>Avaliaçao: <span style="color:green ;">${objJogos[i].rating}</span></b></p>
            </div>
        </section>
        `
        divCarousel.appendChild(divCarouselInner)
    }
}

async function populaLancamentos() {
    const jogos = await retornaJogos(9)
    escondeSpinner(2)

    const objJogos = jogos.results

    const divLancamentos = document.getElementById('ContLancamentos')

    for(let i = 0 ; i < objJogos.length ; i++){
        let divLancamentosInner = document.createElement("div");

        divLancamentosInner.className = "col-12 col-sm-12 col-md-6 col-lg-4 cardLancamentos my-3 border py-3 rounded"

        let genero = ""
        objJogos[i].genres.forEach((genre) => {
            genero += genre.name + " "
        })
        
        divLancamentosInner.innerHTML = `
                <div class="imagem-lancamentos text-center">
                    <img src="${objJogos[i].background_image}" width="320" height="180" />
                </div>
                <div class="ml-2">
                    <p style="font-size: 20px"> <b> ${objJogos[i].name} </b> </p>
                    <p><b>lançamento:</b> ${objJogos[i].released}</p>
                    <p><b>Nota:</b> <span style="color: green; font-weight: bold;"> ${objJogos[i].rating} </span> </p>
                    <p><b>gênero:</b> ${genero}</p>
                    <a href="./detalhes.html?id=${objJogos[i].id}" class="mais-det">mais detalhes</a>
                </div>   
        `
        divLancamentos.appendChild(divLancamentosInner)
    }
}

async function populaPlataformas() {
    const plataformas = await retornaPlataformas(6)
    escondeSpinner(3)

    const objPlataformas = plataformas.results

    const divPlataformas = document.getElementById("containerPlataformas")

    for(let i = 0 ; i < objPlataformas.length ; i++){

        mainGames = []

        objPlataformas[i].games.forEach((game) => {
            mainGames.push(game.name)
        })

        let divPlataformasInner = document.createElement("div")

        divPlataformasInner.className = "col-12 col-sm-12 col-md-6 col-lg-4 px-2 py-5"

        divPlataformasInner.innerHTML = `
            <h2>${objPlataformas[i].name}</h2>
            <h4>Principais Jogos</h4>
            <ul>
                <li>${mainGames[0]}</li>
                <li>${mainGames[1]}</li>
                <li>${mainGames[2]}</li>
                <li>${mainGames[3]}</li>
                <li>${mainGames[4]}</li>
                <li>${mainGames[5]}</li>
            </ul>
        `
        divPlataformas.appendChild(divPlataformasInner)
    }
}

let lancamentos = document.getElementById('ContLancamentos')
if(lancamentos){
    populaLancamentos()
}

let carousel = document.getElementById('carousel-inner')
if(carousel){
    populaCarousel()
}

let plataforma = document.getElementById("containerPlataformas");
if(plataforma){
    populaPlataformas()
}

const urlParams = new URLSearchParams(window.location.search);

async function detalhesJogo(){
    const id = urlParams.get("id");
    let idGame = parseInt(id)

    const objDetalhesJogo = await retornaDetalhesJogo(idGame)
    escondeSpinner(4)

    divDetalheJogo = document.getElementById('detalheJogo')

    const divDetalheJogoInner = document.createElement("div")
    divDetalheJogo.className = ""

    let genero = ""
    objDetalhesJogo.genres.forEach((genre) => {
        genero += genre.name + ", "
    })

    let plataformas = ""
    objDetalhesJogo.platforms.forEach((platform) => {
        plataformas += platform.platform.name + ", "
    })

    divDetalheJogoInner.innerHTML = `
        <div class="d-flex justify-content-center my-4">
            <h1> <b> ${objDetalhesJogo.name} </b> </h1>
        </div>
    <section class="row destaques container mx-auto">
            <div class="col-12 col-sm-12 col-md-12 col-lg-6 dest">
                <img src="${objDetalhesJogo.background_image}" height="300" width="533" />
                <p><b>Lançamento:</b> ${objDetalhesJogo.released}</p>
                <p> <b>Plataformas:</b> ${plataformas}</p>
                <p> <b>Genero:</b> ${genero}</p>
                <p> <b>Avaliaçao: <span style="color:green ;">${objDetalhesJogo.rating}</span></b></p>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-6">
                <p> <b>Descrição:</b> ${objDetalhesJogo.description}</p>
            </div>
        </section>
    `
    divDetalheJogo.appendChild(divDetalheJogoInner)

}

let detalhes = document.getElementById('detalheJogo')
if(detalhes){
    detalhesJogo()
}

async function Pesquisa(){
    const termoPesquisa = urlParams.get("res")

    const pesquisar = await retornaPesquisa(termoPesquisa)
    escondeSpinner(5)

    document.getElementById("conteudoPesquisa").innerText = termoPesquisa 

    const divPesquisa = document.getElementById('pesquisaJogo')

    pesquisar.results.forEach((game) => {
        let divPesquisaInner = document.createElement("div")
        divPesquisaInner.className = "col-12 col-sm-12 col-md-6 col-lg-4 cardLancamentos my-3 border py-3 rounded"

        let genero = ""
        game.genres.forEach((genre) => {
            genero += genre.name + ", "
        })

        divPesquisaInner.innerHTML = `
                <div class="imagem-lancamentos text-center">
                    <img src="${game.background_image}" width="320" height="180" />
                </div>
                <div class="ml-2">
                    <p style="font-size: 20px"> <b> ${game.name} </b> </p>
                    <p><b>lançamento:</b> ${game.released}</p>
                    <p><b>Nota:</b> <span style="color: green; font-weight: bold;"> ${game.rating} </span> </p>
                    <p><b>gênero:</b> </p>
                    <a href="./detalhes.html?id=${game.id}" class="mais-det">mais detalhes</a>
                </div>   
        `
        divPesquisa.appendChild(divPesquisaInner)
    })

}

let pesquisa = document.getElementById('pesquisaJogo')
if(pesquisa){
    Pesquisa()
}

document.getElementById('btnPesquisar').addEventListener("click", (e) => {

    e.preventDefault();

    const pesquisa = document.getElementById('conteudoPesquisa').value;

    let url = './pesquisa.html?res=' + pesquisa;

    window.location.href = url
})

document.getElementById('conteudoPesquisa').addEventListener("keypress", (e) => {

    if(e.key === "Enter"){
        e.preventDefault();

        const pesquisa = document.getElementById('conteudoPesquisa').value;

        let url = './pesquisa.html?res=' + pesquisa;

        window.location.href = url
    }
    
})

function escondeSpinner(id){
    
    let spinner = document.getElementById(`spinner${id}`)

    spinner.classList.add('esconder')
}

