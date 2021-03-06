import { films } from '../data/films.js'
import { getLastNumber } from '../utils/index.js'

var x = document.getElementById("myHeader");

let movieList = document.querySelector('.movieList')

for (let i = 0; i < films.length; i++) {
    const foundFilm = films.find(film => getLastNumber(film.url) === (i + 1))
    let figure = document.createElement('figure')
    let newImage = document.createElement('img')
    let figCaption = document.createElement('figcaption')
    newImage.src = `https://starwars-visualguide.com/assets/img/films/${i + 1}.jpg`
    figCaption.textContent = foundFilm.title



    figure.appendChild(newImage)
    figure.appendChild(figCaption)
    movieList.appendChild(figure)
}

movieList.addEventListener('click', () => {
    window.open('https://en.wikipedia.org/wiki/Star_Wars');
})