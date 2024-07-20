import dbConnect from "@/app/lib/dbConnect";
import Question from "@/app/model/Question.Model";
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();

  const data = await req.json();
  console.log(data);

  // Validate incoming data
  const { GroupID,solution } = data;
  if (!GroupID || !solution) {
    return NextResponse.json({ success: false, error: "Missing required parameters", statusCode: 400 });
  }

  try {
    // Find the question with the given GroupID and heading
    const updatedQuestion = await Question.findOneAndUpdate(
      { GroupID},
      {
        $push: {
          "question.$.solvedBy": {
            name: solution.name,
            timeTaken: solution.timeTaken,
            solution: solution.solution,
          },
        },
      },
      { new: true } // Return the updated document
    ).exec();

    if (!updatedQuestion) {
      return NextResponse.json({ success: false, error: "Question not found", statusCode: 404 });
    }

    return NextResponse.json({ success: true, data: updatedQuestion, statusCode: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message, statusCode: 500 });
  }
}
