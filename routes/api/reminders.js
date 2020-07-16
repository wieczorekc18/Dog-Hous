const express = require("express");
const router = express.Router();
const passport = require('passport');
const validateReminder = require("../../validations/reminders");
const Reminder = require("../../models/Reminder");


router.get("/test", (req, res) => {
  res.json({ msg: "This is the reminder route" });
});

// router.get("/", (req, res) => {
//   Reminder.find().sort({ timestamp: -1 })
//     .then(reminders => res.json(reminders))
//     .catch(err => res.status(400).json(err))
// })

router.get("/user/:user_id", (req, res) => {
  Reminder.find({ user: req.params.user_id }).sort({ timestamp: -1 })
    .then(reminders => res.json(reminders))
    .catch(err => res.status(400).json(err))
})

router.get("/:id", (req, res) => {
  Reminder.findById(req.params.id)
    .then(reminder => res.json(reminder))
    .catch(err => res.status(400).json(err))
})

router.post("/", 
  passport.authenticate("jwt", {session: false}), 
  (req, res) => {
    const { isValid, errors } = validateReminder(req.body);
    if(!isValid){
      return res.status(400).json(errors);
    }

    const newReminder = new Reminder({
      user: req.user.id,
      description: req.body.description,
      date: req.body.date
    })

  newReminder.save().then(reminder => res.json(reminder));
})

module.exports = router;
