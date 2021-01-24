const express = require("express");
const router = express.Router();
const passport = require('passport');
const validateReminder = require("../../validations/reminders");
const Reminder = require("../../models/Reminder");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// require('../../config/.env').config()

let messagebird = require("messagebird")(keys.MESSAGEBIRD_API_KEY);

const client = require('twilio')(keys.accountSid, keys.authToken)

router.get("/test", (req, res) => {
  res.json({ msg: "This is the reminder route" });
});

// router.get("/", (req, res) => {
//   Reminder.find().sort({ timestamp: -1 })
//     .then(reminders => res.json(reminders))
//     .catch(err => res.status(400).json(err))
// })

router.get("/user/:user_id", passport.authenticate('jwt', { session: false }), (req, res) => {
  Reminder.find({ user: req.params.user_id }).sort({ timestamp: -1 })
    .then(reminders => res.json(reminders))
    .catch(err => res.status(400).json(err))
})

router.get("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  Reminder.findById(req.params.id)
    .then(reminder => res.json(reminder))
    .catch(err => res.status(400).json(err))
})



//check for bugs
router.delete("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  Reminder.findById(req.params.id)
    .then((reminder) => {
      reminder.remove()
      return res.json(success)
    })
    .catch((err) => res.status(400).json(err));
});



// router.post("/", 
//   passport.authenticate("jwt", {session: false}), 
//   (req, res) => {
//     const { isValid, errors } = validateReminder(req.body);
//     if(!isValid){
//       return res.status(400).json(errors);
//     }

//     const newReminder = new Reminder({
//       user: req.user.id,
//       recipientName: req.body.recipientName,
//       relationship: req.body.relationship,
//       occasion: req.body.occasion,
//       date: req.body.date
//     })

//   newReminder.save().then(reminder => res.json(reminder));
// })

let formatReminder = (reminder => {
  //if reminder is mother's day, anniversary, ect 
  // construct unique message based on this

  // here is where we need to query for coupon codes and then attach them to end of each message


  // let message;
  // let code;
  // if(reminder.occasion == "Anniversary"){
    
  // }else if(reminder.occasion == "Birthday"){
    
  // }else if(reminder.occasion == "Mother's Day" || reminder.occasion == "Father's Day" || reminder.occasion == "Christmas" || reminder.occasion == "Valentine's Day"){
  //   message = reminder.occasion + " is coming up soon. Stay out of the dog hous by getting " + reminder.recipient + " something special.";
  // }else{
  //   message = "You set a reminder for " 
  // }
  // message += code;
  let message = "here's your reminder"
  return message;
})

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateReminder(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    console.log(req.body.dateReminder)
    let dateTime = new Date(req.body.dateReminder)
    dateTime.setHours(dateTime.getHours() + req.body.hourAdjustment + 5)
    dateTime.setMinutes(dateTime.getMinutes() + 44);
    console.log(req.body.hourAdjustment)
    console.log(dateTime)
    let current = new Date 
    console.log(current)
    const newReminder = new Reminder({
      user: req.user.id,
      recipientName: req.body.recipientName,
      relationship: req.body.relationship,
      hourAdjustment: req.body.hourAdjustment,
      occasion: req.body.occasion,
      dateOccasion: req.body.dateOccasion,
      dateReminder: dateTime,
      //req.body.date comes in year-month-day eg. 2021-04-20
    });

    newReminder.save().then((reminder) => {
      //this reminder.date comes in as 2021-04-20T00:00:00.000Z
      // here is where we set the messagebird message
      // set up 3 reminders
      // let message = formatReminder(reminder);
      // let r = new Date(reminder.date);
      // r.setHours(r.getHours() - req.body.hoursBefore);
      //reminder.user really gives user.id might want to change this
      // User.findById(reminder.user)
      //   .then((user) => {
      //     client.messages.create({
      //       to: "+12032491115",
      //       from: "",
      //       body: `Hey there ${user.name}`,
      //     })
      //     .then((message) => console.log(message.sid));

      //   })
      //   .catch((err) => console.log(err));
      res.json(reminder)
    });

  }
);

//patch method needed


router.put("/:id", (req, res) => {
  Reminder.findByIdAndUpdate(req.params.id, req.body, (err, result => {
    if(err){
      return res.json(err)
    }else{
      return res.json(result)
    }
  }))
})
//   Reminder.findById(req.params.id)
//     .then((reminder) => {
//       return 
//     })
//     .catch((err) => res.status(400).json(err));
// });



module.exports = router;
