const cityBtn = document.getElementById('city-btn')
const stateBtn = document.getElementById('state-btn')
const centreBtn = document.getElementById('centre-btn')
let inputField = document.getElementById('input');
let allCentres = [];

function getCentres() {
    fetch('https://isro.vercel.app/api/centres')
        .then(res => res.json())
        .then(data => {
            allCentres = data.centres
            displayResults(allCentres)
        })
}


cityBtn.addEventListener('click', filterCentres);
stateBtn.addEventListener('click', filterCentres);
centreBtn.addEventListener('click', filterCentres);


function filterCentres(event) {
    const clickedButton = event.target.innerHTML;
    let filterKey;
    if (clickedButton == 'City') {
        filterKey = 'Place';
    } else if (clickedButton == 'State') {
        filterKey = 'State';
    } else {
        filterKey = 'name';
    }

    let userInput = inputField.value;
    let filteredCentres = allCentres.filter(centre => centre[filterKey].toLowerCase().includes(userInput.toLowerCase()))
    displayResults(filteredCentres);
}


function displayResults(centresToDisplay) {
    let resTable = document.getElementById('resultTable');
    resTable.textContent = '';

    let htmlContent = `
        <tr>
            <th>Centre</th>    
            <th>City</th>    
            <th>State</th>    
        </tr>
        `
    for (let centre of centresToDisplay) {
        htmlContent += `
            <tr>
                <td>${centre.name}</td>
                <td>${centre.Place}</td>
                <td>${centre.State}</td>
            </tr>
        `
    }
    resTable.innerHTML = htmlContent;
}

window.onload = getCentres;