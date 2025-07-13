import mongoose from "mongoose";
import { type } from "os";

const productSchema = new mongoose.Schema(
  {
    images: {
      type: [String], // URLs or Cloudinary paths
      required: true, // At least one image should be required
      validate: [(val) => val.length > 0, "At least one image is required"],
    },
    name:{
      type:String,
      required:true,
      trim:true
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price:{
      type:Number,
      required:true
    },
    category: {
      type: String,
      required: true,
      enum: ["Men", "Women", "Kids"],
    },
    subcategory: {
      type: String,
      required: true,
      trim: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    isBestseller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
