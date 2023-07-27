import Client from '../models/Client.js'
import { StatusCodes } from 'http-status-codes'
import {
    BadRequestError,
    NotFoundError,
    UnAuthenticatedError,
} from '../errors/index.js'

const listClient = async (req, res) => {
    const client = await Client.find()
    res.status(StatusCodes.OK).json({
        client,
        totalClients: client.length,
        numOfPages: 1,
    })
}

const addClient = async (req, res) => {
    const { client_name, client_initials } = req.body
    if (!client_name || !client_initials) {
        throw new BadRequestError('Please provide the value!')
    }
    req.body.createdBy = req.user.userID
    const client = await Client.create(req.body)
    res.status(StatusCodes.CREATED).json({ client })
}

const updateClient = async (req, res) => {
    const { id: clientID } = req.params
    const { client_name } = req.body

    if (!client_name) {
        throw new BadRequestError('Please provide the value')
    }

    const client = await Client.findOne({ _id: clientID })

    if (!client) {
        throw new NotFoundError(`No Client with id :${clientID}`)
    }

    // check permission

    const updatedClient = await Client.findOneAndUpdate(
        { _id: clientID },
        req.body,
        { new: true, runValidators: true }
    )

    res.status(StatusCodes.OK).json({ updatedClient })
}

const deleteClient = async (req, res) => {
    const { id: clientID } = req.params

    const _Client = await Client.deleteOne({ _id: clientID })

    if (!_Client) {
        throw new NotFoundError(`No Client with id :${clientID}`)
    }
    res.status(StatusCodes.OK).json({ msg: 'Success! Client removed' })
}

export { listClient, addClient, updateClient, deleteClient }
