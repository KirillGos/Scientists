const displayScientistSec = document.querySelector('#display-scientist');
const scientistNameInput = document.querySelector('#scientist-name-input');
const scientistWork = document.querySelector('#scientist-work-input');
const scientistCountry = document.querySelector('#scientist-country-input');
const root = document.querySelector('#root');
const submitButton = document.querySelector('#submit-btn');
const searchBtn = document.querySelector('#search-btn');
const deleteBtn = document.querySelector('#delete-btn');
const deleteScientistMenu = document.querySelector('#delete-scientist-menu');
const deleteScientistBtn = document.querySelector('#delete-scientist-btn');
const body = document.querySelector('body');
const countryTitle = document.querySelector('#country-title')
const searchByNameInput = document.querySelector('#search-by-name-input');
const searchByCountryInput = document.querySelector('#search-by-country-input');
const updateInput = document.querySelector('#scientist-update-input');
const openUpdateMenu = document.querySelector('#edit-update');
const updateBtn = document.querySelector('#update-scientist-btn');
const updateScientistMenu = document.querySelector('#update-scientist-menu');

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
    if (searchBtn.dataset.status == 'inactive') {
        searchBtn.dataset.status = 'active';
        searchBtn.innerText = 'Show All'
        let lookingForName = searchByNameInput.value.toLowerCase().trim();
        let lookingForCountry = searchByCountryInput.value.toLowerCase().trim();

        const filtered = scientists.filter((object) => {
            return object.name.toLowerCase().includes(lookingForName) && object.country.toLowerCase().includes(lookingForCountry);
        });
        if(lookingForCountry != "" && filtered.length > 0) {
            let text = `<p>All Scientists From <span  class="scientists-from-country">${lookingForCountry}</span></p>`;
            countryTitle.insertAdjacentHTML('beforeend', text);
        }
        displayScientist(filtered);

        searchByNameInput.value = '';
        searchByCountryInput.value = '';
    } else {
        displayScientist();
        restartSearch()
    }
}
function toggleDeleteScientistMenu() {
    deleteScientistMenu.classList.toggle('hidden');
    restartSearch();
}
function toggleUpdateMenu() {
    updateScientistMenu.classList.toggle('hidden');
    restartSearch();
}
function deleteScientist() {
    const scientistInput = document.querySelector('#scientist-delete-input');
    const inputText = scientistInput.value.toLowerCase().trim();

    scientists.forEach((object) => {
        let lookingFor = object.name.toLowerCase();
        if (lookingFor.includes(inputText) && !inputText == '') {
            let index = scientists.indexOf(object);
            scientists.splice(index, 1);
        }
    });
    displayScientist();
    toggleDeleteScientistMenu();
    scientistInput.value = '';
}
function restartSearch() {
     countryTitle.innerHTML = "";
     searchBtn.innerText = 'Search'
     searchBtn.dataset.status = 'inactive';    
     searchByNameInput.value = '';
     searchByCountryInput.value = '';
}

openUpdateMenu.addEventListener('click', toggleUpdateMenu)
deleteScientistBtn.addEventListener('click', deleteScientist)
deleteBtn.addEventListener('click', toggleDeleteScientistMenu);
searchBtn.addEventListener('click', searchScientist);
submitButton.addEventListener('click', renderAddInfo);
displayScientist();