const mongoose = require ('mongoose');

const TestSchema = new mongoose.Schema ({
    name : {
        type : String,
    },
    date : {
        date: { type: Date, default: Date.now },
    },
    IDFollower: [{type: mongoose.Types.ObjectId, ref: "User", ref: "Company", required: true}],
    quastions:[{type: Array}],
    answer : {
        type: String,
    }
});
const Test = mongoose.model('Test', TestSchema);

module.exports = Test;