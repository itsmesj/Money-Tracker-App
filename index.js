var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect(`mongodb+srv://admin:admin@cluster0.hf4mnzl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
var db = mongoose.connection
db.on('error', ()=>console.log('Error in connecting to the database'));
db.once('open', ()=>console.log('connected to Database'));
app.post('/add', (req, res)=>{
    var category_select = req.body.category_select;
    var amount = req.body.amount;
    var info = req.body.info;
    var date_input = req.body.date_input;

    var data = {
        "Category": category_select,
        "Amount": amount,
        "Info": info,
        "Date": date_input
    }

    db.collection('users').insertOne(data, (err, collection)=>{
        if(err){
            throw error;
        }
        console.log("Record inserted successfully");
    })
})

app.get("/", (req, res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html');
}).listen(5000);

console.log('Listening on port 5000');