import mongoose from 'mongoose';

const TeacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    teacherId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    subjects: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema);
