import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
    client_id: {
        type: mongoose.Types.ObjectId,
    },
    category_id: {
        type: mongoose.Types.ObjectId,
    },
    d_update: { type: String, required: [true, 'Please provide the category'] },
    details: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
})

export default mongoose.model('tbl_progress', CategorySchema)
