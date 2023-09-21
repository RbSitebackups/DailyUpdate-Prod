import express from 'express'
const router = express.Router()

import {
  listcampaign,
  addcampaign,
  editcampaign,
  deletecampaign,
  getSchedulesByClientIds,
  getSchedulesByAssignedId,
  indClinetCampaign,
  cDistTitle,
} from '../controllers/campaignController.js'

router.route('/alluserclient').get(getSchedulesByClientIds)
router.route('/ctitles').get(cDistTitle)
router.route('/allassignedclient/:id').get(getSchedulesByAssignedId)
router
  .route('/:id')
  .patch(editcampaign)
  .delete(deletecampaign)
  .get(indClinetCampaign)
router.route('/').post(addcampaign).get(listcampaign)

export default router
