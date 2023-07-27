import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'

import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

const register = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        throw new BadRequestError('Please provide all values')
    }

    const userAlreadyExists = await User.findOne({ email })
    if (userAlreadyExists) {
        throw new BadRequestError('Email already in use')
    }

    const user = await User.create({ name, email, password })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            lastName: user.lastName,
            name: user.name,
            displayName: user.displayName,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        },
        token,
    })
}

const gregister = async (req, res) => {
    const { name, lastName, email } = req.body

    const userAlreadyExists = await User.findOne({ email })
    if (userAlreadyExists) {
        throw new BadRequestError('Email already in use')
    }

    const password = 'resonate123'

    const user = await User.create({ name, lastName, email, password })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email,
            lastName: user.lastName,
            name: user.name,
            displayName: user.displayName,
            isAdmin: user.isAdmin,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        },
        token,
    })
}
const glogin = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).json({ user, token })
}

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        throw new UnAuthenticatedError('Invalid Credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).json({ user, token })
}

const updateUser = async (req, res) => {
    const { email, name, lastName, displayName, isAdmin } = req.body
    if ((!email, !name, !lastName, !displayName, !isAdmin)) {
        throw new BadRequestError('Please provide all values')
    }

    const user = await User.findOne({ _id: req.user.userID })

    user.email = email
    user.name = name
    user.lastName = lastName
    user.displayName = displayName
    user.isAdmin = isAdmin

    await user.save()

    const token = user.createJWT()

    res.status(StatusCodes.OK).json({ user, token })
}

const archiveUser = async (req, res) => {
    res.send('update user')
}
const listuser = async (req, res) => {
    const userlist = await User.find()
    res.status(StatusCodes.OK).json({
        userlist,
    })
}

const getSingleUser = async (req, res) => {
    const userDet = await User.findOne({ _id: req.params.id })
    res.status(StatusCodes.OK).json({
        userDet,
    })
}

export {
    register,
    updateUser,
    login,
    archiveUser,
    glogin,
    gregister,
    listuser,
    getSingleUser,
}
