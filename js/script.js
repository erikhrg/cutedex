const body = document.querySelector("body");
let offset = body.dataset.offset;
let limit = body.dataset.limit;

let acc;
const listPokemon = document.querySelector("#listPokemon");

let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

const GetPokemons = async (url) => {
    try{
        const response = await fetch(url);
        const results = await response.json();
        console.log(results)
        DataPokemons(results.results)
    }catch(error){
        console.log(error);
    }
}

const DataPokemons = async (data) => {
    listPokemon.innerHTML = "";
    try{
        for(let index of data){
            const resp = await fetch(index.url);
            const resul = await resp.json();
            console.log(resul);
            if(resul.types[1]){
                acc = `
                <li>
                    <img src=${resul.sprites.front_default} alt=${resul.name}/>
                    <p id="dataLista">${resul.id} - ${resul.name}</p>  
                    <p id="tipo">${resul.types[0].type.name} <br/> ${resul.types[1].type.name}</p>
                </li>
                `;
                listPokemon.innerHTML+=acc;
            }else{
                acc = `
                <li>
                    <img src=${resul.sprites.front_default} alt=${resul.name}/>
                    <p id="dataLista">${resul.id} - ${resul.name}</p>
                    <p id="tipo">${resul.types[0].type.name}</p>
                </li>
                `;
                listPokemon.innerHTML+=acc;
            }
        }
        
    }catch(error){
        console.log(error);
    }
}

GetPokemons(pokemonUrl);


const pokemonId = document.querySelector("#pokemonId");
const pokemonName = document.querySelector("#pokemonName");
const pokemonImageDefault = document.querySelector("#pokemonImageDefault");
const pokemonImageShiny = document.querySelector("#pokemonImageShiny");
const pokemonType0 = document.querySelector("#type0");
const pokemonType1 = document.querySelector("#type1");



const formPesquisa = document.querySelector("#formPesquisa");
const inputPesquisa = document.querySelector("#inputPesquisa");

let pokemonPesquisa = 1;

const fetchPokemon = async (pokemon) => {
    const respostaPesquisa = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );
  
    if (respostaPesquisa.status == 200) {
        const respostaPesquisaConvertida = await respostaPesquisa.json();
        return respostaPesquisaConvertida;
    }
};

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Loading...";
    pokemonId.innerHTML = "";
  
    const respostaPesquisaConvertida = await fetchPokemon(pokemon);
  
    if (respostaPesquisaConvertida) {
        pokemonName.innerHTML = respostaPesquisaConvertida.name;
        pokemonId.innerHTML = respostaPesquisaConvertida.id + "&nbsp∣&nbsp";
        pokemonImageDefault.src = respostaPesquisaConvertida["sprites"]["front_default"];
        pokemonImageShiny.src = respostaPesquisaConvertida["sprites"]["front_shiny"];
            if(respostaPesquisaConvertida.types[1]){
                pokemonType0.innerHTML = respostaPesquisaConvertida.types[0].type.name + "&nbsp∣&nbsp";
                pokemonType1.innerHTML = respostaPesquisaConvertida.types[1].type.name;
            }

            if(!respostaPesquisaConvertida.types[1]){
                pokemonType0.innerHTML = respostaPesquisaConvertida.types[0].type.name;
                pokemonType1.innerHTML = "";
            };
        console.log(respostaPesquisaConvertida);
        inputPesquisa.value = "";
        pokemonPesquisa = respostaPesquisaConvertida.id;
    }else{
        pokemonImageDefault.style.display = 'none';
        pokemonImageShiny.style.display = 'none';
        pokemonName.innerHTML = "Not found ;-;";
        pokemonId.innerHTML = "";
    };
}
  
formPesquisa.addEventListener("submit", (event) => {
    event.preventDefault();
  
    renderPokemon(inputPesquisa.value.toLowerCase());
});

/* const body = document.querySelector("body");
const numero = body.id;
const endpointGen = `https://pokeapi.co/api/v2/generation/${numero}`
const listaPokemon = [];
const list = document.querySelector("ul");

async function generationReq(){
    const generation = await fetch(endpointGen)
    const generationConversao = await generation.json();

    listaPokemon.push(...generationConversao.pokemon_species);
    console.log(listaPokemon);
    return listaPokemon;
}

function renderPokemon(){
    generationReq(numero)
    listaPokemon.forEach(pokemon => {
        list.innerHTML += `
        <li>
            <span id="numero">${pokemon.name}</span>
            <span id="nome">${pokemon.name}</span>
        </li>
        `
    });
}
renderPokemon();
const pokeImage = document.querySelector("#image");
const pokeNumero = document.querySelector("#numero");
const pokeNome = document.querySelector("#nome");
const list = document.querySelector("ul");
const accumulator = "";

function renderPokemon(){
    
    var i = 1;
    const listPokemon = []; 
    listPokemon.forEach(pokemon => {
        accumulator += `
            <li>
                <span id="numero">${generationConversao[pokemon_species][name]}</span>
                <span id="nome"></span>
            </li>
        `
    });
}

renderPokemon(); */