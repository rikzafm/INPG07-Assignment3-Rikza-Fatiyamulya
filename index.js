const activeCaseCard = document.getElementById("cardActive");
const newCaseCard = document.getElementById("cardNew");
const recoveredCaseCard = document.getElementById("cardRecovered");
const totalCaseCard = document.getElementById("cardTotal");
const totalDeathCard = document.getElementById("cardDeath");
const totalTestCard = document.getElementById("cardTest");
const textInput = document.querySelector("#countryInput");
const button = document.querySelector("button");

let countries;

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0ddba9b71bmsh4985de8eba7fa5ap16d972jsn098e97beddec',
		'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
	}
};

const onType = (e) => {
    countries = textInput.value;
    console.log(countries);
    return countries;
}

async function getData () {
    try{
        const resp = await fetch(`https://covid-193.p.rapidapi.com/statistics?country=${countries}`, options)
        const data = await resp.json();
        console.log(data.response[0].cases);
        return displayStats(data);
    } catch(err) {
        console.log("Failed to fetch data", err);
    }
}

const displayStats = (data) =>  {
    let {active, new:newCase, recovered, total} = data.response[0].cases ;
    let {total:totalDeath} = data.response[0].deaths;
    let {total:totalTest} = data.response[0].tests;
    console.log(active);

    activeCaseCard.firstChild.nodeValue= active;
    newCaseCard.firstChild.nodeValue= newCase;
    recoveredCaseCard.firstChild.nodeValue= recovered;
    totalCaseCard.firstChild.nodeValue= total;
    totalDeathCard.firstChild.nodeValue= totalDeath;
    totalTestCard.firstChild.nodeValue= totalTest;

}

const onSubmit = () => {
    onType();
    getData();
}

//by Rikza Fatiyamulya