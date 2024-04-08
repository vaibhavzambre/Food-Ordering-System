const express =require('express')
const hbs=require('hbs')
const route=require('./routers/main')
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const session=require('express-session');
const { handlebars } = require('hbs');
require("./handlebar")//this hbs user made handlebars
const app=express();
app.use(session({
    secret:"restorent_datails"
}))
app.use(bodyParser.urlencoded({extended:true}))

app.use('',route)
app.use("/static",express.static("public"));
app.set("view engine",'hbs')
app.set("views",'views')
hbs.registerPartials('views/partials')

mongoose.connect("mongodb://localhost/restorent",()=>{
    console.log("MONGO SERVER IS CONNECTED............");
})
app.listen(7000,()=>{
    console.log('server CONNECTED')
})