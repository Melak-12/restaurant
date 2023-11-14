import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxLength: 200,
    },
    img: {
      type: String,
      // required: true,
    },
    prices: {
      type: [Number],
      // required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("myProduct", productSchema);
