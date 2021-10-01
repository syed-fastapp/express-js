const express = require('express')
var exphbs  = require('express-handlebars');
 
const cors = require('cors')
const path = require('path')
const app = express()
const port = 3000

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, "static")))
app.use('/', require(path.join(__dirname, 'routes/blog.js')))
 

app.listen(port, () => {
  console.log(`Blog app listening at http://localhost:${port}`)
})