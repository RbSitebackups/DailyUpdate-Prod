import express from 'express'
const router = express.Router()

import {
    listSchedule,
    addSchedule,
    editSchedule,
    deleteSchedule,
    indClinetSchedule,
} from '../controllers/edmscheduleController.js'

router.route('/').get(listSchedule).post(addSchedule)
router.route('/:id').patch(editSchedule).get(indClinetSchedule)
router.route('/:id').delete(deleteSchedule)

export default router
