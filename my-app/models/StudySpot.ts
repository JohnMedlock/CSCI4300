import mongoose, { Schema, Document, models } from "mongoose";

export interface IStudySpot extends Document {
    name: string;
    description: string;
    address: string,
    coordinates: {
        lat: number,
        lng: number
    },
    attributes: {
        outdoors?: boolean;
        indoors?: boolean;
        free?: boolean;
    },
    image: string;
}

const StudySpotSchema = new Schema<IStudySpot>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: {type: String},
    coordinates: {
        lat: { type: Number, required: false },
        lng: { type: Number, required: false },
    },
    attributes: {
        type: {
          outdoors: { type: Boolean, default: false },
          indoors: { type: Boolean, default: false },
          free: { type: Boolean, default: false }
        },
        required: false
    },
    image: {type: String}
});

const StudySpot = models.StudySpot || mongoose.model<IStudySpot>("StudySpot", StudySpotSchema);

export default StudySpot;
