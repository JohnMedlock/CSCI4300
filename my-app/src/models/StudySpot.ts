import mongoose, { Schema, Document, models, Types } from 'mongoose';

/**
 * IStudySpot defines the shape of a study spot document.
 */
export interface IStudySpot extends Document {
  name: string;
  description: string;
  address: string;
  coordinates: { lat: number; lng: number };
  tags?: string[];
  image?: string;

  /** Reference to the user who uploaded the spot */
  owner: Types.ObjectId;
}

/**
 * Mongoose schema for StudySpot, representing a place where students can study.
 */
const StudySpotSchema = new Schema<IStudySpot>(
  {
    name:        { type: String, required: true },
    description: { type: String, required: true },
    address:     { type: String },

    coordinates: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
    },

    tags:  { type: [String], default: [] },
    image: { type: String },

    // Foreign key to User collection
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

/**
 * Exports the compiled StudySpot model, or reuses the existing one during hot-reload.
 */
const StudySpot =
  models.StudySpot || mongoose.model<IStudySpot>('StudySpot', StudySpotSchema);

export default StudySpot;
