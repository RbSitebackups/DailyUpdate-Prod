import mongoose from 'mongoose'
const CampaignSchema = new mongoose.Schema({
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client', // Reference to the Client model
    required: true,
  },
  campaign_title: { type: String },
  campaign_desc: { type: String },
  campaign_startdate: { type: String },
  campaign_enddate: { type: String },
  campaign_eventdate: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
})
export default mongoose.model('tbl_campaign', CampaignSchema)
