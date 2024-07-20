import dbConnect from "@/app/lib/dbConnect";
import Group from "@/app/model/Group.Model";
import { NextResponse } from 'next/server';

export async function POST(req) {
  await dbConnect();

  // Extract the member ID from the query parameters
  const data = await req.json();
  console.log(data);
  if (!data.memberId) {
    return NextResponse.json({ success: false, error: "Missing memberId query parameter", statusCode: 400 });
  }

  try {
    // Find groups where the members array contains the given member ID
    const groups = await Group.find({ members: data.memberId }).select('GroupID groupname'); // Only select GroupID to optimize performance

    // Map the results to an array of group IDs
    const groupDetails = groups.map(group => ({
        GroupID: group.GroupID,
        groupname: group.groupname
      }));

    return NextResponse.json({ success: true, data: groupDetails, statusCode: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ success: false, error: error.message, statusCode: 500 });
  }
}
