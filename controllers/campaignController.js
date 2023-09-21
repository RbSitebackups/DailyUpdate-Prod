import Campaign from '../models/Campaign.js'
import Userclient from '../models/Userclient.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from '../errors/index.js'

const listcampaign = async (req, res) => {
  const campaigns = await Campaign.find().sort({
    createdAt: -1, // 1 for ascending order
  })
  res.status(StatusCodes.OK).json({
    campaigns,
    totalCampaigns: campaigns.length,
    numOfPages: 1,
  })
}
const addcampaign = async (req, res) => {
  const { campaign_title } = req.body
  if (!campaign_title) {
    throw new BadRequestError('Please provide the value!')
  }

  req.body.createdBy = req.user.userID
  const campaign = await Campaign.create(req.body)
  res.status(StatusCodes.CREATED).json({ campaign })
}

const getSchedulesByClientIds = async (req, res) => {
  // Parse the client_ids from the query parameters
  const clientIds = req.query.client_ids.split(',') // Split the comma-separated string into an array

  // Check if clientIds is blank (empty or contains only whitespace)
  if (clientIds.every((str) => !str.trim())) {
    // If clientIds is blank, send an empty array and set totalCampaigns to 0
    return res.status(StatusCodes.OK).json({
      campaigns: [],
      totalCampaigns: 0,
      numOfPages: 1,
    })
  }

  // Use Mongoose to find schedules that match the client_ids
  const campaigns = await Campaign.find({
    client_id: { $in: clientIds },
  }).sort({
    date_to_send: -1, // 1 for ascending order
  })

  res.status(StatusCodes.OK).json({
    campaigns,
    totalCampaigns: campaigns.length,
    numOfPages: 1,
  })
}

const getSchedulesByAssignedId = async (req, res) => {
  const { id: assigned_id } = req.params // Get the assigned_id from the query parameters

  // Find the UserClient document based on assigned_id
  const userClients = await Userclient.find({ assigned_id }, 'client_id')

  if (!userClients || userClients.length === 0) {
    res.status(StatusCodes.OK).json({
      campaigns: [],
      totalCampaigns: 0,
      numOfPages: 1,
    })
    return
    // throw new NotFoundError(`No UserClient with assigned_id: ${assigned_id}`)
  }

  const clientIds = userClients.map((userClient) => userClient.client_id)

  // Use Mongoose aggregation to perform a join between Schedule and UserClient
  const campaigns = await Campaign.aggregate([
    {
      $match: { client_id: { $in: clientIds } },
    },
    {
      $sort: { date_to_send: -1 },
    },
  ])

  res.status(StatusCodes.OK).json({
    campaigns,
    totalCampaigns: campaigns.length,
    numOfPages: 1,
  })
}

const indClinetCampaign = async (req, res) => {
  const { id: client_id } = req.params

  const campaigns = await Campaign.find({ client_id: client_id }).sort({
    date_to_send: -1, // 1 for ascending order
  })

  res.status(StatusCodes.OK).json({
    campaigns,
    totalCampaigns: campaigns.length,
    numOfPages: 1,
  })
}

const editcampaign = async (req, res) => {
  const { id: campaignID } = req.params
  const { campaign_title, client_id } = req.body

  if (!campaign_title || !client_id) {
    throw new BadRequestError('Please provide the value!')
  }

  const campaign = await Campaign.findOne({ _id: campaignID })

  if (!campaign) {
    throw new NotFoundError(`No Campaign with id :${campaignID}`)
  }

  // check permission

  const updatedCampaign = await Campaign.findOneAndUpdate(
    { _id: campaignID },
    req.body,
    { new: true, runValidators: true }
  )

  res.status(StatusCodes.OK).json({ updatedCampaign })
}

const cDistTitle = async (req, res) => {
  const distinctCampaignTitles = await Campaign.distinct('campaign_title')

  // Map the distinct campaign titles to an array of objects
  const campaignSuggestions = distinctCampaignTitles.map((title) => ({
    title: title,
  }))

  res.status(StatusCodes.OK).json({
    campaignSuggestions: campaignSuggestions,
  })
}

const deletecampaign = async (req, res) => {
  const { id: campaignID } = req.params

  const campaign = await Campaign.deleteOne({ _id: campaignID })

  if (!campaign) {
    throw new NotFoundError(`No Campaign with id :${campaignID}`)
  }
  res.status(StatusCodes.OK).json({ msg: 'Success! Campaign removed' })
}

export {
  listcampaign,
  addcampaign,
  editcampaign,
  deletecampaign,
  getSchedulesByAssignedId,
  getSchedulesByClientIds,
  indClinetCampaign,
  cDistTitle,
}
