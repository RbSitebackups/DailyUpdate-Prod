import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    displayName: {
        type: String,
        maxlength: 20,
        trim: true,
        default: '',
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email',
        },
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        trim: true,
        select: false,
    },
    lastName: {
        type: String,
        trim: true,
        default: ' ',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userID: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    })
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

export default mongoose.model('tbl_user', UserSchema)
