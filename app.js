const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const EWPlant = require('./models/garbageplants');

mongoose.connect('mongodb://localhost:27017/E-Waste-Dump' , {
    useNewUrlParser : true ,
    useUnifiedTopology : true
});

const db = mongoose.connection;
db.on("error" , console.error.bind(console , "connection error"));
db.once("open" , () => {
    console.log("database connected");
})

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended : true}));

app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));

app.get('/' , (req , res) => {
    res.render('home');
})

app.post('/getCurrLoc' , async(req, res) => {
    console.log(req.body);
    const latitude = parseFloat(req.body.latitude);
    const longitude = parseFloat(req.body.longitude);
    const distance = 15;
    const unitValue = 1000;
    const users = await EWPlant.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                },
                maxDistance: distance * unitValue,
                distanceField: 'distance',
                distanceMultiplier: 1 / unitValue,
                key: 'Location'
            }
        },
        {
            $project: {
                _id: 1, 
                distance: 1
            }
        },
        {
            $sort: {
                distance: 1
            }
        },
        { $limit: 5 }
    ]);
    const nearPlant = [];
    for(i = 0 ; i < users.length ; i++){
        const tempplant = await EWPlant.findById(users[i]._id);
        console.log(tempplant.Name);
        nearPlant.push(tempplant);
    }
    res.render('showNearBy' , {nearPlant});
})

app.get('/makeplant' , async(req , res) => {
    const p = new EWPlant({title : 'delhi disposal', location : "delhi" , phoneNumber: 9899989 , Categories : ["mobile phones" , "laptops"]});
    await p.save();
    res.send(p);
})

app.listen(3000 , () => {
    console.log('serving on port 3k');
})