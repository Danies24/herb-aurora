import mongoose, { Schema, Document } from "mongoose";

export interface IProductVariant {
  size: string;
  price: number;
  weight: string;
  strikedPrice?: number;
}

export interface IProduct extends Document {
  id: string;
  name: string;
  target: string;
  benefit: string;
  description: string;
  ingredients: string;
  usage: string;
  images: string[];
  color: string;
  features?: string[];
  variants: IProductVariant[];
  shelfLife?: string;
  storage?: string;
  warnings?: string;
  rank: number;
  category: string;
  rating: number;
  strikedPrice?: number;
}

const ProductSchema = new Schema<IProduct>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    target: { type: String, required: true },
    benefit: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: String, required: true },
    usage: { type: String, required: true },
    images: [{ type: String, required: true }],
    color: { type: String, required: true },
    features: [{ type: String }],
    variants: [
      {
        size: { type: String, required: true },
        price: { type: Number, required: true },
        weight: { type: String, required: true },
        strikedPrice: { type: Number },
      },
    ],
    shelfLife: { type: String },
    storage: { type: String },
    warnings: { type: String },
    rank: { type: Number, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true },
    strikedPrice: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
