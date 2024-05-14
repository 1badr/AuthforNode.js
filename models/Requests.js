const mongoose = require ('mongoose');
const User = require('./User');
const { ARRAY } = require('sequelize');
const { boolean } = require('mathjs');
const RequestsrsSchema = new mongoose.Schema ({
    userId : {
        type : String,
        ref : "User",
    },
    date : {
         type: Date, default: Date.now ,
    },
    sentIt : {
        type: Boolean,

    },
    jobId: {
        type: String,
        ref: "Jobs",
    },
    companyId: {
        type: String,
        ref: "User",
    },
});
const Requests = mongoose.model('Requests', RequestsrsSchema);

module.exports = Requests;