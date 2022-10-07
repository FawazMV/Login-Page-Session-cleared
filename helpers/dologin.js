const { mail } = require('./username')


exports.doLogin = (userdata) => {
    return new Promise((resolve, reject) => {

        let response = {};
        console.log(userdata.email)
        let result = mail.find(({ email,password }) =>  email === userdata.email && password === userdata.password)
        if (result===undefined){
            response.status=false     
        }
        else{
            response.status = true
            response.user =result.name
        }
        resolve(response)

    })
}
