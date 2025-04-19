// src/models/StudySpot.ts
import mongoose, { Schema, Document, models, Types } from 'mongoose';

export interface IStudySpot extends Document {
  name: string;
  description: string;
  address: string;
  coordinates: { lat: number; lng: number };
  tags?: string[];
  image?: string;

  /* NEW → matches schema below */
  owner: Types.ObjectId;          // or mongoose.Types.ObjectId
}

const StudySpotSchema = new Schema<IStudySpot>({
  name:        { type: String, required: true },
  description: { type: String, required: true },
  address:     { type: String },
  coordinates: {
    lat: { type: Number, default: 0 },
    lng: { type: Number, default: 0 },
  },
  tags:   { type: [String], default: [] },
  image:  String,

  // already added in the previous step
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const StudySpot =
  models.StudySpot || mongoose.model<IStudySpot>('StudySpot', StudySpotSchema);

export default StudySpot;
