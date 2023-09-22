import Social from '../models/Social.js'
import Userclient from '../models/Userclient.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from '../errors/index.js'

const listSocial = async (req, res) => {
  const socials = await Social.find().sort({
    createdAt: -1, // 1 for ascending order
  })
  res.status(StatusCodes.OK).json({
    socials,
    totalSocials: socials.length,
    numOfPages: 1,
  })
}
const addSocial = async (req, res) => {
  const { social_title } = req.body
  if (!social_title) {
    throw new BadRequestError('Please provide the value!')
  }

  req.body.createdBy = req.user.userID
  const social = await Social.create(req.body)
  res.status(StatusCodes.CREATED).json({ social })
}

const getSocialsByClientIds = async (req, res) => {
  // Parse the client_ids from the query parameters
  const clientIds = req.query.client_ids.split(',') // Split the comma-separated string into an array

  // Check if clientIds is blank (empty or contains only whitespace)
  if (clientIds.every((str) => !str.trim())) {
    // If clientIds is blank, send an empty array and set totalSocials to 0
    return res.status(StatusCodes.OK).json({
      socials: [],
      totalSocials: 0,
      numOfPages: 1,
    })
  }

  // Use Mongoose to find Socials that match the client_ids
  const socials = await Social.find({
    client_id: { $in: clientIds },
  }).sort({
    date_to_send: -1, // 1 for ascending order
  })

  res.status(StatusCodes.OK).json({
    socials,
    totalSocials: socials.length,
    numOfPages: 1,
  })
}

const getSocialsByAssignedId = async (req, res) => {
  const { id: assigned_id } = req.params // Get the assigned_id from the query parameters

  // Find the UserClient document based on assigned_id
  const userClients = await Userclient.find({ assigned_id }, 'client_id')

  if (!userClients || userClients.length === 0) {
    res.status(StatusCodes.OK).json({
      socials: [],
      totalSocials: 0,
      numOfPages: 1,
    })
    return
    // throw new NotFoundError(`No UserClient with assigned_id: ${assigned_id}`)
  }

  const clientIds = userClients.map((userClient) => userClient.client_id)

  // Use Mongoose aggregation to perform a join between Social and UserClient
  const socials = await Social.aggregate([
    {
      $match: { client_id: { $in: clientIds } },
    },
    {
      $sort: { date_to_send: -1 },
    },
  ])

  res.status(StatusCodes.OK).json({
    socials,
    totalSocials: socials.length,
    numOfPages: 1,
  })
}

const indClinetSocial = async (req, res) => {
  const { id: client_id } = req.params

  const socials = await Social.find({ client_id: client_id }).sort({
    date_to_send: -1, // 1 for ascending order
  })

  res.status(StatusCodes.OK).json({
    socials,
    totalSocials: socials.length,
    numOfPages: 1,
  })
}

const editSocial = async (req, res) => {
  const { id: socialID } = req.params
  const { social_title, client_id } = req.body

  if (!social_title || !client_id) {
    throw new BadRequestError('Please provide the value!')
  }

  const social = await Social.findOne({ _id: socialID })

  if (!social) {
    throw new NotFoundError(`No Social with id :${socialID}`)
  }

  // check permission

  const updatedSocial = await Social.findOneAndUpdate(
    { _id: socialID },
    req.body,
    { new: true, runValidators: true }
  )

  res.status(StatusCodes.OK).json({ updatedSocial })
}

const sDistTitle = async (req, res) => {
  const distinctSocialTitles = await Social.distinct('Social_title')

  // Map the distinct Social titles to an array of objects
  const socialSuggestions = distinctSocialTitles.map((title) => ({
    title: title,
  }))

  res.status(StatusCodes.OK).json({
    socialSuggestions: socialSuggestions,
  })
}

const deleteSocial = async (req, res) => {
  const { id: socialID } = req.params

  const social = await Social.deleteOne({ _id: socialID })

  if (!social) {
    throw new NotFoundError(`No Social with id :${socialID}`)
  }
  res.status(StatusCodes.OK).json({ msg: 'Success! Social removed' })
}

export {
  listSocial,
  addSocial,
  editSocial,
  deleteSocial,
  getSocialsByAssignedId,
  getSocialsByClientIds,
  indClinetSocial,
  sDistTitle,
}
