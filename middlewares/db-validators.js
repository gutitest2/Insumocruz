
// ? Requires
const Insumocruz_User = require('../models/schema-users');
const bcrypt = require('bcryptjs');

// ? Verify email into DB
const emailExists = async(email) => {
    const verify = await Insumocruz_User.findOne( {email} );
    if( verify ) throw new Error(`The ${email} is already registered.`);
};

const emailNotExist = async(email) => {
    const verify = await Insumocruz_User.findOne( {email} );
    if( !verify ) throw new Error(`The ${email} not exist.`);
};

const userNameNotExist = async(user_name) => {
    const verify = await Insumocruz_User.findOne( {user_name} );
    if( !verify ) throw new Error(`The ${user_name} not exist.`);
};

// ? Verify type the data = String
const isTypeString = async(data) => {
    if( typeof data !== 'string' ) throw new Error(`The password ${data} should be string.`);
    
};

// ? Verify Password
const verifyPassword = async(password, {req}) => {
    console.log(req.body.email);
    const email = req.body.email;
    
    // Process
    const verify = await Insumocruz_User.findOne({email});
    const password_compare = await bcrypt.compare( password, verify.password );
    // Test message
    console.log(password_compare);
    console.log('We are in the message error of the password');
    if( !password_compare ) throw new Error(`The password ${password} is not correct.`);
    
};

module.exports = {
    emailExists,
    isTypeString,
    emailNotExist,
    userNameNotExist,
    verifyPassword
}