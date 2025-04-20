import mongoose, { Schema, Document, models, Types } from 'mongoose';

/* ------------------------------------------------------------------ */
/*  TypeScript interface                                               */
/* ------------------------------------------------------------------ */
export interface IStudySpot extends Document {
  name: string;
  description: string;
  address: string;
  coordinates: { lat: number; lng: number };
  tags?: string[];
  image?: string;

  /** the user who uploaded this spot */
  owner: Types.ObjectId;
}

/* ------------------------------------------------------------------ */
/*  Mongoose schema                                                    */
/* ------------------------------------------------------------------ */
const StudySpotSchema = new Schema<IStudySpot>(
  {
    name:        { type: String,  required: true },
    description: { type: String,  required: true },
    address:     { type: String },
    coordinates: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
    },
    tags:  { type: [String], default: [] },
    image: { type: String },

    /* FK ➜ users collection */
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }   // createdAt / updatedAt
);

/* ------------------------------------------------------------------ */
/*  Export (reuse existing model in hot‑reload)                        */
/* ------------------------------------------------------------------ */
const StudySpot =
  models.StudySpot || mongoose.model<IStudySpot>('StudySpot', StudySpotSchema);

export default StudySpot;
