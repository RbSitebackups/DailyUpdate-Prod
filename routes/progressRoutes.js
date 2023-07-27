import express from 'express'
const router = express.Router()

import {
    listProgress,
    addProgress,
    updateProgress,
    deleteProgress,
    getDistinctCategories,
    listcate,
} from '../controllers/progressController.js'

router.route('/').get(listProgress).post(addProgress)
router.route('/:id').patch(updateProgress).delete(deleteProgress)
router.route('/getcategory').get(getDistinctCategories)
router.route('/listcate/:client_id').get(listcate)

export default router
