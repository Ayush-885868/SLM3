import express from 'express'
const router = express.Router();
import {Register, Login, Auth} from '../controller/userController.js'
//import bcrypt from 'bcrypt'
import { body } from 'express-validator'
import { VerifyUser } from '../middleware/VerifyUser.js';
import { createRequest, getContacts, getAllContacts, setChanges, createChanges } from '../controller/installreqController.js';
//import {User} from '../models/User.js'
//import {softReq} from '../model/softReq.js';
//import jwt from 'jsonwebtoken'




//user routes
router.post('contactmsyt/Register',[
    body('name').trim().notEmpty().withMessage("Name should not be empty"),
    body('designation').trim().notEmpty().withMessage("Designation should not be empty"),
    body('email').trim().notEmpty().withMessage("Email should not be empty")
        .isEmail().withMessage("Invalid Email!!!"),
    body('password').trim().notEmpty().withMessage("password should not be empty")
        .isLength({ min: 5, max: 30 }).withMessage("Password length be 5-30")
], Register) // here we will call controller



router.post('contactmsyt/Login',[  // this will call login controller
    body('email').trim().notEmpty().withMessage("Email should not be empty")
        .isEmail().withMessage("Invalid Email!!!"),
    body('password').trim().notEmpty().withMessage("password should not be empty")
        .isLength({ min: 5, max: 30 }).withMessage("Password length be 5-30")
],Login) 



router.get('contactmsyt/verify', VerifyUser, Auth)






// software install request routes

router.post('contactmsyt/add-request',VerifyUser ,createRequest) // this will call  controller

router.get('contactmsyt/installreqs',VerifyUser ,getContacts)
// router.post('/contactmsyt/verify', VerifyUser, createRequest);
// router.get('/contactmsyt/get', VerifyUser, getContacts);
router.get('contactmsyt/contacts', getAllContacts)
router.put('contactmsyt/records/:id', setChanges)
router.post('contactmsyt/approvedSoftware', createChanges)


export {router as Router}