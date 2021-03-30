import { senators } from "../data/senators.js"
import { representatives } from "../data/representatives.js"

const congressGrid = document.querySelector('.congressGrid')
const seniority = document.querySelector('#seniority')
const birthday = document.querySelector('#birthday')

function populateCongressDiv(somearray) {
    somearray.forEach(person => {
        let personDiv = document.createElement('div')
        personDiv.className = 'figureDiv'
        let personFig = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')

        figImg.src = `https://www.govtrack.us/static/legislator-photos/412495-100px.jpeg`

        figCaption.textContent = person.name

        personFig.appendChild(figImg)
        personFig.appendChild(figCaption)
        personDiv.appendChild(personFig)
        congressGrid.appendChild(personDiv)
    })
}

function getSimplifiedPeople(peopleList) {
    return peopleList.map(person => {
        let middleName = person.middle_name ? `${person.middle_name}` : ``
        return {
            id: person.id,
            name: `${person.first_name} ${person.middle_name} ${person.last_name}`,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${person.govtrack_id}-100px.jpeg`
        }
    })
}

populateCongressDiv(getSimplifiedPeople(representatives))

// const repubButton = document.querySelector('#republicans')

// repubButton.addEventListener('click' , () => {
//     showRepub()
// })

// function showRepub() {
//     // const repubs = representatives.filter(rep => rep.party === 'R')
//     const repubs = representatives.map (rep => {
//         let smallRepub = {}
//         if(rep.party === 'R'){
          
//                 smallRepub.id = rep.id
//                 smallRepub.name = `${rep.first_name} ${rep.middle_name} ${rep.last_name}`
//             }
//             return smallRepub
//         })
//     console.log(repubs)
// }