const fs = require('fs')
const validatePhoneNumber = require('validate-phone-number-node-js'); 
const chalk = require('chalk')


//signup function
const signUp = (name, emailID, password, phoneNumber, gender) => {
    const validate = validatePhoneNumber.validate(phoneNumber)
    const emailIdValidation = emailID.includes('@gmail.com')
    const nameValidation = name.trim().length!==0
    const passwordValidation = password.trim().length!==0 && password.length>=5 
    const genderValidation = genderValidate(gender)
    
    if( (emailIdValidation === true) && (nameValidation === true ) && (passwordValidation === true ) && (validate === true) && (genderValidate(gender)) ){
        const userDetalis = loadAllDetails()

        const dup = userDetalis.filter((user) => {
        return user.emailID === emailID
        })

        if(dup.length === 0 )
        {
            userDetalis.push({
                name:name,
                emailID:emailID,
                password:password,
                phoneNumber:phoneNumber,
                gender:gender
            })
            save(userDetalis)
            console.log(chalk.inverse.green('Successfully Registered...'))

        }else{
            console.log(chalk.inverse.red('User details already exist...'))
        }
    }else{
        if(validate === false)
            console.log(chalk.inverse.red('enter proper phone number'))
        if(emailIdValidation === false)
            console.log(chalk.inverse.red('enter proper email Id' ))
        if(nameValidation === false)
            console.log(chalk.inverse.red('enter proper name' ))
        if(passwordValidation === false )
            console.log(chalk.inverse.red('enter proper password' ))
        if(genderValidate(gender) === false)
            console.log(chalk.inverse.red('enter proper gender ( M / F)' ))
        
    }
}
                
            // User sing In 
const signIn = (emailID, password) => {
    const userDetails = loadAllDetails()
    const user = userDetails.filter((details) =>{
        return details.emailID === emailID && details.password === password
    })
    if(user.length===1){
        console.log(chalk.inverse.green('Successfully logged...'))
    }
    else{
        console.log(chalk.inverse.red('Provode proper credentials...'))
    }
}


const loadAllDetails = () => {
    try{
        const dataBuffer = fs.readFileSync('user_details.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON);

    }catch(e){
        return []
    }
}

const save = (user_info) =>{
    const data = JSON.stringify(user_info)
    fs.writeFileSync('user_details.json',data)
}

const genderValidate = (gender) => {
    if((gender == 'M') || (gender == 'F')){
        return true
    }else{
        return false
    }
}

module.exports={
    signUp:signUp,
    signIn:signIn
}