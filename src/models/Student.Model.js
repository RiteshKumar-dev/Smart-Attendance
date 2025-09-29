import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    rollNo: {
      type: String,
      required: true,
      unique: true,
    },
    enrollmentNo: {
      type: String,
      required: true,
      unique: true,
    },
    semester: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      enum: ['BBA', 'BCA', 'BTech', 'MTech'],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Student || mongoose.model('Student', StudentSchema);
