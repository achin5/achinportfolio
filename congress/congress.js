import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'

const congressGrid = document.querySelector('.congressGrid')
const seniorityButton = document.querySelector('#seniorityButton')
const birthdayButton = document.querySelector('#birthdayButton')

seniorityButton.addEventListener('click', () => {

})

function populateCongressDiv(simplifiedList) {
    simplifiedList.forEach(person => {
        let personDiv = document.createElement('div')
        personDiv.className = 'figureDiv'
        let personFig = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')

        figImg.src = person.imgURL
        
        figCaption.textContent = person.name

        personFig.appendChild(figImg)
        personFig.appendChild(figCaption)
        personDiv.appendChild(personFig)
        congressGrid.appendChild(personDiv)
    })
}

function getSimplifiedPeople(peopleList) {
    return peopleList.map(person => {
        let middleName = person.middle_name ? ` ${person.middle_name}` : ``
        return {
            id: person.id,
            name: `${person.first_name}${middleName} ${person.last_name}`,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${person.govtrack_id}-200px.jpeg`,
            seniority: parseInt(person.seniority, 10)
        }
    })
}

function senioritySort() {
    populateCongressDiv(getSimplifiedPeople(senators).sort((a, b) => a.seniority - b.seniority.reverse

    populateCongressDiv(getSimplifiedPeople(senators))


/* const repubButton = document.querySelector('#republicans')
repubButton.addEventListener('click', () => {
    showRepublicans()
})
function showRepublicans() {
    //const repubs = representatives.filter(rep => rep.party === 'R')
    // TODO:  Looks like filter first then map would be best
    const repubs = representatives.map(rep => {
        let smallRepub = {}
        if (rep.party === 'R') {
                smallRepub.id = rep.id
                smallRepub.name = `${rep.first_name} ${rep.middle_name} ${rep.last_name}`
        }
        return smallRepub
    })
    console.log(repubs)
} */