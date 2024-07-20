const { Schema, default: mongoose } = require("mongoose");

const QuestionSchema = new mongoose.Schema({
 GroupID:{
    type: String,
    required: true,
  },
  question: [
    {
      heading: String,
      description: String,
      solvedBy: [
        {
          name: String,
          timeTaken: String,
          solution:String
        },
      ],
      startingTime: String,
      endingTime: String,
      points: String,
      topic: Array,
      finalSotuion:{
        type:String,
        required:true
      }
    },
  ],
});


const Question =mongoose.models.Question|| mongoose.model("Question", QuestionSchema);

export default Question;
