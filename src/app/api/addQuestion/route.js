import dbConnect from '@/app/lib/dbConnect';
import Group from '@/app/model/Group.Model';
import Question from '@/app/model/Question.Model';
import { NextResponse } from 'next/server';
// import dbConnect from '../../../lib/dbConnect';
// import Group from '../../../models/Group';

export  async function POST(req, res) {
  await dbConnect();

  const data = await req.json();

  try {
    const group = await Question.findOneAndUpdate(
      { GroupID: data.groupID },
      { $push: { question:data.question } },
      { new: true }
    );
  console.log(group);
    if (!group) {
      return NextResponse.json({ error: 'Group not found' ,statusCode:404});
    }

    return NextResponse.json({ message: 'Question added successfully',statusCode:200 });
  } catch (error) {
  return  NextResponse.json({ error: 'Internal server error',statusCode:500 });
  }
}
