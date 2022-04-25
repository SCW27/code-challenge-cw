import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { required: true, type: String }
});

export default mongoose.model("User", userSchema);
