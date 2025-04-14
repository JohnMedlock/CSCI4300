import mongoose, { Schema, Document, models } from "mongoose";

export interface IStudySpot extends Document {
    name: string;
    description: string;
    address: string,
    coordinates: {
        lat: Number,
        lng: Number
    },
    tags?: string[],
    images?: string[];
}

const StudySpotSchema = new Schema<IStudySpot>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: {type: String},
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    tags: [{ type: String }],
    images: [{type: String}]
});

const StudySpot = models.StudySpot || mongoose.model<IStudySpot>("StudySpot", StudySpotSchema);

export default StudySpot;