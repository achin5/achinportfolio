const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.loadPokemon')

loadButton.addEventListener('click', () => {
    loadPage()
})

async function getAPIData(url) {
    try {
        const response = await fetch(url) // try getting data from the API at the url provided
        const data = await response.json() // convert the response into JSON
        return data // return the data from the function to whoever called it
    } catch (error){}

}

function loadPage() {
    getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=25`).then(
        (data) => {
            for (const singlePoke of data.results) {
                populatePokeCard(singlePoke)
            }
        }
    )

}

function populatePokeCard(singlePokemon) {
    let pokeScene = document.createElement('div')
    let pokeCard = document.createElement('div')
    console.log(singlePoke)
}