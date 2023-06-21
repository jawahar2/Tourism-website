const userDB = require( '../model/userslogin' );

const userService = {}

//login a user
userService.login = ( contactNo, userPassword ) => {
    return userDB.checkUser( contactNo ).then( ( user ) => {
        if( user == null ) {
            let err = new Error( "Enter registered contact number! If not registered, please register" )
            err.status = 404
            throw err
        }
        else{
            return userDB.getPassword( contactNo ).then( ( password ) => {
                if( password != userPassword ) {
                    let err = new Error( "Incorrect password" )
                    err.status = 406
                    throw err
                }
                else{
                    return user;
                }
            } )
        }
    } )
}

userService.hotDeals = () => {
    return userDB.hotDeals().then( ( data ) => {
        if( data ){
            return data;
        } else{
            let err = new Error( "cannot fetch" )
                    err.status = 406
                    throw err
        }
    } )
}

userService.generateId=()=>{
    return userDB.getarr().then( ( data )=>{
        if( data ){
            let Num=1001 + data.length
            return"U"+Num;
        }
    } )
}


userService.generateBookId=()=>{
    return userDB.getBookings().then( ( data1 )=>{
        if( data1 ){
            let num1=1001 + data1.length;
            return"B"+num1;
        }
        else{
            return null;
        }
    } )
}
userService.ptrips=( uid )=>{
    return userDB.getptrips( uid ).then( ( data )=>{
        if( data ){
            return data;
        } else{
            console.log( "service2" )

            let err = new Error( "cannot fetch ptrips" )
            err.status = 406
            throw err
        }
    } )
}
userService.places = () => {
    return userDB.destinations().then( ( data ) => {
        if( data ){
            return data;
        } else{
            let err = new Error( "cannot fetch" )
                    err.status = 406
                    throw err
        }
    } )
}

//
userService.dec = ( uid, dId , value , sdate , edate ) => {
    console.log( "in 3" )
            return userService.generateBookId().then( ( bid )=>{
                console.log( "in 4" )
                if( bid ){
                    return userDB.book( uid, bid, dId , value, sdate, edate ).then( ( data1 )=> {
                        if( data1 ){
                            console.log( "in 4-1" )
                            return data1;
                        } else{
                            console.log( "in 5" )
                            let err = new Error( "Cannot complete the registration" )
                            err.status = 406
                            throw err
                        }
                    } )
                }
            } )
        
}

userService.register = ( name,emailId,contactNo,password ) => {
    return userDB.findContact( contactNo ).then( ( conctno ) => {
        if( conctno ){
            let err = new Error( "The contact number already exists" )
            err.status = 406
            throw err
        } else{
            return userService.generateId().then( ( id )=>{
                if( id ){
                    return userDB.insertDetails( id,name,emailId,contactNo,password ).then( ( data1 ) => {
                        if( data1==null ){
                            let err = new Error( "Registrartion failed! Please try again" )
                            err.status = 406
                            throw err
                        }
                        else{
                            return data1;
                        }
                } )
                }
            } )
    }
} )
}
 

module.exports = userService
