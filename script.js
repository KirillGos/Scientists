const displayScientistSec = document.querySelector('#display-scientist');
const root = document.querySelector('#root');

// add a person
const scientistNameInput = document.querySelector('#scientist-name-input');
const scientistWork = document.querySelector('#scientist-work-input');
const scientistCountry = document.querySelector('#scientist-country-input');
const addPerson = document.querySelector('#submit-btn');

// search section
const searchBtn = document.querySelector('#search-btn');
const searchTitle = document.querySelector('#search-title')
const searchByNameInput = document.querySelector('#search-by-name-input');
const searchByCountryInput = document.querySelector('#search-by-country-input');
const searchByNameSec = document.querySelector('#search-by-name');
const searchByCountrySec = document.querySelector('#search-by-country');

//update section
const openUpdateMenu = document.querySelector('#edit-update');
const updateBtn = document.querySelector('#update-scientist-btn');
const updateScientistMenu = document.querySelector('#update-scientist-menu');

// update section inputs
const scientistUpdateInput = document.querySelector('#scientist-update-index-input');
const enterNewNameInput = document.querySelector('#enter-new-name-input');
const enterNewWorkDesInput = document.querySelector('#enter-new-work-desc-input');
const enterNewCountryInput = document.querySelector('#enter-new-country-input');

// hide root menu button
const hideBtn = document.querySelector('#hide');

// enable delete
const enableDelete = document.querySelector('#enable-delete');

const scientists = [
    { name: "Isaac Newton", work: "Classical Mechanics", country: "England" },
    { name: "Albert Einstein", work: "Theory of Relativity", country: "Germany" },
    { name: "Charles Darwin", work: "Evolutionary Biology", country: "England" },
    { name: "Galileo Galilei", work: "Astronomy and Physics", country: "Italy" },
    { name: "Nikola Tesla", work: "Electrical Engineering", country: "Serbia" },
    { name: "Leonardo da Vinci", work: "Art and Science", country: "Italy" },
    { name: "Stephen Hawking", work: "Theoretical Physics", country: "England" },
    { name: "Ada Lovelace", work: "Computer Programming", country: "England" },
    { name: "Max Planck", work: "Quantum Theory", country: "Germany" },
    { name: "Marie Curie", work: "Radioactivity", country: "Poland" },
    { name: "Niels Bohr", work: "Quantum Mechanics", country: "Denmark" },
    { name: "Louis Pasteur", work: "Microbiology", country: "France" },
    { name: "Rosalind Franklin", work: "DNA Structure", country: "England" },
    { name: "Johannes Kepler", work: "Astronomy", country: "Germany" },
    { name: "Srinivasa Ramanujan", work: "Mathematics", country: "India" },
    { name: "Enrico Fermi", work: "Nuclear Physics", country: "Italy" },
    { name: "James Clerk Maxwell", work: "Electromagnetism", country: "Scotland" },
    { name: "Alan Turing", work: "Computer Science", country: "England" },
    { name: "Erwin Schrödinger", work: "Quantum Mechanics", country: "Austria" },
    { name: "Dmitri Mendeleev", work: "Chemistry", country: "Russia" },
    { name: "Jane Goodall", work: "Primatology", country: "England" },
    { name: "Gregor Mendel", work: "Genetics", country: "Austria" },
    { name: "Richard Feynman", work: "Quantum Mechanics", country: "USA" },
    { name: "Emmy Noether", work: "Mathematics", country: "Germany" },
    { name: "Andrei Sakharov", work: "Nuclear Physics", country: "Russia" },
    { name: "Carl Sagan", work: "Astronomy", country: "USA" },
    { name: "Barbara McClintock", work: "Genetics", country: "USA" },
    { name: "Louis de Broglie", work: "Quantum Mechanics", country: "France" },
    { name: "Aristotle", work: "Philosophy and Science", country: "Greece" },
    { name: "Max Born", work: "Quantum Mechanics", country: "Germany" },
    { name: "Jonas Salk", work: "Medicine", country: "USA" },
    { name: "Paul Dirac", work: "Quantum Mechanics", country: "England" },
    { name: "Rachel Carson", work: "Ecology", country: "USA" },
    { name: "Linus Pauling", work: "Chemistry", country: "USA" },
    { name: "Robert Hooke", work: "Biology", country: "England" },
    { name: "Edwin Hubble", work: "Astronomy", country: "USA" },
    { name: "Antoine Lavoisier", work: "Chemistry", country: "France" },
    { name: "Werner Heisenberg", work: "Quantum Mechanics", country: "Germany" },
    { name: "Alexander Fleming", work: "Medicine", country: "Scotland" },
    { name: "Ada Yonath", work: "Crystallography", country: "Israel" },
    { name: "Geraldine Seydoux", work: "Developmental Biology", country: "USA" },
    { name: "John Bardeen", work: "Physics", country: "USA" },
    { name: "Yuri Gagarin", work: "Astronautics", country: "Russia" },
    { name: "Katherine Johnson", work: "Mathematics", country: "USA" },
    { name: "Grace Hopper", work: "Computer Science", country: "USA" },
    { name: "Vera Rubin", work: "Astronomy", country: "USA" },
    { name: "Claude Shannon", work: "Information Theory", country: "USA" },
    { name: "Carol Greider", work: "Molecular Biology", country: "USA" },
    { name: "Kip Thorne", work: "Theoretical Physics", country: "USA" },
    { name: "Margaret Hamilton", work: "Computer Science", country: "USA" },
];

