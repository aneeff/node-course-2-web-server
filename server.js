const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');    
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} - ${req.method} ${req.url}`;
    fs.appendFileSync('server.log',log + '\n');
    console.log(log);
    next();
});



// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle:'Codezync Home',
        currentYear: new Date().getFullYear(),
        welcomeMessage:'Welcome to codezync'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'Codezync About'
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'An Error Occurred'
    });
});

app.listen(port,()=>{
    console.log(`Server started ${port}`);
});