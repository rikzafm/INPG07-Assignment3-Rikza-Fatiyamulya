const activeCaseCard = document.getElementById("cardActive");
const newCaseCard = document.getElementById("cardNew");
const recoveredCaseCard = document.getElementById("cardRecovered");
const totalCaseCard = document.getElementById("cardTotal");
const totalDeathCard = document.getElementById("cardDeath");
const totalTestCard = document.getElementById("cardTest");
const textInput = document.querySelector("#countryInput");
const button = document.querySelector("button");

let countries;

const dateInput = document.querySelector("#datePicker");
const datePicker = new Datepicker(dateInput, {

});

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'INSERT API KEY', //https://rapidapi.com/api-sports/api/covid-193
		'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
	}
};

const onType = (e) => {
    textInput.classList.remove('error');
    dateInput.classList.remove('error');
    countries = textInput.value;
    // console.log(countries);
    return countries;
}

async function getData () {
    try{
        isLoading();
        let chosenDate = String(showDate());
        const resp = await fetch(`https://covid-193.p.rapidapi.com/history?country=${countries}&day=${chosenDate}`, options)
        const data = await resp.json();
        // console.log(data.response[0].cases);
        isFinish();
        return displayStats(data);;
    } catch(err) {
        console.log("Failed to fetch data", err);
        textInput.classList.add('error');
        dateInput.classList.add('error');
        isFinish();
    }
}

const displayStats = (data) =>  {
    let {active, new:newCase, recovered, total} = data.response[0].cases ;
    let {total:totalDeath} = data.response[0].deaths;
    let {total:totalTest} = data.response[0].tests;

    activeCaseCard.firstChild.nodeValue= active;
    newCaseCard.firstChild.nodeValue= newCase;
    recoveredCaseCard.firstChild.nodeValue= recovered;
    totalCaseCard.firstChild.nodeValue= total;
    totalDeathCard.firstChild.nodeValue= totalDeath;
    totalTestCard.firstChild.nodeValue= totalTest;
}

const isLoading = () => {
        let div = document.createElement('div');
        div.classList.add("spinner-border");
        let span = document.createElement('span');
        const container = document.querySelector('#searchContainer');
        
        container.appendChild(div);
        div.appendChild(span);
        div.setAttribute("id", "loader");
        span.classList.add("sr-only");
}

const showDate = () => {
    const dateInput = document.querySelector("#datePicker").value;
    let dateArray = dateInput.split('/')
    let newDate = `${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`;
    // console.log(newDate);
    return newDate;
}

const setDateInitialValue = () => {
    let currentdate = new Date();
    let date = ("0" + currentdate.getDate()).slice(-2);
    let month = ("0" + (currentdate.getMonth() + 1)).slice(-2);
    let today = month  + "/" + date + "/" +  currentdate.getFullYear();
    document.querySelector("#datePicker").value = today;
}

const setInitialCountry = () => {
    textInput.value = "All"
}

const isFinish = () => {
    // console.log("IsLoading: error");
    document.querySelector("#loader").remove();
}

const onSubmit = () => {
    showDate();
    onType();
    getData();
}

const startup = () => {
    setDateInitialValue();
    setInitialCountry();
    onSubmit();
}

startup();
//by Rikza Fatiyamulya