class Scientist {
    constructor(name, work, country) {
        this.name = name;
        this.work = work;
        this.country = country;
    }
    get scientistDescription() {
        return `${this.name} ${this.work} ${this.country}`

    }
}

function renderAddInfo() {
    const scientistNameText = scientistNameInput.value;
    const scientistWorkText = scientistWork.value;
    const scientistCountryText = scientistCountry.value;

    scientistNameInput.value = '';
    scientistWork.value = '';
    scientistCountry.value = '';

    const newObj = new Scientist(scientistNameText, scientistWorkText, scientistCountryText);
    scientists.push(newObj);
    restartSearch();
    displayScientist()
}

function displayScientist(array = scientists) {
    displayScientistSec.innerHTML = "";
    array.forEach((person) => {
        const cardTemplate = `
            <div id="card">
                <h2 id="scientist-name-h2">${array.indexOf(person) + 1}. ${person.name}</h2>
                <p id="scientist-work-p"><strong>Work</strong>: ${person.work}</p>
                <p id="scientist-country-p"><strong>Country</strong>: ${person.country}</p>
            </div>`;
        displayScientistSec.insertAdjacentHTML('beforeend', cardTemplate);
    });
}

function searchScientist() {
    if (enableDelete.dataset.status === 'not-active') {
        if (searchBtn.dataset.status == 'inactive') {
            filter();
            restartSearch();
        } else {
            displayScientist();
            restartSearch()
        }
    }  else {
        filter();
        restartSearch();
        deleteMode();
    }
}
function filter() {
    let lookingForName = searchByNameInput.value.toLowerCase().trim();
    let lookingForCountry = searchByCountryInput.value.toLowerCase().trim();

    const filtered = scientists.filter((object) => {
        let compareName = lookingForName.split(' ')[0] ?
            object.name.toLowerCase().split(' ')[0] === lookingForName.split(' ')[0] :
            true;

        let compareLastName = lookingForName.split(' ')[1] ?
            object.name.toLowerCase().split(' ')[1] === lookingForName.split(' ')[1] :
            true;

        let compareCountry = object.country.toLowerCase().includes(lookingForCountry);
        return compareCountry && compareName && compareLastName;
    });
    if (lookingForName == "" && filtered.length > 0 && filtered.length !== 1) {
        let text = `<h1>All Scientists From <span  class="scientists-from-country">${lookingForCountry}</span></h1>`;
        searchTitle.innerHTML = text;
        displayScientist(filtered);
    } else if (filtered.length > 0 && lookingForCountry == '' && filtered.length !== 1) {
        let text = `<h1>All Scientists with the name of <span  class="scientists-from-country">${lookingForName}</span> </h1>`;
        searchTitle.innerHTML = text;
        displayScientist(filtered);
    } else if (filtered.length == 1) {
        let text = `<h1>ONE AND ONLY <br> ${filtered[0].name}</h1>`
        searchTitle.innerHTML = text;
        displayScientist(filtered);
    }
    if (filtered.length === 0) {
        displayScientistSec.innerHTML = '<h1>No Results</h1>'
    }
}
function toggleUpdateMenu() {
    updateScientistMenu.classList.toggle('hidden');
    restartSearch();
}

function restartSearch() {
    if (searchBtn.dataset.status == 'active') {
        searchBtn.dataset.status = 'inactive';
        searchTitle.innerHTML = "";
        searchBtn.innerText = 'Search';
    } else {
        searchBtn.dataset.status = 'active';
        searchBtn.innerText = 'Show All';
    }
    searchByNameSec.classList.toggle('hidden')
    searchByCountrySec.classList.toggle('hidden')
    searchByNameInput.value = '';
    searchByCountryInput.value = '';
}

function updateScientist() {
    let indexOfScientist = Number(scientistUpdateInput.value) - 1;
    let newName = enterNewNameInput.value;
    let newWorkDes = enterNewWorkDesInput.value;
    let newCountry = enterNewCountryInput.value;

    let newObject = new Scientist(newName, newWorkDes, newCountry)
    scientists.splice(indexOfScientist, 1, newObject);
    displayScientist();
    toggleUpdateMenu();

    enterNewCountryInput.value = '';
    enterNewWorkDesInput.value = '';
    scientistUpdateInput.value = '';
    enterNewNameInput.value = '';
}

function hideMenu() {
    root.classList.toggle('hidden');
}

function showDeleteBtns() {
    if (searchBtn.dataset.status == 'active' && enableDelete.dataset.status === 'active') {
        searchScientist()
    }

    if (enableDelete.dataset.status === 'not-active') {
        enableDelete.textContent = 'Save';
        enableDelete.dataset.status = 'active'
        deleteMode();
    } else {
        enableDelete.textContent = 'Click to Delete';
        displayScientist();
        enableDelete.dataset.status = 'not-active';
    }
}

function deleteMode() {
    let allCards = document.querySelectorAll('#card');
    for (let card of allCards) {
        let deleteBtn = document.createElement('div');
        deleteBtn.id = 'delete-button';
        deleteBtn.innerText = 'X';

        deleteBtn.addEventListener('click', () => {
            let index = Array.from(allCards).indexOf(card);
            scientists.splice([index], 1);
            card.remove();
        });
        card.append(deleteBtn);
        card.style.backgroundColor = 'lightblue'
    }
}

enableDelete.addEventListener('click', showDeleteBtns)
hideBtn.addEventListener('click', hideMenu);
updateBtn.addEventListener('click', updateScientist);
openUpdateMenu.addEventListener('click', toggleUpdateMenu);
searchBtn.addEventListener('click', searchScientist);
addPerson.addEventListener('click', renderAddInfo);
displayScientist();
