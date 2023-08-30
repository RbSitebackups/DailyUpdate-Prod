import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required: [true, 'Please provide the category'],
        unique: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
    archive: {
        type: Boolean,
        default: 0,
    },
    category_for: { type: String },
})

export default mongoose.model('tbl_category', CategorySchema)
