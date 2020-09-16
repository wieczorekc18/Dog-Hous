const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs")
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const validateRegisterInput = require('../../validations/register');
const validateLoginInput = require('../../validations/login');

router.get("/test", (req, res) => {
    res.json({ msg: "This is the user route"});
});

// router.get(
//     "/current",
//     passport.authenticate("jwt", {session: false}),
//     (req, res) => {
//         res.send(req.user)
//         res.json('It worked: Username is: ' + req.user.username);
//     }
// )

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username,
        number: req.user.number
    });
})

router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)

    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({ username: req.body.username })
    .then(user => {
        if(user){
            return res.status(400).json({ username: "username already exists"})
        }else{
            const newUser = new User({
                username: req.body.username,
                number: req.body.number,
                password: req.body.password
            })


            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then((user) => res.json(user))
                        .catch(err => console.log(err))
                })
            })
        }

    })
});

/*

.then(user => {
    const payload = { id: user.id, username: user.username, number: user.number };

    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        res.json({
            success: true,
            token: "Bearer " + token
        });
    });
})

*/


router.post('/login', (req, res) => {
    const {errors, isValid } = validateLoginInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const number = req.body.number;
    const password = req.body.password;

    User.findOne({ username })
        .then(user => {
            if(!user){
                return res
                    .status(404)
                    .json({ username: "This username does not exist"});
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        const payload = {
                            id: user.id,
                            username: user.username,
                            number: user.number,
                        }
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token
                                });
                            }
                        )
                    }else{
                        return res
                          .status(404)
                          .json({ password: "This password does not match the username given" });
                    }
                })
        })
})

module.exports = router;