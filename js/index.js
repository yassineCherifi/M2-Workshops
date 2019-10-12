
const express = require('express')
const app = express()
const InMemoryWorkshop = require("./inMemoryWorkshop")
const path = require("path")
const ejs = require('ejs')
var bodyParser = require('body-parser')

function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).json({ nope: true });
    } else {
        next();
    }
}
app.use(ignoreFavicon);

app.use(bodyParser.urlencoded({ extended: false }))

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', '/ejs'));
app.use(express.static(path.join(__dirname, '..', 'css')));


app.get('/', function (req, res) {
    InMemoryWorkshop.getWorkshopList()
        .then(workshops => {
            res.render("index", {
                workshops: workshops
            })
        })
})



app.get('/workshop', function (req, res) {
    console.log("get")
    res.render('workshop')
})

// on suppose que le nom du workshop est unique

app.get('/updateworkshop/:name', function (req, res) {
    const workshopName = req.params.name
    InMemoryWorkshop.getWorkshopByName(workshopName)
        .then(workshop => {
            res.render('updateWorkshop', { workshop: workshop })
        })
        .catch(e => ejs.send(e.message))
})

app.post('/workshop', function (req, res) {
    const name = req.body.name
    const description = req.body.description
    InMemoryWorkshop.addWorkshop(name, description).then(() => {
        InMemoryWorkshop.getWorkshopList()
            .then(workshops => {
                res.render("index", {
                    workshops: workshops
                })
            })
    })
        .catch(e => res.send(e.message))
})

app.get('/workshop/:name', function (req, res) {
    const workshopName = req.params.name
    InMemoryWorkshop.getWorkshopByName(workshopName)
        .then(workshop => {
            res.render('ejs/workshop', workshop)
        })
        .catch(e => ejs.send(e.message))
})

app.get('/remove-workshop/:name', function (req, res) {
    const name = req.params.name
    InMemoryWorkshop.removeWorkshopByName(name).then(() => {
        InMemoryWorkshop.getWorkshopList()
            .then(workshops => {
                res.render("index", {
                    workshops: workshops
                })
            })
    })
        .catch(e => res.send(e.message))

})

// on suppose que le nom du workshop est unique

app.post('/update-workshop/:name', function (req, res) {
    const name = req.params.name
    const newName = req.body.name
    const newDesc = req.body.description
    InMemoryWorkshop.updateWorkshop(name, { name: newName, description: newDesc }).then(() => {
        InMemoryWorkshop.getWorkshopList()
            .then(workshops => {
                res.render("index", {
                    workshops: workshops
                })
            })
    })
        .catch(e => res.send(e.message))
})
app.get('*', function (req, res) {
    res.redirect('/');
});
app.listen(3000, function () {
    console.log('Workshop app listening on port 3000!')
})
