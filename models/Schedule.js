import mongoose from 'mongoose'

const ScheduleSchema = new mongoose.Schema({
    client_id: {
        type: mongoose.Types.ObjectId,
    },
    date_to_send: { type: String },
    time_to_send: { type: String },
    campaign_title: { type: String },
    edm_title: { type: String },
    audience: { type: String },
    sdr_report_update: { type: String },
    edm_link: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
    },
})

export default mongoose.model('tbl_schedule', ScheduleSchema)