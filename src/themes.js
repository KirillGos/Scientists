import { Dom } from './index.js';

function changeTheme() {
    Dom.theme === 'light' ? Dom.theme = 'dark' : Dom.theme = 'light';
    Dom.body.classList.toggle('dark-theme-body');
    Dom.root.classList.toggle('dark-theme-root');
    
    Dom.updateScientistMenu.classList.toggle('dark-theme-update-menu')
    Dom.updateScientistMenu.classList.toggle('dark-theme-update-menu');
    Dom.updateCard.classList.toggle('dark-theme-update-card');

    Dom.hideBtn.classList.toggle('dark-theme-hide');
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(element => {
        element.classList.toggle('dark-theme-cards');
    });

    const inputs = document.querySelectorAll('input');
    inputs.forEach(element => {
        element.classList.toggle('input-dark-theme');
    })
}


export { changeTheme }
