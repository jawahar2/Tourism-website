const userDetails = require( './beanClasses/users' );
const connection = require( "../utilities/connections" )

const usersDB = {}

usersDB.checkUser = ( contactNo ) => {
    return connection.getUserCollection().then( ( collection ) => {
        return collection.findOne( { "contactNo": contactNo } ).then( ( customerContact ) => {
            if( customerContact ) {
                return new userDetails( customerContact );
            }
            else{
                return null;
            } 
        } )
    } )
}

usersDB.getarr = ()=>{
    return connection.getUserCollection().then( ( collection )=>{
        return collection.find( {},{} ).then( ( data )=>{
            if( data.length!=0 ){
                return data;
            }
            else{
                return null;
            }
        } )
    } )
}

usersDB.getPassword = ( contactNo ) => {
    return connection.getUserCollection().then( ( collection ) => {
        return collection.find( { "contactNo": contactNo }, { _id: 0, password: 1 } ).then( ( password ) => {
            if( password.length != 0 ){
                return password[0].password;
            }
            else{
                return null;

            }
        } )
    } )
}

usersDB.insertDetails = ( userId,name,emailId,contactNo,password ) => {
    return connection.getUserCollection().then( ( collection ) => {
        return collection.create( {userId: userId,name: name,emailId: emailId,contactNo: contactNo,password: password, bookings: []} ).then( ( data ) => {
            if( data ){
                return data;
            } else
                return null;
        } )
    } )
}
usersDB.findContact = ( contactNo ) => {
    return connection.getUserCollection().then( ( collection ) => {
        return collection.findOne( {"contactNo": contactNo} ).then( ( data ) => {
            if( data ){
                return data;
            }
            else{
                return null;

            }
        } )
    } )
}

usersDB.destinations=() => {
    return connection.getDestinationCollection().then( ( collection ) => {
        return collection.find( {},{} ).then( ( data ) => {
            if( !data | data.length==0 ) return null;
            else return data;
        } )
    } )
}

usersDB.hotDeals=() => {
    return connection.getHotDealsCollection().then( ( collection ) => {
        return collection.find( {},{} ).then( ( data ) => {
            if( !data | data.length==0 ) {

                return null
            }
            else return data;
        } )
    } )
}

usersDB.getBookings=() => {
    return connection.getBookCollection().then( ( collection ) => {
        return collection.find( {},{} ).then( ( data ) => {
            if( !data | data.length==0 ) return null;
            else return data;
        } )
    } )
}

usersDB.getptrips=( uid )=>{
    return connection.getBookCollection().then( ( collection )=>{
        return collection.find( {userId: uid} ).then( ( data )=>{
            return data;
        } )
    } )
}

usersDB.finddestination=( dId )=>{
    if( dId[0]=="D" ){
        return connection.getDestinationCollection().then( ( collection )=>{
            return collection.findOne( {destinationId: dId} ).then( ( data )=>{
                return data;
            } )
        } )
    } else{
        return connection.getHotDealsCollection().then( ( collection )=>{
            return collection.findOne( {destinationId: dId} ).then( ( data )=>{
                return data;
            } )
        } )
    }
}

usersDB.book=( uid, bookid ,dId,value, sdate, edate ) =>{
    console.log( "in 6" )
    console.log( sdate )
    if( dId[0]=="D" ){
        return connection.getDestinationCollection().then( ( collection ) => {
            console.log( "in 7" )
            return collection.updateOne( {destinationId: dId}, {$inc: {availability: -value }} ).then( ( data )=>{
                if( data.nModified==1 ){
                    return connection.getUserCollection().then( ( collection )=>{
                        return collection.updateOne( {userId: uid} , {$push: {bookings: bookid}} ).then( (  )=>{
                             return usersDB.finddestination( dId ).then( ( data )=>{
                                let obj ={bookingId: bookid,
                                    userId: uid,
                                    destId: dId,
                                    destinationName: data.name,
                                    checkInDate: sdate,
                                    checkOutDate: edate,
                                    noOfPersons: value,
                                    totalCharges: (data.chargesPerPerson * value)}
                            return connection.getBookCollection().then( ( collection )=>{
                                console.log( "in 11" )
                                
                                return collection.create( obj ).then( ( data )=>{
                                    console.log( "in 12" )
                                    return data;
                                } )
                            } )
                        } )
                            
                        } )
                    } )

                }
                else{
                    return null;
                }
            } )
        } )
    } else{
        return connection.getHotDealsCollection().then( ( collection ) => {
            return collection.updateOne( {destinationId: dId}, {$inc: {availability: -value }} ).then( ( data )=>{
                if( data.nModified==1 ){
                    return connection.getUserCollection().then( ( collection )=>{
                        return collection.updateOne( {userId: uid} , {$push: {bookings: bookid}} ).then( (  )=>{
                            return usersDB.finddestination( dId ).then( ( data )=>{
                                let obj={
                                    bookingId: bookid,
                                    userId: uid,
                                    destId: dId,
                                    destinationName: data.name,
                                    checkInDate: sdate,
                                    checkOutDate: edate,
                                    noOfPersons: value,
                                    totalCharges: data.totalCharges
                                }
                                return connection.getBookCollection().then( ( collection )=>{
                                    return collection.create( obj ).then( ( data )=>{
                                        return data;
                                    } )
                                } )
                            } )
                            

                            
                        } )
                    } )

                }
                
                else{
                    return null;
                }
            } )
        } )
    }
    
}







module.exports = usersDB;
