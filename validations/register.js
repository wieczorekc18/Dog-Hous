const Validator = require("validator");
const validText = require("./valid-text");


module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.username = validText(data.username) ? data.username : "";
    data.name = validText(data.name) ? data.name : "";
    data.number = validText(data.number) ? data.number : '';
    data.password = validText(data.password) ? data.password : '';
    data.password2 = validText(data.password2) ? data.password2 : "";

    if(!Validator.isLength(data.username, { min: 4, max: 20})){
        errors.username = "Username must be between 4 and 20 characters";
    }

    if (!Validator.isLength(data.name, { min: 4, max: 20 })) {
      errors.name = "Name must be between 3 and 15 characters";
    }

    if(Validator.isEmpty(data.username)){
        errors.username = "Username field is required";
    }

    if (Validator.isEmpty(data.name)) {
      errors.name = "Name field is required";
    }

    if(Validator.isEmpty(data.number)){
        errors.number = "Phone Number field is required";
    }

    if (!Validator.isMobilePhone(data.number) || !Validator.isLength(data.number, { min: 10, max: 11 })){
        errors.number = "Must enter a valid phone number with no extra symbols ()- or spaces"
    }


    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = "Password must be between 6 and 30 characters";
    }
    


    if(Validator.isEmpty(data.password2)){
        errors.password2 = "Password confirmation field is required";
    }

    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = "Passwords must match"
    }

    return{
        errors,
        isValid: Object.keys(errors).length === 0
    }
}