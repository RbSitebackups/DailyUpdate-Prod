import express from 'express'
const router = express.Router()

import {
    register,
    updateUser,
    login,
    glogin,
    gregister,
    listuser,
    getSingleUser,
} from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/gregister').post(gregister)
router.route('/glogin').post(glogin)
router.route('/updateUser').patch(authenticateUser, updateUser)
router.route('/listuser').get(authenticateUser, listuser)
router.route('/:id').get(authenticateUser, getSingleUser)

export default router
