import {
    showDeleteBtns,
    hideMenu,
    updateScientist,
    toggleUpdateMenu,
    searchScientist,
    renderAddInfo,
    displayScientist
} from './app.js';

import { changeTheme } from './themes.js';

export const Dom = {
    theme: 'light',
    body: document.querySelector('body'),
    root: document.querySelector('#root'),
    displayScientistSec: document.querySelector('#display-scientist'),

    // add a person
    scientistNameInput: document.querySelector('#scientist-name-input'),
    scientistWork: document.querySelector('#scientist-work-input'),
    scientistCountry: document.querySelector('#scientist-country-input'),
    addPerson: document.querySelector('#submit-btn'),
    scientistDescriptionTextarea : document.querySelector('#scientist-description-textarea'),
    scientistImageInput: document.querySelector('#scientist-image-input'),

    // search section
    searchBtn: document.querySelector('#search-btn'),
    searchTitle: document.querySelector('#search-title'),
    searchByNameInput: document.querySelector('#search-by-name-input'),
    searchByCountryInput: document.querySelector('#search-by-country-input'),
    searchByNameSec: document.querySelector('#search-by-name'),
    searchByCountrySec: document.querySelector('#search-by-country'),

    //update section
    openUpdateMenu: document.querySelector('#edit-update'),
    updateBtn: document.querySelector('#update-scientist-btn'),
    updateScientistMenu: document.querySelector('#update-scientist-menu'),
    updateCard: document.querySelector('#update-card'),

    // update section inputs
    scientistUpdateInput: document.querySelector('#scientist-update-index-input'),
    enterNewNameInput: document.querySelector('#enter-new-name-input'),
    enterNewWorkDesInput: document.querySelector('#enter-new-work-desc-input'),
    enterNewCountryInput: document.querySelector('#enter-new-country-input'),

    // hide root menu button
    hideBtn: document.querySelector('#hide'),

    // enable delete
    enableDelete: document.querySelector('#enable-delete'),

    // theme buttons

    lightThemeBtn: document.querySelector('#light-theme'),
    darkThemeBtn: document.querySelector('#dark-theme'),
}
Dom.enableDelete.addEventListener('click', showDeleteBtns)
Dom.hideBtn.addEventListener('click', hideMenu);
Dom.updateBtn.addEventListener('click', updateScientist);
Dom.openUpdateMenu.addEventListener('click', toggleUpdateMenu);
Dom.searchBtn.addEventListener('click', searchScientist);
Dom.addPerson.addEventListener('click', renderAddInfo);
Dom.darkThemeBtn.addEventListener('click', changeTheme);
Dom.lightThemeBtn.addEventListener('click', changeTheme);

displayScientist();
