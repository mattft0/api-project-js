const express =  require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(morgan('tiny'));

require('dotenv/config');

const api = process.env.API_URL;

// http://localhost:3000/api/v1/cars
app.get(`${api}/cars`, (req, res)=>{
    const car = {
        id: 1,
        brand: 'Porsghe',
        model: '993 Turbo S',
        image: 'http://res.cloudinary.com/dsxfn6o4q/image/upload/v1668816956/du8kevbbhfafrwwaqfgp.jpg'  
    }
    res.send(car);
});

app.post(`${api}/cars`, (req, res)=>{
    const newCar = req.body;
    console.log(newCar)
    res.send(newCar);
});


app.listen(3000, ()=>{
    console.log('Server is running http://localhost:3000');
});

