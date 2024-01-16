const mongoose = require ('mongoose');

const MessagesSchema = new mongoose.Schema ({
    sender : [{type: String, ref: "User", required: true}],
    reciver : [{type: String, ref: ["User"],ref: ["Company"], required: true}],
    date : {
        date: { type: Date, default: Date.now },
    },
    body : {
        type : String,
    },
    read_it : {
        type : Boolean,
        require : true,
    },

});
const Messages = mongoose.model('Messages', MessagesSchema);

module.exports = Messages;