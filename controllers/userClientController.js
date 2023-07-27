import Userclient from '../models/Userclient.js'
import { StatusCodes } from 'http-status-codes'
import {
    BadRequestError,
    NotFoundError,
    UnAuthenticatedError,
} from '../errors/index.js'
import mongoose from 'mongoose'

const listUserclient = async (req, res) => {
    const { id: client_id } = req.params

    const rows = await Userclient.aggregate([
        {
            $match: {
                client_id:
                    mongoose.Types.ObjectId.createFromHexString(client_id),
            },
        },
        {
            $lookup: {
                from: 'tbl_users',
                localField: 'assigned_id',
                foreignField: '_id',
                as: 'userDetails',
            },
        },
        {
            $project: {
                _id: 1,
                client_id: 1,
                assigned_id: 1,
                name: {
                    $ifNull: [
                        { $arrayElemAt: ['$userDetails.name', 0] },
                        'N/A',
                    ],
                },
                lastName: {
                    $ifNull: [
                        { $arrayElemAt: ['$userDetails.lastName', 0] },
                        'N/A',
                    ],
                },
            },
        },
    ])

    res.status(StatusCodes.OK).json({
        rows,
        totalRows: rows.length,
        numOfPages: 1,
    })
}

const addUserClient = async (req, res) => {
    const { client_id, assigned_id } = req.body

    if (!assigned_id) {
        throw new BadRequestError(`Please provide the value!`)
    }

    const existingUserClient = await Userclient.findOne({
        client_id,
        assigned_id,
    })
    if (existingUserClient) {
        throw new BadRequestError('User already exists for the client')
    }

    req.body.createdBy = req.user.userID
    const userClient = await Userclient.create(req.body)
    res.status(StatusCodes.CREATED).json({ userClient })
}

const deleteUserClient = async (req, res) => {
    const { id: recordID } = req.params

    const _userClient = await Userclient.deleteOne({ _id: recordID })

    if (!_userClient) {
        throw new NotFoundError(`No Client with id :${recordID}`)
    }
    res.status(StatusCodes.OK).json({ msg: 'Success! Client removed' })
}

export { listUserclient, addUserClient, deleteUserClient }
