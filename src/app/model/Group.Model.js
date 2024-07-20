const { Schema, default: mongoose } = require("mongoose");

const groupSchema = new Schema({
  GroupID: {
    type: String,
  },
  groupname:{
    type:String,
    required:true,
  },
  members: {
    type:[String],
  },
  discussion: [
    {
      by: String,
      ans: String,
    },
  ],
  aianswer: [
    {
      askedBy: String,
      question: String,
      answer: String,
    },

  ],
  groupLogo:String
});

// Pre-save middleware to generate the GroupID
groupSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  const lastGroup = await this.constructor.findOne().sort({ GroupID: -1 });
  if (lastGroup && lastGroup.GroupID) {
    const lastID = parseInt(lastGroup.GroupID.replace("GTGROUP", ""));
    this.GroupID = "GTGROUP" + (lastID + 1);
  } else {
    this.GroupID = "GTGROUP100";
  }

  next();
});

const Group =mongoose.models.Group || mongoose.model("Group", groupSchema);

export default Group;
