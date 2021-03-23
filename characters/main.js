import { people } from '../data/people.js'
import { getLastNumber, removeChildren } from '../utils/index.js'

const mainContent = document.querySelector('#main')

const mainHeader = document.createElement('header')

document.body.insertBefore(mainHeader, mainContent)

// Trying Styling Through JS
document.getElementById("myH1").style.fontSize = "50px"
document.getElementById("myH1").style.padding = "25px"
document.getElementById("myH1").style.backgroundColor = "darkblue"
document.getElementById("myH1").style.marginBottom = "25px"


// Male Button
const maleButton = document.createElement('button')
maleButton.textContent = 'Male Characters'
maleButton.addEventListener('click', () => populateDOM(maleCharacters))
mainHeader.appendChild(maleButton)


// Female Button
const femaleButton = document.createElement('button')
femaleButton.textContent = 'Female Characters'
femaleButton.addEventListener('click', () => populateDOM(femaleCharacters))
mainHeader.appendChild(femaleButton)

// Other Gender Button
const otherButton = document.createElement('button')
otherButton.textContent = 'Other Characters'
otherButton.addEventListener('click', () => populateDOM(otherCharacters))
mainHeader.appendChild(otherButton)

// Everyones favorite Button
const favoriteButton = document.createElement('button')
favoriteButton.textContent = `Everyone's Favorite`
favoriteButton.addEventListener('click', () => populateDOM(favoriteCharacters))

mainHeader.appendChild(favoriteButton)

// Filter
const maleCharacters = people.filter(person => person.gender === 'male')
const femaleCharacters = people.filter(person => person.gender === 'female')
const otherCharacters = people.filter(person => {
    if (person.gender === 'n/a' || person.gender === 'none' || person.gender === 'hermaphrodite') {
        return person
    }
})

const favoriteCharacters = people.filter(person => person.name === 'Jar Jar Binks')




mainHeader.appendChild(femaleButton)
document.body.insertBefore(mainHeader, mainContent)









function populateDOM(characters) {
 removeChildren(mainContent)
 characters.forEach(person => {
    const charFigure = document.createElement('figure')
    const charImg = document.createElement('img')
    let charNum = getLastNumber(person.url)
    charImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
    const charCaption = document.createElement('figcaption')

    charCaption.textContent = person.name

    charFigure.appendChild(charImg)
    charFigure.appendChild(charCaption)
    mainContent.appendChild(charFigure)

})
}
