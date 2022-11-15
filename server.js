// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
const app = express();
/* Middleware*/
const cors = require('cors');
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
port = 8000;
const server = app.listen(port, () => { console.log(`Server started\nport : ${port}`) })

// get request to the route all
app.get('/all', (req, res) => {
    res.send(projectData);
    console.log(projectData);
})
// post request for the route all
app.post('/all', (req, res) => {
    projectData = req.body;
    console.log(projectData)
});





