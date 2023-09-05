import express from 'express'
const router = express.Router()

import {
  listSchedule,
  addSchedule,
  editSchedule,
  deleteSchedule,
  indClinetSchedule,
  cDistTitle,
  eDistTitle,
} from '../controllers/edmscheduleController.js'

// Move the 'cDistTitle' route before the route that expects a client ID
router.route('/ctitles').get(cDistTitle)
// Move the 'eDistTitle' route before the route that expects a client ID
router.route('/etitles').get(eDistTitle)

// Define the routes for 'indClinetSchedule', 'editSchedule', and 'deleteSchedule' afterward
router
  .route('/:id')
  .get(indClinetSchedule)
  .patch(editSchedule)
  .delete(deleteSchedule)

// Define the routes for 'listSchedule' and 'addSchedule' at the end
router.route('/').get(listSchedule).post(addSchedule)

export default router
