const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const masterSchema = new Schema({
    // A JSON fájlban számot használtál az _id-hez.
    // Alapértelmezetten a Mongoose ObjectId-t generál, de felülbírálhatjuk.
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true // Eltávolítja a felesleges szóközöket
    },
    rank: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    wealth: {
        type: Number
    }
}, {
    // A 'collection' opcioval megadhatod a kollekció nevét az adatbázisban
    collection: 'masters' 
});

// A modellt 'Enslaver' néven exportáljuk
module.exports = mongoose.model('master', masterSchema);