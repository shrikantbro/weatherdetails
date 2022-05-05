let express = require('express')
const app = express()
let request = require('request')
let dotenv = require('dotenv')
dotenv.config()
let port = process.env.PORT || 8901

app.use(express.static(__dirname + '/public'))

app.set('views', './src/views')

app.set('view engine', 'ejs')

app.get('/weather/:city', (req, res) => {
    let city = req.params.city
    let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`
    //Calling Api
    request(url, (err, responseApi) => {
        if(err) throw err
        let responseData = JSON.parse(responseApi.body)
        res.render('index', {title:'Weather App', result: responseData})
    })    
})

app.listen(port,(err) => {
    if(err) throw err
    console.log(`Server is connected at port ${port}`)
})