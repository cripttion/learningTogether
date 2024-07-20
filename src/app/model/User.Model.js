const { Schema, default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  togetherID: {
    type: String,
  },
  password:{
    type: String,
    required: true,
  }
});

// Pre-save middleware to generate the togetherID
userSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  const lastUser = await this.constructor.findOne().sort({ togetherID: -1 });
  if (lastUser && lastUser.togetherID) {
    const lastID = parseInt(lastUser.togetherID.replace("GT", ""));
    this.togetherID = "GT" + (lastID + 1);
  } else {
    this.togetherID = "GT100";
  }

  next();
});

const User =mongoose.models.User|| mongoose.model("User", userSchema);

export default User;
