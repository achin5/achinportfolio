import { starships } from '../data/starships.js'

const main = document.querySelector('main')
const navList = document.querySelector('.navList')
const shipView = documnet.querySelector('.shipView')

function populateNav() {
    starships.forEach((starship) => {
        let listItem = document.createElement('li')
        listItem.textContent = starship.name

        navList.appendChild(listItem)
    })
}

populateNav()