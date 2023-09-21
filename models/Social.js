import mongoose from 'mongoose'

const SocialSchema = new mongoose.Schema({
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client', // Reference to the Client model
    required: true,
  },
  date_to_send: { type: String },
  campaign_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign', // Reference to the Client model
    required: true,
  },
  social_title: { type: String },
  audience: { type: String },
  sdr_report_update: { type: String },
  social_link: { type: String },
  linked_social: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule', // Reference to the Client model
    required: false,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
})

export default mongoose.model('tbl_social', SocialSchema)
