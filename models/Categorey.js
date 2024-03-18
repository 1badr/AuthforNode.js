const { uniqueId } = require('lodash');
const mongoose = require ('mongoose');

const CategoreySchema = new mongoose.Schema ({
    
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