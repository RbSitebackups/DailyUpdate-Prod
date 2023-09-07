import mongoose from 'mongoose'

const ClientSchema = new mongoose.Schema({
  client_name: {
    type: String,
    required: [true, 'Please provide the client'],
  },
  client_initials: { type: String, maxlength: 20, trim: true, default: '' },
  contact_name: { type: String, default: '' },
  contact_email: { type: String, default: '' },
  contact_phone: { type: String, default: '' },
  bgcolor: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
})

export default mongoose.model('tbl_client', ClientSchema)
