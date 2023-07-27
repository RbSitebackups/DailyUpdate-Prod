import mongoose from 'mongoose'

const UserclientSchema = new mongoose.Schema({
    client_id: {
        type: mongoose.Types.ObjectId,
    },
    assigned_id: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please provide user'],
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
})

export default mongoose.model('tbl_userclient', UserclientSchema)
