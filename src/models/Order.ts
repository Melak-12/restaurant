import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxLength: 60,
    },
    address: {
      type: String,
      required: true,
      maxLength: 200,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
      // required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Product", orderSchema);
