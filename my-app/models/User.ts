import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
   username: string;
   password: string;
   email: string;
   profile_picture?: string;
   likedSpots?: mongoose.Types.ObjectId[];
   uploadedSpots?: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    profile_picture: {type: String},
    likedSpots: [{ type: Schema.Types.ObjectId, ref: "StudySpot" }],
    uploadedSpots: [{ type: Schema.Types.ObjectId, ref: "StudySpot" }]
});

const User = models.User || mongoose.model<IUser>("User", UserSchema);

export default User;