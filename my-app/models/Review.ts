import mongoose, { Schema, Document, models } from "mongoose";

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;          
  studySpot: mongoose.Types.ObjectId; 
  rating: number;                         
  comment?: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  studySpot: { type: Schema.Types.ObjectId, ref: "StudySpot", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Review = models.Review || mongoose.model<IReview>("Review", ReviewSchema);

export default Review;