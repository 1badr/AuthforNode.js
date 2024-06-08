// const { uniqueId } = require('lodash');
const mongoose = require ('mongoose');

const CategoreySchema = new mongoose.Schema ({
    
    name : {
        type : String,
        // enum: ['برمجة', 'تصميم', 'طب' , 'ادارة']   
    },
    
});




const Categorey = mongoose.model('Categorey', CategoreySchema);

module.exports = Categorey;