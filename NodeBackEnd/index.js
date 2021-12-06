const express = require('express');

const app = express();
const bodyParser = require('body-parser');

const normalizePort = require('./normalizeport');

const PORT = normalizePort(process.env.PORT || 5000);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const router = require('./router'); 
app.use("/forecasts/", router);

app.use(express.static('public'));

app.get('/', (req, res) => {
    const d = new Date();
    res.json({ currenttime: d.toTimeString() });
    console.log('Received GET request...');
});

app.listen(PORT, '0.0.0.0', () => {

  console.log(`Server is listening on port ${PORT}...`);

});
