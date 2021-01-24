const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require("moment");
const keys = require("../config/keys");
const Twilio = require("twilio");
const User = require("./User");

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
    hoursAdjustment: {
        type: Number,
        default: 12
    },
    dateReminder:{
        type: Date,
        required: true
    },
    dateOccasion: {
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

// ReminderSchema.methods.requiresNotification = function(date) {
//   return Math.round(moment.duration(moment(this.time).tz(this.timeZone).utc()
//                           .diff(moment(date).utc())
//                         ).asMinutes()) === this.notification;
// };

ReminderSchema.methods.requiresNotification = function(date) {
    console.log("----------")
    console.log(this.dateReminder)
    console.log("----------");
    let currentDate = date.toUTCString().slice(0,22)
    let reminderDate;
    if(this.dateReminder && this.dateReminder>=date){
        reminderDate = this.dateReminder.toUTCString().slice(0, 22);
    }else{
        this.remove()
    }
    console.log(currentDate)
    console.log(reminderDate);
    return currentDate === reminderDate
};

ReminderSchema.statics.sendNotifications = function(callback) {
  // now
  const searchDate = new Date();
  Reminder
    .find()
    .then(function(reminders) {
      reminders = reminders.filter(function(reminder) {
              return reminder.requiresNotification(searchDate);
      });
      if (reminders.length > 0) {
        sendNotifications(reminders);
      }
    });
       
    function sendNotifications(reminders) {
        const client = new Twilio(keys.accountSid, keys.authToken);
        reminders.forEach(function(reminder) {
            // Create options to send the message
            User.findById(reminder.user).then(user => {
                const options = {
                    to: `+${user.number}`,
                    from: keys.twilioPhoneNumber,
                    /* eslint-disable max-len */
    
                    // add text for reminder
                    body: `Hey toots lemme know if you get this ${user.name}. Here's a reminder .`,
                    /* eslint-enable max-len */
                };
    
                // Send the message!
                client.messages.create(options, function(err, response) {
                    if (err) {
                        // Just log it for now
                        console.error(err);
                    } else {
                        // Log the last few digits of a phone number
                        let masked = user.number.substr(0,
                            user.number.length - 5);
                        masked += '*****';
                        console.log(`Message sent to ${masked}`);
                    }
                });
            })
        });

        // Don't wait on success/failure, just indicate all messages have been
        // queued for delivery
        if (callback) {
          callback.call();
        }
    }
};

const Reminder = mongoose.model('reminder', ReminderSchema)

module.exports = Reminder;