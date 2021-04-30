import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../utils/index.js'

const congressGrid = document.querySelector('.congressGrid')
const seniorityButton = document.querySelector('#seniorityButton')
const republicansButton = document.querySelector('#republicans')
const democratsButton = document.querySelector('#democrats')
const independentsButton = document.querySelector('#independents')



seniorityButton.addEventListener('click', () => senioritySort())

republicansButton.addEventListener('click', () => {
    populateCongressDiv(filterCongressPeople(representatives, 'R'))
})

democratsButton.addEventListener('click', () => {
    populateCongressDiv(filterCongressPeople(representatives, 'D'))
})

independentsButton.addEventListener('click', () => {
    populateCongressDiv(filterCongressPeople(senators, 'ID'))
})

const filterCongressPeople = (chamber, politicalParty) => {
    return getSimplifiedPeople(chamber).filter(member => member.party === politicalParty)
}


function populateCongressDiv(simplifiedList) {
    removeChildren(congressGrid)
    simplifiedList.forEach(person => {
        let personDiv = document.createElement('div')
        personDiv.className = 'figureDiv'
        let personFig = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')

        figImg.src = person.imgURL
        figCaption.textContent = person.name

        if (person.party === 'R') figCaption.style.background = '#BA3439';
        if (person.party === 'D') figCaption.style.background = '#336ECC';
        if (person.party === 'ID') figCaption.style.background = '#6B45A1';

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
            seniority: parseInt(person.seniority, 10),
            party: person.party,
        }
    })
}

function senioritySort() {
    populateCongressDiv(getSimplifiedPeople(senators).sort((a, b) => a.seniority - b.seniority).reverse())
}

populateCongressDiv(getSimplifiedPeople(senators))