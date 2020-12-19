const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateReminder(data){
    let errors = {};

    data.recipient = validText(data.recipient) ? data.recipient : '';
    data.occaion = validText(data.occasion) ? data.occaion : '';

    
    if(!Validator.isLength(data.occasion, {min: 5, max: 30})){
        errors.occasion = 'The Occasion must be between 5 and 30 characters in length'
    }

    if (Validator.isEmpty(data.recipientName)) {
        errors.recipientName = 'Reminder must be for a named recipient'
    }

    if (Validator.isEmpty(data.relationship)) {
        errors.relationship = 'Reminder must list recipients relationship to the user'
    }

    // if (Validator.isEmpty(data.hoursBefore)) {
    //     errors.hoursBefore = 'Reminder must identify how many hours before the occasion you would like to recieve a text'
    // }

    if(Validator.isEmpty(data.occasion)) {
        errors.occasion = 'Reminder must have an occasion associated with it'
    }

    if (Validator.isEmpty(data.date)) {
        errors.date = 'Reminder must have a date'
    }

    return{
        errors,
        isValid: Object.keys(errors).length === 0
    }
}