import Category from '../models/Category.js'
import { StatusCodes } from 'http-status-codes'
import {
    BadRequestError,
    NotFoundError,
    UnAuthenticatedError,
} from '../errors/index.js'

const listCategory = async (req, res) => {
    const category = await Category.find()
    res.status(StatusCodes.OK).json({
        category,
        totalCategories: category.length,
        numOfPages: 1,
    })
}

const addCategory = async (req, res) => {
    const { category_name } = req.body
    if (!category_name) {
        throw new BadRequestError('Please provide the value!')
    }
    // Check if the category_name already exists in the database
    const existingCategory = await Category.findOne({ category_name })

    if (existingCategory) {
        // Category with the same name already exists, handle the duplicate case
        throw new BadRequestError('Category Already Exists')
    }

    req.body.createdBy = req.user.userID
    const category = await Category.create(req.body)
    res.status(StatusCodes.CREATED).json({ category })
}

const updateCategory = async (req, res) => {
    const { id: cateID } = req.params
    const { category_name } = req.body

    if (!category_name) {
        throw new BadRequestError('Please provide the value')
    }

    const category = await Category.findOne({ _id: cateID })

    if (!category) {
        throw new NotFoundError(`No category with id :${categoryID}`)
    }

    // check permission

    const updatedCate = await Category.findOneAndUpdate(
        { _id: cateID },
        req.body,
        { new: true, runValidators: true }
    )

    res.status(StatusCodes.OK).json({ updatedCate })
}

const deleteCategory = async (req, res) => {
    const { id: cateID } = req.params
    console.log(cateID)

    const _category = await Category.deleteOne({ _id: cateID })

    if (!_category) {
        throw new NotFoundError(`No category with id :${cateID}`)
    }
    res.status(StatusCodes.OK).json({ msg: 'Success! Category removed' })
}

export { listCategory, addCategory, updateCategory, deleteCategory }
