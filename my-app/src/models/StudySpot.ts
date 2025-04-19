import mongoose, { Schema, Document, models } from "mongoose";

export interface IStudySpot extends Document {
    name: string;
    description: string;
    address: string,
    coordinates: {
        lat: number,
        lng: number
    },
    tags?: string[], 
    image?: string;   
}

const StudySpotSchema = new Schema<IStudySpot>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: {type: String},
    coordinates: {
        lat: { type: Number, required: false, default: 0 },
        lng: { type: Number, required: false, default: 0 },
    },
    tags: {
        type: [String],  
        default: []      
    },
    image: {type: String}
});

const StudySpot = models.StudySpot || mongoose.model<IStudySpot>("StudySpot", StudySpotSchema);

export default StudySpot;
