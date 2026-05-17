import mongoose, { Schema, Document } from "mongoose";

export interface IPrayerRequest extends Document {
  name?: string;
  email?: string;
  request: string;
  confidential: boolean;
  createdAt: Date;
}

const PrayerRequestSchema: Schema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: false },
  request: { type: String, required: true },
  confidential: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.PrayerRequest || mongoose.model<IPrayerRequest>("PrayerRequest", PrayerRequestSchema);
