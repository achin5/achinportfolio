import { films } from '../data/films.js'

// let itemOne = document.querySelector('#item1');
// let itemTwo = document.querySelector('#item2')

// itemOne.textContent = films[2].title
// itemTwo.textContent = films[1].title

// console.log(films[0].title);

let titlelist = document.querySelector('.titleList')

for (var i = 0; i < films.length; i++) {
    let title = films[i].title
    let newItem = document.createElement('li')
    newItem.textContent = title
    titlelist.appendChild(newItem)

}