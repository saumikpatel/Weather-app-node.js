const path = require('path')
const express =require('express');
const hbs =require('hbs');
const geocode=require('./utils/geocode')
const forcast=require('./utils/forcast')


const app = express()

//define path for express config
const viewPath = path.join(__dirname,'../templates/views')

const partialPath =path.join(__dirname,'../templates/partials')

//setup handler engine and views location
app.set('view engine','hbs')
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//setup static directory to server
app.use(express.static(path.join(__dirname,'../public')))


//



app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Saumik Patel'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Saumik Patel'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Section',
        name:'Saumik Patel'
    })
})

app.get('/weather',(req, res)=>{

    if(!req.query.address){
        return res.send({
            error:'You must provide the city name.'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error
            })
        }

        forcast(latitude, longitude,(error, forecastdata)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forcast:forecastdata,
                location,
                address:req.query.address
            })

        })


    })
 

})



app.get('/help/*', (req,res) => {
    res.render('404',{
        error: 'Help article not found',
        name:'Saumik Patel'

    })

})

app.get('*',(req, res)=>{
    res.render('404',{
        error: 'page not found',
        name:'Saumik Patel'

    })


})

app.listen(3000, ()=>{
    console.log('server is up on port 3000.')
})
