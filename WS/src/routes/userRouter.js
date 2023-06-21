const express = require( 'express' );
const router = express.Router();
const setupUser = require( "../model/setupUser" )
const userservice = require( '../service/userslogin' )

router.get( "/setup", ( req, res, next ) => {
    setupUser.userSetup().then( ( data ) => {
        res.send( data )
    } ).catch( err => next( err ) );
} )

//router to login
router.post( '/login', function ( req, res, next ) {
    let contactNo = req.body.contactNo;
    let password = req.body.password;
    userservice.login( parseInt( contactNo ), password ).then( function ( userDetails ) {
        res.json( userDetails );
    } ).catch( err => next( err ) );
} )

router.post( '/register', function ( req, res, next ) {
    let name=req.body.name
    let emaiId=req.body.emailId
    let contactNo=req.body.contactNo
    let password=req.body.password

    userservice.register( name,emaiId,parseInt( contactNo ),password ).then( ( data ) => {
        res.json( data );
    } ).catch( err => next( err ) );
} )

router.get( '/packages' , function ( req, res, next ) {
    userservice.places().then( ( places ) =>{
        res.json( places );
    } ).catch( err => next( err ) );
} )

router.get( '/hotdeals' , function ( req, res, next ) {
    userservice.hotDeals().then( ( hotDeals ) =>{
        res.json( hotDeals );
    } ).catch( err => next( err ) );
} )

router.post( '/ptrips', function ( req, res, next ) {
    let uid=req.body.uid
    userservice.ptrips( uid ).then( ( data ) => {
        res.json( data );
    } ).catch( err => next( err ) );
} )

router.post( '/book', function ( req, res, next ) {
    console.log( "in 1" )
    let val=req.body.value
    let Id=req.body.Id
    let startdate=req.body.startdate
    let enddate=req.body.enddate
    let uid=req.body.uid;
    console.log( startdate )
    userservice.dec( uid, Id,val,startdate,enddate ).then( ( data ) => {
        console.log( "in 2" )
        res.json( data );
    } ).catch( err => next( err ) );
} )
module.exports = router;

