const mongoose = require ('mongoose');
const User = require('./User');
const { ARRAY } = require('sequelize');
const RequestsrsSchema = new mongoose.Schema ({
    userId : {
        type : Array,
        ref : "User",
    },
    date : {
        date: { type: Date, default: Date.now },
    },
    jobId: {
        type: String,
        ref: "jobs",
    },
});
const Requests = mongoose.model('Requests', RequestsrsSchema);

module.exports = Requests;