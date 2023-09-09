const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EwastePlantSchema = new Schema({
    Name : String,
    Address : String,
    Street : String,
    Municipality : String,
    Categories : String,
    Phone : String,
    Location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    }

})

EwastePlantSchema.index({Location: "2dsphere"});

module.exports = mongoose.model('EwastePlant' , EwastePlantSchema);