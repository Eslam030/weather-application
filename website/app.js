// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=a462855bf5f7312086e2a0f30d86c50a&units=imperial';
// update info function that updates the info in the app
const updateInfo = function () {
    // the url formation
    let baseUrl = 'https://api.openweathermap.org/geo/1.0/zip?zip=';
    // get the zip from the input
    const zip = document.getElementById('zip').value;
    // get the feelings from the text area
    let feelling = document.getElementById('feelings').value;
    // do a get request from weather map api
    getData(baseUrl, zip, apiKey).then((data) => {
        // update the baseurl to fetch by the lon and lat
        baseUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + data['lat'] + '&lon=' + data['lon'];
        // do another get request to get the tempreture
        getData(baseUrl, '', apiKey).then((data) => {
            // the tempreture
            let temp = data['main']['temp'];
            console.log(data['main']['temp']);
            let d = new Date();
            // the date
            let newDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
            console.log(newDate);
            console.log(feelling);
            // the post request to the route '/all'
            postData('/all', { date: newDate, tempreture: temp, feellings: feelling });
            updataUI();
        });
    });
}
const updataUI = async () => {
    // get the data from '/all' route
    const req = await fetch('/all');
    try {
        const data = await req.json();
        // update the data on the webapp
        document.getElementById('date').textContent = "Date : " + data.date;
        document.getElementById('temp').innerHTML = "Tempreture : " + Math.round(data.tempreture);
        document.getElementById('content').innerHTML = data.feellings;
    } catch (error) {
        console.log(`error : ${error}`);
    }
}
// the post function
const postData = async (url = '', data = {}) => {
    console.log(data);
    const res = await fetch(url, {
        method: 'POST', credentials: 'same-origin', headers: { 'content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    try {
        const newData = await res.json();
        return newData;
    } catch (error) {
        console.log(`error : ${error}`)
    }
}
// get the data 
const getData = async (baseUrl, zip, apiKey) => {
    const req = await fetch(baseUrl + zip + apiKey);
    try {
        const data = await req.json();
        return data;
    } catch (error) {
        console.log(`error : ${error}`);
    }
}
// add an event listener to the button which id is generate
const generate = document.getElementById('generate').addEventListener('click', updateInfo);
