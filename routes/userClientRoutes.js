import express from 'express'
const router = express.Router()

import {
  listUserclient,
  addUserClient,
  deleteUserClient,
  getUserClient,
} from '../controllers/userClientController.js'

router.route('/getclients/:id').get(getUserClient)
router.route('/:id').get(listUserclient).delete(deleteUserClient)
router.route('/').post(addUserClient)

export default router
