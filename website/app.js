/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/3.0/weather?zip=';
const apiKey = 'a862a266d3086cc10b0d71711c0f52ae'; // generated from openweathermap.com

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
const generateBtn = document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e) {
  e.preventDefault();

  //get user input
  const zipCode = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  getWeatherData(baseUrl, zipCode, apiKey)
    .then(function (data) {
      // add data to POST request
      postData('/add', { temp: data.main.temp, date: newDate, content: content });
    }).then(function () {
      // call updateUI to update browser content
      updateUI()
    });
  userInfo.reset();
};
/* Function to GET Web API Data*/
const getWeatherData = async (baseUrl, zipCode, apiKey) => {
  // res equals to the result of fetch function
  const res = await fetch(baseURL + newZip + apiKey);
  try {
    // data equals to the result of fetch function
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

const postData = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    // Body data type must match "Content-Type" header        
    body: JSON.stringify({
      date: data.date,
      temp: data.temp,
      content: data.content,
    }),
  });

  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};
const updateUI = async () => {
  const req = await fetch('/all');
  try {
    const allData = await req.json();
    console.log(allData);
    // update new entry values
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp + ' degree C';
    document.getElementById('content').innerHTML = allData.content;
  }
  catch (error) {
    console.log('error', error);
  }
};