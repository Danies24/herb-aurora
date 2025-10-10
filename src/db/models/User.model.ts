import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firebaseUid: string;
  phone: string;
  fullName: string;
  defaultAddress?: mongoose.Types.ObjectId; // reference to Address
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firebaseUid: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    fullName: { type: String, required: true },
    defaultAddress: { type: Schema.Types.ObjectId, ref: "Address" },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
