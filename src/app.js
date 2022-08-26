const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const port = process.env.PORT || 8000;

// Public Path Define 
const staticPath = (path.join(__dirname, '../public'))
app.use(express.static(staticPath));
const templatePath = (path.join(__dirname, '../templates/views'))
const partialsPath = (path.join(__dirname, '../templates/partials'))

console.log(partialsPath);
app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partialsPath);

//  Routing website
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/weather', (req, res) => {
    res.render('weather');
})

app.get('*', (req, res) => {
    res.render('weberror');
})

// Hosting website from computer
app.listen(port, () => {
    console.log(`Listining at http://localhost:${port}/`)
})