import { removeChildren } from "../utils/index.js"

const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.loadPokemon')
const fetchButton = document.querySelector('.fetchPokemonByID')
const newButton = document.querySelector('.newPokemon')

let offset = 0
let limit = 25

loadButton.addEventListener('click', () => {
    loadPage(offset, limit)
    offset = offset + limit
})

fetchButton.addEventListener('click', () => {
    let pokeId = prompt("Pokemon ID or Name:").toLowerCase()
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`).then(
        data => populatePokeCard(data)
    ).catch(error => console.log(error)) 
})


async function getAPIData(url) {
    try {
        const response = await fetch(url) // try getting data from the API at the url provided
        const data = await response.json() // convert the response into JSON
        return data // return the data from the function to whoever called it
    } catch (error) {
        // must have been an error
        console.log(error)
        alert('Could not find that data')
    }
}

function loadPage(offset, limit) {
    removeChildren(pokeGrid)
    getAPIData(`https://pokeapi.co/api/v2/pokemon?offset=${offset}limit=${limit}`).then(
        async (data) => {
            for (const singlePokemon of data.results) {
                await getAPIData(singlePokemon.url).then(
                    (pokeData) => populatePokeCard(pokeData)
                )
            }
        },
    )
    offset = limit
}

class Pokemon {
    constructor(name, height, weight, abilities, forms) {
        this.id = 900
        this.name = name
        this.height = height
        this.weight = weight
        this.abilities = abilities
        this.forms = forms
    }
}

newButton.addEventListener('click', () => {
    removeChildren(pokeGrid)
    let pokeName = prompt("What do you want to name your Pokemon?")
    let pokeHeight = prompt("What is the height of your Pokemon?")
    let pokeWeight = prompt("What is the weight of your Pokemon?")
    let newPokemon = new Pokemon(
        pokeName,
        pokeHeight,
        pokeWeight,
        ['eat', 'sleep'],
        ['study', 'code', 'super-silence' ]
    )
    populatePokeCard(newPokemon)
})

function populatePokeCard(singlePokemon) {
    // use the same html as in the CodePen Card flip example
    let pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    let pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () => {
        pokeCard.classList.toggle('is-flipped')
        // Card flip sound
        let myAudio = document.querySelector('#audio')
        myAudio.play()
    })
    // make the card front
    pokeCard.appendChild(populateCardFront(singlePokemon))
    // make the card back
    pokeCard.appendChild(populateCardBack(singlePokemon))
    // append them all to pokeGrid
    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
    let pokeFront = document.createElement('div')
    pokeFront.className = 'card__face card__face--front'
    let frontLabel = document.createElement('p')
    frontLabel.textContent =  pokemon.name
    let frontLabelId = document.createElement('p')
    frontLabelId.textContent = `Id: ${pokemon.id}`
    let frontImage = document.createElement('img')
    frontImage.src = getImageFileName(pokemon)
    frontImage.addEventListener('error', () => (frontImage.src = '/images/missingimg.png'),)
    pokeFront.appendChild(frontImage)
    pokeFront.appendChild(frontLabel)
    pokeFront.appendChild(frontLabelId)
    return pokeFront
}

function populateCardBack(pokemon) {
    let pokeBack = document.createElement('div')
    pokeBack.className = 'card__face card__face--back'
    // let backLabel = document.createElement('p')
    // backLabel.textContent = `Moves: ${pokemon.moves.length}`
    let backLabelWeight = document.createElement('p')
    backLabelWeight.textContent = `Weight: ${pokemon.weight}`
    let backLabelHeight = document.createElement('p')
    backLabelHeight.textContent = `Height: ${pokemon.height}`
    let backLabelAbilities = document.createElement('p')
    backLabelAbilities.textContent = `Abilites: ${pokemon.abilities.length}`
    // pokeBack.appendChild(backLabel)
    pokeBack.appendChild(backLabelWeight)
    pokeBack.appendChild(backLabelHeight)
    pokeBack.appendChild(backLabelAbilities)
    // Back of card img
    // pokeBack.classList.add(pokemon.types[0].type.name)
    return pokeBack
}

function getImageFileName(pokemon) {
    let pokeId
    if (pokemon.id < 10) pokeId = `00${pokemon.id}`
    if (pokemon.id > 9 && pokemon.id < 100) pokeId = `0${pokemon.id}`
    if (pokemon.id > 99 && pokemon.id < 810) pokeId = pokemon.id
    if (pokemon.id === 900){
        return `../images/pokesym.png`
    }

    return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeId}.png`
}