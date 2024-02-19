import { Dom } from './index.js';
import scientists from "./scientists.json" assert { type: 'json' };
export {
    showDeleteBtns,
    hideMenu,
    updateScientist,
    toggleUpdateMenu,
    searchScientist,
    renderAddInfo,
    displayScientist,
}

class Scientist {
    constructor(name, work, country, description, image) {
        this.name = name;
        this.work = work;
        this.country = country;
        this.description = description;
        this.image =  image;
    }
    get scientistDescription() {
        return `${this.name} ${this.work} ${this.country}`
    }
}

function renderAddInfo() {
    const scientistNameText = Dom.scientistNameInput.value;
    const scientistWorkText = Dom.scientistWork.value;
    const scientistCountryText = Dom.scientistCountry.value;
    const scientistDiscription = Dom.scientistDescriptionTextarea.value;
    const scientistImage = Dom.scientistImageInput.value;

    
    Dom.scientistImageInput.value = '';
    Dom.scientistDescriptionTextarea.value = '';
    Dom.scientistCountry.value = '';
    Dom.scientistWork.value = '';
    Dom.scientistNameInput.value  = '';

    const newObj = new Scientist(scientistNameText, scientistWorkText, scientistCountryText, scientistDiscription, scientistImage);
    scientists.push(newObj);
    displayScientist()
}

function displayScientist() {
    Dom.displayScientistSec.innerHTML = "";
    scientists.forEach(person => {
        const cardTemplate = `
        <div class="${Dom.theme}-theme-cards card">
         <div class="front-side">
             <button id='delete-button' class="hidden">X</button>    
             <div class="card-title-sec">
                <h3 id="scientist-name-h2">${scientists.indexOf(person) + 1}. ${person.name}</h3>
                <img src="${person.image}">
             </div>
             <p id="scientist-work-p"><strong>Work</strong>: ${person.work}</p>
             <p id="scientist-country-p"><strong>Country</strong>: ${person.country}</p>
        </div>
            <div class="back-side">
                <h3>Biography:</h3>
                <p>${person.description}</p>
            </div>
        </div>`;
        Dom.displayScientistSec.insertAdjacentHTML('beforeend', cardTemplate);
    });
    clickCard();
    updateIndex();
    deleteAction();
};

function deleteAction() {
    document.querySelectorAll('#delete-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const currentIndex = +e.target.parentElement.parentElement.dataset.index;
            scientists.splice(currentIndex, 1, null);
            e.target.parentElement.parentElement.remove();
            console.log(scientists);
        });
    });
}

function updateIndex() {
    const allCards = document.querySelectorAll('.card');
    let count = 0;
    allCards.forEach(card => {
        card.dataset.index = count;
        count++;
    })
}

function searchScientist() {
    if (Dom.enableDelete.dataset.status === 'not-active') {
        if (Dom.searchBtn.dataset.status == 'inactive') {
            search();
            restartSearch();
        } else {
            displayScientist();
            restartSearch()
        }
    } else if (Dom.searchBtn.dataset.status == 'active') {
        cleanArray();
        displayScientist();
        restartSearch(); 
       Dom.enableDelete.dataset.status = 'not-active';
        showDeleteBtns();
    } else {
        search();
        restartSearch()
    }
}

function search() {
    // get info from inputs
    let lookingForName = Dom.searchByNameInput.value.toLowerCase().trim();
    let lookingForCountry = Dom.searchByCountryInput.value.toLowerCase().trim();

    // create a filtered array
    const allCards = document.querySelectorAll('.card');
    allCards.forEach((object) => {
        let indexOfObject = object.dataset.index;
        let currentScientist = scientists[indexOfObject];
        let compareName = lookingForName.split(' ')[0] ?
            currentScientist.name.toLowerCase().split(' ')[0] === lookingForName.split(' ')[0] :
            true;

        let compareLastName = lookingForName.split(' ')[1] ?
            currentScientist.name.toLowerCase().split(' ')[1] === lookingForName.split(' ')[1] :
            true;

        let compareCountry = currentScientist.country.toLowerCase().includes(lookingForCountry);
        if (!(compareCountry && compareName && compareLastName)) {
            object.remove();
        }
    });
    const allCardsAfterFilter = document.querySelectorAll('.card');
    // display search title according to the found results
    let text;
    if (lookingForName == "" && allCardsAfterFilter.length > 0) {
        text = `<h1>All Scientists From <span class="capitalize">${lookingForCountry}</span></h1>`;
    } else if (lookingForCountry == '' && allCardsAfterFilter.length === 1) {
        text = `<h1>ONE AND ONLY <br> <storng class="capitalize">${lookingForName}</strong></h1>`;
    } else if (allCardsAfterFilter.length === 0) {
        text = `<h1>No results found</h1>`
    } else {
        text = `<h1>All Scientists with the name of <strong class="capitalize">${lookingForName}</strong></h1>`
    }
    Dom.searchTitle.insertAdjacentHTML('afterbegin', text);
}

function toggleUpdateMenu() {
    Dom.updateScientistMenu.classList.toggle('hidden');
    restartSearch();
}

function restartSearch() {
    if (Dom.searchBtn.dataset.status == 'active') {
        Dom.searchBtn.dataset.status = 'inactive';
        Dom.searchTitle.innerHTML = "";
        Dom.searchBtn.innerText = 'Search';
    } else {
        Dom.searchBtn.dataset.status = 'active';
        Dom.searchBtn.innerText = 'Show All';
    }
    Dom.searchByNameSec.classList.toggle('hidden')
    Dom.searchByCountrySec.classList.toggle('hidden')
    Dom.searchByNameInput.value = '';
    Dom.searchByCountryInput.value = '';
}

function updateScientist() {
    let indexOfScientist = Number(Dom.scientistUpdateInput.value) - 1;
    let newName = Dom.enterNewNameInput.value;
    let newWorkDes = Dom.enterNewWorkDesInput.value;
    let newCountry = Dom.enterNewCountryInput.value;

    let newObject = new Scientist(newName, newWorkDes, newCountry)
    scientists.splice(indexOfScientist, 1, newObject);
    displayScientist();
    toggleUpdateMenu();

    Dom.enterNewCountryInput.value = '';
    Dom.enterNewWorkDesInput.value = '';
    Dom.scientistUpdateInput.value = '';
    Dom.enterNewNameInput.value = '';
}

function hideMenu() {
    Dom.root.classList.toggle('hidden');
}

function showDeleteBtns() {
    displayFrontSide();
    if (Dom.searchBtn.dataset.status == 'active' && Dom.enableDelete.dataset.status === 'active') {
        searchScientist()
    }
    if (Dom.enableDelete.dataset.status === 'not-active') {
        const allCards = document.querySelectorAll('.card');
        const delBtns = document.querySelectorAll('#delete-button');
        for (let card of allCards) {
            card.style.backgroundColor = 'lightblue'
        }
        for (let btn of delBtns) {
            btn.classList.toggle('hidden');
        }
        Dom.enableDelete.textContent = 'Save';
        Dom.enableDelete.dataset.status = 'active'
    } else {
        cleanArray()
        Dom.enableDelete.textContent = 'Click to Delete';
        displayScientist();
        Dom.enableDelete.dataset.status = 'not-active';
    }
}

function cleanArray() {
    for (let i = 0; i < scientists.length; i++) {
        if (scientists[i] === null) {
            scientists.splice(i, 1);
            i--;
        }
    }
}

// click card event
function clickCard() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.addEventListener('click', (e) => {
            card.classList.toggle('turn-back')
        })
    })
}

function displayFrontSide() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.classList.remove('turn-back')
    })
}