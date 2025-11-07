const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slaveSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number
    },
    height: {
        type: Number // Érdemes lehet megjegyezni, hogy ez pl. cm-ben értendő
    },
    // Ez a mező dokumentálja az embertelen árusítás tényét
    price: { 
        type: Number
    },
    // Hivatkozás a rabszolgatartóra.
    // 'enslaverId'-nek nevezzük a 'masterId' helyett.
    masterId: {
        type: Number,
        required: true,
        // A 'ref' kulcs mondja meg a Mongoose-nak,
        // hogy ez a mező az 'Enslaver' modell _id mezőjére hivatkozik.
        ref: 'master' 
    }
}, {
    collection: 'slaves'
});

// A modellt 'EnslavedPerson' néven exportáljuk
module.exports = mongoose.model('slave', slaveSchema);