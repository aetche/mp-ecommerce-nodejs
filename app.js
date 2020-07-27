require('dotenv').config();
const express = require('express');
const exphbs  = require('express-handlebars');
const detail = require('./detail');
const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.json());

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', detail);

app.get('/success', function (req, res) {
    res.render('message', {...req.query, message: 'Pago exitoso'});
});
app.get('/pending', function (req, res) {
    res.render('message', {...req.query, message: 'Pago en estado pendiente'});
});
app.get('/failure', function (req, res) {
    res.render('message', {...req.query, message: 'Pago rechazado'});
});

app.post('/notifications', function (req, res) {
    console.log('Instant Payment Notification');
    console.log('QUERY: ', req.query);
    console.log('BODY: ', req.body);
    res.status(200).end();
});

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));
 
const port = process.env.PORT || 3000;
app.listen(port);