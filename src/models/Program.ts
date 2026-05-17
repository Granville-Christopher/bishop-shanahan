import mongoose, { Schema, Document } from "mongoose";

export interface IProgram extends Document {
  title: string;
  description: string;
  image: string;
}

const ProgramSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.models.Program || mongoose.model<IProgram>("Program", ProgramSchema);
