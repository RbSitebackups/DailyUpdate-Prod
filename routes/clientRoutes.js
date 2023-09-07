import express from 'express'
const router = express.Router()

import {
  listClient,
  addClient,
  updateClient,
  deleteClient,
  checkColour,
} from '../controllers/clientController.js'

router.route('/').post(addClient).get(listClient)
router.route('/checkcolour/:id').get(checkColour)
router.route('/:id').patch(updateClient).delete(deleteClient)

export default router
