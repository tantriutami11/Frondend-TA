const express = require('express');
const cors = require('cors');
const sensorRoute = require('./app/routes');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Rute utama
app.get('/', (req, res) => {
    res.send('Selamat datang di server API');
});

app.use('/api/v1/', sensorRoute);

app.use((req, res) => {
    res.status(404);
    console.log( req.originalUrl);
    res.send({
        status: 'Failed',
        message: 'Resource ' + req.originalUrl + ' Not Found'
    });
});

app.listen(port, () => {
    console.log(`server: http://localhost:5000`);
});
