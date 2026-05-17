import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  price: number;
  desc: string;
  image: string;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  desc: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.models.Book || mongoose.model<IBook>("Book", BookSchema);
