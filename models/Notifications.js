const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationsSchema = new Schema({
	user: {
		type: String,
		ref: 'User' 
	},
	company: {
		type: String,
		ref: 'Company'
	},
	desc:{ String},
	read: {Boolean},
	createdTimestamp: {
		type: Date,
		default: Date.now
	},
	accepted: {
		type: Boolean,
		default: null
	}
});

const Notifications = mongoose.model('Noti', NotificationsSchema);
module.exports = Notifications;