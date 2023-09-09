
const mongoose = require('mongoose');
const EWPlant = require('../models/garbageplants');

mongoose.connect('mongodb://localhost:27017/E-Waste-Dump' , {
    useNewUrlParser : true ,
    useUnifiedTopology : true
});

const db = mongoose.connection;
db.on("error" , console.error.bind(console , "connection error"));
db.once("open" , () => {
    console.log("database connected");
})

const ewasteloc = 
[
  {
    Name: "E-Waste Recyclers India",
    Address: "A-46, near Crowne Plaza, Pocket C, Okhla Phase I, Okhla, New Delhi, Delhi 110020",
    Street: "A-46",
    Municipality: "near Crowne Plaza",
    Categories: "Recycling center, Corporate office",
    Phone: "1800 102 5679",
    Location : {
    type: "Point",
    coordinates : [77.2793059 , 28.5245577]
    }
  },

  {
    Name: "Namo eWaste Management Ltd.",
    Address: "Mile Stone, Faridabad, 14 1, NH-19, Faridabad, Haryana 121003",
    Street: "Mile Stone, Faridabad",
    Municipality: "14 1, NH-19",
    Categories: "Recycling center",
    Phone: "081303 93629",
    Location : {
    type: "Point",
    coordinates : [77.30769 , 28.455841]
    }
  },

  {
    Name: "Greenzon E-waste Recycler Delhi",
    Address: "F 509 Deepali Building Nehru Place New Delhi, New Delhi, Delhi 110019",
    Street: "F 509 Deepali Building Nehru Place New Delhi",
    Municipality: "New Delhi, Delhi 110019",
    Categories: "Waste management service",
    Phone: "098112 06076",
    Location : {
    type: "Point",
    coordinates : [77.2527734  , 28.548356599999998]
    }
  },

  {
    Name: "Techchef Ewaste Solutions Pvt Ltd",
    Address: "Top Floor, C-61, DDA Sheds, Pocket A, Okhla Phase I, Okhla Industrial Estate, New Delhi, Delhi 110020",
    Street: "Top Floor",
    Municipality: "C-61",
    Categories: "Waste management service",
    Phone: "081780 22401",
    Location : {
    type: "Point",
    coordinates : [77.2748015  , 28.5275635]
    }
  },

  {
    Name: "Rocket Sales",
    Address: "Manjusha Building, 604-A, 6th Floor, 57, Nehru Place, New Delhi, Delhi 110019",
    Street: "Manjusha Building",
    Municipality: "604-A, 6th Floor, 57",
    Categories: "Waste management service, Computer Rental Agency, Computer repair service, Computer service, Computer Wholesaler, Electronic parts supplier, Electronics repair shop, Garbage collection service, Garbage dump, Recycling center",
    Phone: "088005 75430",
    Location : {
    type: "Point",
    coordinates : [77.2522347 , 28.548843299999998]
    }
  },
  {
    Name: "Hindustan E-waste Management Pvt. Ltd.",
    Address: "8, Central Rd, Jangpura, Bhogal, New Delhi, Delhi 110014",
    Street: "8, Central Rd",
    Municipality: "Jangpura, Bhogal",
    Categories: "Waste management service",
    Phone: "011 4155 3113",
    Location : {
    type: "Point",
    coordinates : [77.24938499999999 , 28.583346]
    }
  },
  {
    Name: "PRO E Waste Recycling",
    Address: "Plot no 32, Gharwali Colony, Sector 4, Ballabhgarh, Faridabad, Haryana 121004",
    Street: "Plot no 32",
    Municipality: "Gharwali Colony, Sector 4, Ballabhgarh",
    Categories: "Recycling center, Consultant, Waste management service",
    Phone: "093112 08103",
    Location : {
    type: "Point",
    coordinates : [77.3266007 , 28.3427097]
    }
  },
  {
    Name: "Auctus E-Recycling Solutions Pvt. Ltd.",
    Address: "A-58 Udyog Kendra 1st, Main Surajpur Road, Habibpur, Noida-Greater Noida Expy, Noida, Uttar Pradesh 201301",
    Street: "A-58 Udyog Kendra 1st, Main Surajpur Road, Habibpur",
    Municipality: "Noida-Greater Noida Expy",
    Categories: "Recycling center",
    Phone: "1800 270 1719",
    Location : {
    type: "Point",
    coordinates : [77.34056609999999 , 28.585401599999997]
    } 
  },
  {
    Name: "AVV E Waste Reprocess Pvt Ltd - e waste recycling in pan india (deals in all types of electrical waste)",
    Address: "11, Nehru Ground, New Industrial Twp 1, New Industrial Township, Faridabad, Haryana 121002",
    Street: 11,
    Municipality: "Nehru Ground, New Industrial Twp 1, New Industrial Township",
    Categories: "Recycling center, Recycling drop-off Location",
    Phone: "081781 64186",
    Location : {
        type: "Point",
        coordinates : [77.3024645 , 28.3905916]
    }
  },
  {
    Name: "Resource E Waste Solution Pvt Ltd",
    Address: "Plot No:- 147, 3rd Floor, Patparganj Industrial Area, Delhi, 110092",
    Street: "Plot No:- 147, 3rd Floor",
    Municipality: "Patparganj Industrial Area",
    Categories: "Waste management service, Used computer store",
    Phone: 402735,
    Location : {
    type: "Point",
    coordinates:  [77.312752 , 28.6402528]
    }
  }
]

const seeddb = async () => {
  await EWPlant.deleteMany({});
  for(i = 0 ; i < ewasteloc.length ; i++){
      const temp = new EWPlant(ewasteloc[i]);
      console.log(temp);
      await temp.save();
  }
}

seeddb();