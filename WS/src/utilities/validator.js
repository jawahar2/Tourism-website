let validator ={}
validator.emailId=( emailId )=>{

    if( emailId.match( /^[a-z0-9]{1,}@[a-z]{1,}(\.com)$/ ) ){
        return emailId;
    }
    else{
        let err=new Error( "email Id format is wrong" )
        err.status=406
        throw err
    }
}

validator.contactNo=( contactNo )=>{

    if( contactNo.match( /^[789]{1}[0-9]{9}$/ ) ){
        return contactNo;
    }
    else{
        let err=new Error( "Contact no. format is wrong" )
        err.status=406
        throw err
    }
}

validator.password=( password ) =>{
   
    if( password.match( /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{7,20}$/) ){
        return password;
    }
    else{
        let err=new Error( "password format is wrong" )
        err.status=406
        throw err
    }
}

module.exports=validator