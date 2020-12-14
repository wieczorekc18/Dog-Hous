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

    const newReminder = new Reminder({
      user: req.user.id,
      recipientName: req.body.recipientName,
      relationship: req.body.relationship,
      occasion: req.body.occasion,
      date: req.body.date,
      //req.body.date comes in year-month-day eg. 2021-04-20
    });

    newReminder.save().then((reminder) => {
      //this reminder.date comes in as 2021-04-20T00:00:00.000Z
      // here is where we set the messagebird message
      //set up 3 reminders
      // let message = formatReminder(reminder);
      let reminder1DT = new Date(reminder.date);
      let reminder2DT = new Date(reminder.date);
      let reminder3DT = new Date(reminder.date);
      reminder1DT.setHours(reminder1DT.getHours() - 84);
      reminder2DT.setHours(reminder2DT.getHours() - 12);
      reminder3DT.setHours(reminder3DT.getHours() + 10);
      //reminder.user really gives user.id might want to change this
      User.findById(reminder.user)
        .then((user) => {
          // messagebird.message.create({
          //   originator: "DOG-HOUS",
          //   recipients: user.number,
          //   scheduleDatetime: reminder1DT,
          //   body: message
          // })
          // messagebird.message.create({
          //   originator: "DOG-HOUS",
          //   recipients: user.number,
          //   scheduleDatetime: reminder2DT,
          //   body: message,
          // });
          // messagebird time is in utc
          // messagebird.messages.create({
          //   originator: "DOG-HOUS",
          //   recipients: [ "12037317177" ],
          //   scheduledDatetime: "2020-11-18T21:56:23.000Z",
          //   body:
          //     "hey toots one more time lmk if you get this: SENT BY " + user.username,
          // }, function(err, response){
          //   if(err){
          //     console.log(err)
          //   } else{
          //     console.log(response);
          //   }
          // });
        })
        .catch((err) => console.log(err));
      res.json(reminder)
    });

  }
);

//patch method needed


// router.patch("/:id", (req, res) => {
//   Reminder.findById(req.params.id)
//     .then((reminder) => {
//       return 
//     })
//     .catch((err) => res.status(400).json(err));
// });



module.exports = router;
