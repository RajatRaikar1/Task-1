const express = require('express')
const path = require('path')
const hbs = require('hbs')

const port = process.env.PORT || 3000



const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')
const viewsPath = path.join(__dirname, '../public')
app.set('views', viewsPath)

app.get('', (req, res) => {
    res.render('index')
})


app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/register', (req, res) => {
    const name = req.body.uname
    res.send('okay:'+name)
})


app.listen(port, () => {
    console.log('server starting...' + port) 
})