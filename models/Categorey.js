const { uniqueId } = require('lodash');
const mongoose = require ('mongoose');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

const CategoreySchema = new mongoose.Schema ({
    _id: {
         type: String, default: uuidv4 
        },
    name : {
        type : String,
        enum: ['Program', 'Desgin', 'Medical' , 'Mangment']   
    },
    likes_count: {
         type: Number, default: 0 
    }
});




const Categorey = mongoose.model('Categorey', CategoreySchema);

module.exports = Categorey;