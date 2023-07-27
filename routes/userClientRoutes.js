import express from 'express'
const router = express.Router()

import {
    listUserclient,
    addUserClient,
    deleteUserClient,
} from '../controllers/userClientController.js'

router.route('/').post(addUserClient)
router.route('/:id').get(listUserclient)
router.route('/:id').delete(deleteUserClient)

export default router
