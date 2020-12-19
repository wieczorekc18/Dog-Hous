const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Multiple reminders are made for each person 

const ReminderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    recipientName: {
        type: String,
        required: true
    },
    relationship: {
        type: String,
        required: true
    },
    // recipientLikes: {
    //     type: String,
    //     required: false
    // },
    occasion: {
        type: String,
        required: true
    },
    hoursBefore: {
        type: Number,
        default: 10
    },
    date: {
        type: Date,
        required: true
    },
    likes:{
        type: Array,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Reminder = mongoose.model('reminder', ReminderSchema)

module.exports = Reminder;