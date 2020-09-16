const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Multiple reminders are made for each person 

const ReminderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Reminder = mongoose.model('reminder', ReminderSchema)

module.exports = Reminder;