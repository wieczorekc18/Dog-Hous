const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateReminder(data){
    let errors = {};

    data.description = validText(data.description) ? data.description : '';
    
    if(!Validator.isLength(data.description, {min: 5, max: 80})){
        errors.description = 'Reminder description must be between 5 and 80 characters in length'
    }

    if(Validator.isEmpty(data.description)) {
        errors.description = 'Reminder must have a description'
    }

    if (Validator.isEmpty(data.date)) {
        errors.date = 'Reminder must have a date'
    }

    return{
        errors,
        isValid: Object.keys(errors).length === 0
    }
}