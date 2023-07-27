import express from 'express'
const router = express.Router()

import {
  listCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js'

router.route('/').post(addCategory).get(listCategory)
router.route('/:id').patch(updateCategory).delete(deleteCategory)

export default router
