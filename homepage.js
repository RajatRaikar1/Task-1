const yargs = require('yargs')
const utils =require('./utils.js')


// sign up command 
yargs.command({
    command:'signup',
    description:'adding user details into fs',
    builder:{
        name:{
            description:'enter name',
            demandOption: true,
            type: 'string'
        },
        emailID:{
            description:'enter emailID',
            demandOption: true,
            type: 'string'
        },
        password:{
            description:'enter password',
            demandOption: true,
            type: 'string'
        },
        phoneNumber:{
            description:'enter phone number',
            demandOption: true,
            type:'digit'
        },
        gender:{
            description:'enter phone gender',
            demandOption: true,
            type:'string'
        },
    },
    handler:(argv)=>{
        utils.signUp(argv.name, argv.emailID,  argv.password, argv.phoneNumber, argv.gender)
    }

}).parse()

// sign In command 
yargs.command({
    command:'signin',
    description:'Logging User',
    builder:{
        emailID:{
            description:'enter emailid',
            demandOption: true,
            type:'string'
        },
        password:{
            description:'enter password',
            demandOption: true,
            type:'string'
        }
    },
    handler:(argv)=>{
        utils.signIn(argv.emailID, argv.password)
    }
}).parse()


