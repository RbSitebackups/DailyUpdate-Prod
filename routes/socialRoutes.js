import express from 'express'
const router = express.Router()

import {
  listSocial,
  addSocial,
  editSocial,
  deleteSocial,
  indClinetSocial,
  sDistTitle,
  getSocialsByClientIds,
  getSocialsByAssignedId,
} from '../controllers/socialController.js'

// Move the 'cDistTitle', 'etitles', 'alluserclient' route before the route that expects a client ID
router.route('/stitles').get(sDistTitle)
router.route('/alluserclient').get(getSocialsByClientIds)
router.route('/allassignedclient/:id').get(getSocialsByAssignedId)
// Define the routes for 'indClinetSocial', 'editSocial', and 'deleteSocial' afterward
router.route('/:id').get(indClinetSocial).patch(editSocial).delete(deleteSocial)

// Define the routes for 'listSocial' and 'addSocial' at the end
router.route('/').get(listSocial).post(addSocial)

export default router
