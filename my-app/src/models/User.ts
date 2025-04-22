import mongoose, { Schema, Document, models } from "mongoose";

/**
 * IUser defines the shape of a user document in MongoDB.
 */
export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  profile_picture?: string;

  /** IDs of spots the user has liked */
  likedSpots?: mongoose.Types.ObjectId[];

  /** IDs of spots the user has uploaded */
  uploadedSpots?: mongoose.Types.ObjectId[];
}

/**
 * Mongoose schema for User, representing a registered user of the app.
 */
const UserSchema = new Schema<IUser>({
  username:        { type: String, required: true, unique: true },
  password:        { type: String, required: true },
  email:           { type: String, required: true, unique: true },
  profile_picture: { type: String },

  likedSpots:     [{ type: Schema.Types.ObjectId, ref: "StudySpot" }],
  uploadedSpots:  [{ type: Schema.Types.ObjectId, ref: "StudySpot" }]
});

/**
 * Exports the compiled User model, or reuses an existing one if already defined.
 */
const User = models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
