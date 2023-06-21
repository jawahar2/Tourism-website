const{ Schema } = require( "mongoose" );
const Mongoose = require( "mongoose" )
Mongoose.Promise = global.Promise;
const url = "mongodb+srv://jawahar2:Shuttle!1997@cluster0.hqctd6f.mongodb.net/?retryWrites=true&w=majority";
// const url=https:cloud.mongodb.com/v2/6271c12e8e162476e822b854#clusters

let userSchema = Schema( {
    name: String,
    userId: String,
    emailId: String,
    contactNo: Number,
    password: String,
    bookings: [String]
}, { collection: "User" } )

let bookSchema = Schema( {
    bookingId: String,
    userId: String,
    destinationId: String,
    destinationName: String,
    checkInDate: String,
    checkOutDate: String,
    noOfPersons: Number,
    totalCharges: Number,
    timeStamp: String
}, { collection: "Book" } )

let hotDealsSchema = Schema( {
    destinationId: String,
    continent: String,
    imageUrl: String,
    name: String,
    details: {
        about: String,
        itinerary: {
            dayWiseDetails: {
                firstDay: String,
                restDaysSightSeeing: Array,
                lastDay: String
            },
            packageInclusions: Array,
            tourHighlights: Array,
            tourPace: Array
        }
    },
    noOfNights: Number,
    flightCharges: Number,
    chargesPerPerson: Number,
    discount: Number,
    availability: Number
}, { collection: "HotDeals" } )

let destinationSchema = Schema( {
    destinationId: String,
    continent: String,
    imageUrl: String,
    name: String,
    details: {
        about: String,
        itinerary: {
            dayWiseDetails: {
                firstDay: String,
                restDaysSightSeeing: Array,
                lastDay: String
            },
            packageInclusions: Array,
            tourHighlights: Array,
            tourPace: Array
        }
    },
    noOfNights: Number,
    flightCharges: Number,
    chargesPerPerson: Number,
    discount: Number,
    availability: Number
}, { collection: "Destination" } )


let collection = {};

collection.getUserCollection = () => {
    return Mongoose.connect( url, { useNewUrlParser: true, useUnifiedTopology: true } ).then( ( database ) => {
        console.log("user collection")
        return database.model( 'User', userSchema )
    } ).catch( (  ) => {
        let err = new Error( "Could not connect to Database" );
        err.status = 500;
        throw err;
    } )
}

collection.getDestinationCollection = () => {
    return Mongoose.connect( url, { useNewUrlParser: true, useUnifiedTopology: true } ).then( ( database ) => {
        console.log("dest")
        return database.model( 'Destination', destinationSchema )
    } ).catch( (  ) => {
        let err = new Error( "Could not connect to Database" );
        err.status = 500;
        throw err;
    } )
}

collection.getHotDealsCollection = () => {
    return Mongoose.connect( url, { useNewUrlParser: true, useUnifiedTopology: true } ).then( ( database ) => {
        console.log("hot deals")
        return database.model( 'HotDeals', hotDealsSchema )
    } ).catch( (  ) => {
        let err = new Error( "Could not connect to Database" );
        err.status = 500;
        throw err;
    } )
}

collection.getBookCollection = () => {
    return Mongoose.connect( url, { useNewUrlParser: true, useUnifiedTopology: true } ).then( ( database ) => {
        console.log("book")
        return database.model( 'Book', bookSchema )
    } ).catch( (  ) => {
        let err = new Error( "Could not connect to Database" );
        err.status = 500;
        throw err;
    } )
}
module.exports = collection;
