const router = require('express').Router();

const {getAccessToken}=require('../helpers/jwtHelper')

router.post('/getAccessToken',getAccessToken)

module.exports=router