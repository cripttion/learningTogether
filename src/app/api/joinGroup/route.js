import dbConnect from '@/app/lib/dbConnect';
import Group from '@/app/model/Group.Model';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  await dbConnect();

  const data = await req.json();

  try {
    const group = await Group.findOneAndUpdate(
      { GroupID: data.groupname },
      { $push: { members: data.members[0] } },
      { new: true }
    );

    if (!group) {
      return NextResponse.json({ error: 'Group not found',statusCode:404 });
    }

    return NextResponse.json({ message: 'Member added successfully', group, statusCode:200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error',statusCode:500 });
  }
}
