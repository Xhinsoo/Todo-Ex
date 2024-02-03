const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/home', (req,res)=>{
    res.render('home')
})

app.get('/new', (req,res)=>{
    res.render('new')
})
app.listen(3000, (req,res)=>{
    console.log("listening to port 3000")
})