// models/Task.js
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
