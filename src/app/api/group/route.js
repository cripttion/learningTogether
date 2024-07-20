import dbConnect from "@/app/lib/dbConnect";
import Group from "@/app/model/Group.Model";
import Question from "@/app/model/Question.Model";
// import Group from "@/app/model/Group.Model";
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();
  try {
    const data = await req.json();
    console.log("Received data:", data);

    // Ensure the data contains required fields
    if (!data.groupname || !Array.isArray(data.members)) {
      return NextResponse.json({ success: false, error: "Missing required fields", statusCode: 400 });
    }

    // Create a new group object with the received data
    const newGroup = new Group({
      groupname: data.groupname,
      members: data.members,
      discussion: [], // Default empty array
      aianswer: [], // Default empty array
      groupLogo: "" // Default empty string or other default value
    });
   
    // Save the new group to the database
    const response = await newGroup.save();
    // console.log("Group saved:", response);
    const newQuestion  = new Question({
      GroupID:response.GroupID,
      question:[]
    })
    const qResponse = await newQuestion.save();
    console.log("Question",qResponse);
    return NextResponse.json({ success: true, data: response, statusCode: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message, statusCode: 500 });
  }
}
