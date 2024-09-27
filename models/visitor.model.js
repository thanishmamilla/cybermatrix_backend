// models/visitor.model.js
import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    required: true,
  },
  visitTime: {
    type: Date,
    default: Date.now,
  },
});

const Visitor = mongoose.model('Visitor', visitorSchema);
export default Visitor;
