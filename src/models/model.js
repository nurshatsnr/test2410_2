import mongoose from 'mongoose';

const modelSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    companyId: {
        type: String,
        required: true
    },
    historyId: {
        type: String,
        required: true
    },

}, { timestamps: true });

const model = mongoose.model('TestTable', modelSchema);

export default model;
