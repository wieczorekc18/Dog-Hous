const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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