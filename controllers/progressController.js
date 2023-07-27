import DailyProgress from '../models/DailyProgress.js'
import Category from '../models/Category.js'
import { StatusCodes } from 'http-status-codes'
import {
    BadRequestError,
    NotFoundError,
    UnAuthenticatedError,
} from '../errors/index.js'

const listProgress = async (req, res) => {
    res.send('list all Progress')
}

const addProgress = async (req, res) => {
    const { client_id, category_id, d_update, details } = req.body
    if (!d_update || !category_id) {
        throw new BadRequestError('Please provide the value!')
    }
    req.body.createdBy = req.user.userID
    const dProgress = await DailyProgress.create(req.body)
    res.status(StatusCodes.CREATED).json({ dProgress })
}

const updateProgress = async (req, res) => {
    res.send('update Progress')
}

const deleteProgress = async (req, res) => {
    res.send('delete Progress')
}

const getDistinctCategories = async (req, res) => {
    const dist_categories = await DailyProgress.aggregate([
        {
            $lookup: {
                from: 'tbl_categories', // The name of the "tbl_category" collection in MongoDB
                localField: 'category_id',
                foreignField: '_id',
                as: 'category',
            },
        },
        { $unwind: '$category' },
        {
            $group: {
                _id: '$category._id', // Group by the category_id
                category_id: { $first: '$category._id' }, // Get the first category_id
                category_name: { $first: '$category.category_name' }, // Get the first category_name
            },
        },
    ])

    res.status(StatusCodes.OK).json({ dist_categories })
}

const listcate = async (req, res) => {
    const { client_id: client_id } = req.params

    try {
        // Fetch updates that match the provided client_id and category_id
        const dailyUpdates = await DailyProgress.find({
            client_id: client_id,
        })

        res.status(StatusCodes.OK).json({ dailyUpdates }) // Send the fetched updates as the response
    } catch (error) {
        console.error('Error fetching updates:', error.message)
        res.status(500).json({ error: 'No updates has been made yet' })
    }
}

export {
    listProgress,
    addProgress,
    updateProgress,
    deleteProgress,
    getDistinctCategories,
    listcate,
}
