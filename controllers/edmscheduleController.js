import Schedule from '../models/Schedule.js'
import { StatusCodes } from 'http-status-codes'
import {
    BadRequestError,
    NotFoundError,
    UnAuthenticatedError,
} from '../errors/index.js'

const listSchedule = async (req, res) => {
    const edmSchedule = await Schedule.find()
    res.status(StatusCodes.OK).json({
        edmSchedule,
        totalEdmSchedules: edmSchedule.length,
        numOfPages: 1,
    })
}

const indClinetSchedule = async (req, res) => {
    const { id: client_id } = req.params

    const edmSchedule = await Schedule.find({ client_id: client_id })
    res.status(StatusCodes.OK).json({
        edmSchedule,
        totalEdmSchedules: edmSchedule.length,
        numOfPages: 1,
    })
}

const addSchedule = async (req, res) => {
    const { date_to_send, time_to_send, campaign_title, edm_title } = req.body
    if (!date_to_send || !time_to_send || !campaign_title || !edm_title) {
        throw new BadRequestError('Please provide the value!')
    }

    req.body.createdBy = req.user.userID
    const edmSchedule = await Schedule.create(req.body)
    res.status(StatusCodes.CREATED).json({ edmSchedule })
}

const editSchedule = async (req, res) => {
    const { id: scheduleID } = req.params
    const { date_to_send, time_to_send, campaign_title, edm_title } = req.body

    if (!date_to_send || !time_to_send || !campaign_title || !edm_title) {
        throw new BadRequestError('Please provide the value!')
    }

    const edmSchedule = await Schedule.findOne({ _id: scheduleID })

    if (!edmSchedule) {
        throw new NotFoundError(`No schedule with id :${scheduleID}`)
    }

    // check permission

    const updatedSchedule = await Schedule.findOneAndUpdate(
        { _id: scheduleID },
        req.body,
        { new: true, runValidators: true }
    )

    res.status(StatusCodes.OK).json({ updatedSchedule })
}

const deleteSchedule = async (req, res) => {
    const { id: scheduleID } = req.params

    const edmSchedule = await Schedule.deleteOne({ _id: scheduleID })

    if (!edmSchedule) {
        throw new NotFoundError(`No Schedule with id :${scheduleID}`)
    }
    res.status(StatusCodes.OK).json({ msg: 'Success! Schedule removed' })
}

export {
    listSchedule,
    addSchedule,
    editSchedule,
    deleteSchedule,
    indClinetSchedule,
}
