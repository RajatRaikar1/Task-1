const fs = require('fs')
const validatePhoneNumber = require('validate-phone-number-node-js'); 
const chalk = require('chalk')



const signUp = (name, emailID, password, phoneNumber ,gender) => {
    const validate = validatePhoneNumber.validate(phoneNumber)

    if(emailID.includes('@gmail.com') &&  (name.trim().length!==0)  && (validate === true)  && (genderValidate(gender))){
    const userDetalis = loadAllDetails()
    console.log(userDetalis.length)
    const dup = userDetalis.filter((user) => {
       return user.emailID === emailID
    })
    console.log(dup.length)
    if(dup.length === 0 ){
        userDetalis.push({
            name:name,
            emailID:emailID,
            password:password,
            phoneNumber:phoneNumber,
            gender:gender
        })
        save(userDetalis)
        console.log(chalk.inverse.green('Successfully Registered....'))
    }else{
        console.log(chalk.inverse.red('User details already exist...'))
    }
}else{
    console.log(chalk.inverse.red('enter proper details'))
}

}
                
            // User sing In 
const signIn = (emailID, password) => {
    const userDetails = loadAllDetails()
    console.log(userDetails.length)
    const user = userDetails.filter((details) =>{
        return details.emailID===emailID
    })
    if(user.length===1){
        console.log(chalk.inverse.green('Successfully logged....'))
    }
    else{
        console.log(chalk.inverse.red('invilid inputs'))
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
    if((gender ==='M') || (gender ==='F')){
        return true
      
    }else{
        return false
    }
}

module.exports={
    signUp:signUp,
    signIn:signIn
}