const express = require("express");
const router = express.Router();
const passport = require('passport');
const validateReminderInput = require("../../validations/reminders");
const Reminder = require("../../models/Reminder");


router.get("/test", (req, res) => {
  res.json({ msg: "This is the reminder route" });
});

router.post("/", 
  passport.authenticate("jwt", {session: false}), 
  (req, res) => {
  const { isValid, errors } = validateReminderInput(req.body);
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
