import Schedule from '../models/Schedule.js'
import Userclient from '../models/Userclient.js'

import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from '../errors/index.js'

const listSchedule = async (req, res) => {
  const edmSchedule = await Schedule.find().sort({
    date_to_send: -1, // 1 for ascending order
  })
  res.status(StatusCodes.OK).json({
    edmSchedule,
    totalEdmSchedules: edmSchedule.length,
    numOfPages: 1,
  })
}

const cDistTitle = async (req, res) => {
  const distinctCampaignTitles = await Schedule.distinct('campaign_title')

  // Map the distinct campaign titles to an array of objects
  const campaignSuggestions = distinctCampaignTitles.map((title) => ({
    title: title,
  }))

  res.status(StatusCodes.OK).json({
    campaignSuggestions: campaignSuggestions,
  })
}

const eDistTitle = async (req, res) => {
  const distinctCampaignTitles = await Schedule.distinct('edm_title')

  // Map the distinct campaign titles to an array of objects
  const edmSuggestions = distinctCampaignTitles.map((title) => ({
    title: title,
  }))

  res.status(StatusCodes.OK).json({
    edmSuggestions: edmSuggestions,
  })
}

const indClinetSchedule = async (req, res) => {
  const { id: client_id } = req.params

  const edmSchedule = await Schedule.find({ client_id: client_id }).sort({
    date_to_send: -1, // 1 for ascending order
  })

  res.status(StatusCodes.OK).json({
    edmSchedule,
    totalEdmSchedules: edmSchedule.length,
    numOfPages: 1,
  })
}

const getSchedulesByClientIds = async (req, res) => {
  // Parse the client_ids from the query parameters
  const clientIds = req.query.client_ids.split(',') // Split the comma-separated string into an array

  // Check if clientIds is blank (empty or contains only whitespace)
  if (clientIds.every((str) => !str.trim())) {
    // If clientIds is blank, send an empty array and set totalEdmSchedules to 0
    return res.status(StatusCodes.OK).json({
      edmSchedule: [],
      totalEdmSchedules: 0,
      numOfPages: 1,
    })
  }

  // Use Mongoose to find schedules that match the client_ids
  const edmSchedule = await Schedule.find({
    client_id: { $in: clientIds },
  }).sort({
    date_to_send: -1, // 1 for ascending order
  })

  res.status(StatusCodes.OK).json({
    edmSchedule,
    totalEdmSchedules: edmSchedule.length,
    numOfPages: 1,
  })
}

const getSchedulesByAssignedId = async (req, res) => {
  const { id: assigned_id } = req.params // Get the assigned_id from the query parameters

  // Find the UserClient document based on assigned_id
  const userClients = await Userclient.find({ assigned_id }, 'client_id')

  if (!userClients || userClients.length === 0) {
    res.status(StatusCodes.OK).json({
      edmSchedule: [],
      totalEdmSchedules: 0,
      numOfPages: 1,
    })
    return
    // throw new NotFoundError(`No UserClient with assigned_id: ${assigned_id}`)
  }

  const clientIds = userClients.map((userClient) => userClient.client_id)

  // Use Mongoose aggregation to perform a join between Schedule and UserClient
  const edmSchedule = await Schedule.aggregate([
    {
      $match: { client_id: { $in: clientIds } },
    },
    {
      $sort: { date_to_send: -1 },
    },
  ])

  res.status(StatusCodes.OK).json({
    edmSchedule,
    totalEdmSchedules: edmSchedule.length,
    numOfPages: 1,
  })
}

const addSchedule = async (req, res) => {
  const { date_to_send, campaign_id, edm_title } = req.body
  if (!date_to_send || !campaign_id || !edm_title) {
    throw new BadRequestError('Please provide the value!')
  }

  req.body.createdBy = req.user.userID
  const edmSchedule = await Schedule.create(req.body)
  res.status(StatusCodes.CREATED).json({ edmSchedule })
}

const editSchedule = async (req, res) => {
  const { id: scheduleID } = req.params
  const { date_to_send, campaign_id, edm_title, client_id } = req.body

  if (!date_to_send || !campaign_id || !edm_title || !client_id) {
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
  cDistTitle,
  eDistTitle,
  getSchedulesByClientIds,
  getSchedulesByAssignedId,
}
