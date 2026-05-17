import mongoose, { Schema, Document } from "mongoose";

export interface IVolunteer extends Document {
  name: string;
  email: string;
  phone?: string;
  interest: string;
  message?: string;
  createdAt: Date;
}

const VolunteerSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  interest: { type: String, required: true },
  message: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Volunteer || mongoose.model<IVolunteer>("Volunteer", VolunteerSchema);
