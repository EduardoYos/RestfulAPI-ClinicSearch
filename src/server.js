const fetch = require('node-fetch');

const express=require('express');
const app=express();
const bodyParser=require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// URLs
const dentalURL = "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json";
const vetURL = "https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json";
let dentalData = {};
let vetData = {};
const statesDict = {
    "Alabama": "AL",
    "Alaska": "AK",
    "American Samoa": "AS",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "Armed Forces Americas": "AA",
    "Armed Forces Europe": "AE",
    "Armed Forces Pacific": "AP",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "District Of Columbia": "DC",
    "Florida": "FL",
    "Georgia": "GA",
    "Guam": "GU",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Marshall Islands": "MH",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Northern Mariana Islands": "NP",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Puerto Rico": "PR",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "US Virgin Islands": "VI",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY"
}

async function getDentalData(){
    const response = await fetch(dentalURL);
    const dData = await response.json();
    dentalData = dData;
}

async function getVetData(){
    const response = await fetch(vetURL);
    const vData = await response.json();
    vetData = vData;
}

function searchClinics(name, state, from, to){
    let clinicsData = dentalData.concat(vetData);
    var filteredClinics = clinicsData;

    if (name){
        name = name.replace(/\+/g, " ");
        filteredClinics = filteredClinics.filter(c => c.name == name || c.clinicName === name);
    }
    if (state){
        state = state.replace(/\+/g, " ");
        var stateName = state;
        var stateAbbr = statesDict[state];
        if(!stateAbbr){
            // state information is abbreviated. Getting full name
            stateName = Object.keys(statesDict).find(key => statesDict[key] === state);
            stateAbbr = state;
        }
        filteredClinics = filteredClinics.filter(c => (c.stateName != undefined && c.stateName == stateName)
         || (c.stateCode != undefined && c.stateCode === stateAbbr));
    }
    if (from && to){
        filteredClinics = filteredClinics.filter(c => (c.availability != undefined && c.availability.from === from)
         || (c.opening != undefined && c.opening.from === from));

        filteredClinics = filteredClinics.filter(c => (c.availability != undefined && c.availability.to === to)
        || (c.opening != undefined && c.opening.to === to));
    }
    return filteredClinics;
}

var baseUrl = "/api";

//#region GET routes

//start
app.get(baseUrl, (req,res) => {
    res.send("Application start");
});

app.get(baseUrl + "/clinic", (req, res) => {
    queryData = req.query;
    var clinics = searchClinics(queryData.name, queryData.state, queryData.from, queryData.to);
    res.status(200).send(clinics);
});

//#endregion

//#region Initialization

// GET clinics Data
getDentalData(); //stored in dentalData
getVetData(); //stored in vetData

 //#endregion
 module.exports = app;
