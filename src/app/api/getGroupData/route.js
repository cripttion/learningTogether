import dbConnect from "@/app/lib/dbConnect";
import Group from "@/app/model/Group.Model";
import Question from "@/app/model/Question.Model";
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();

  const data = await req.json();
  console.log(data);
  if (!data.GroupID) {
    return NextResponse.json({ success: false, error: "Missing GroupID parameter", statusCode: 400 });
  }

  try {
    // Fetch the group data
    const groups = await Group.find({ GroupID: data.GroupID }).exec();

    // Fetch only the 'question' field from the Question model
    const questions = await Question.find({ GroupID: data.GroupID }).select('question -_id').exec();
    // Flatten questions into a single array
    const flatQuestions = questions.flatMap(q => q.question);

    // Combine the data
    const combinedData = groups.map(group => {
      // Convert mongoose document to plain object
      const groupObj = group.toObject();

      // Directly attach the questions to the group object
      return {
        ...groupObj,
        question: flatQuestions // Flatten the array of questions
      };
    });

    return NextResponse.json({ success: true, data: combinedData, statusCode: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message, statusCode: 500 });
  }
}
