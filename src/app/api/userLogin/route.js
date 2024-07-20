import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/model/User.Model";
import { NextRequest, NextResponse } from "next/server";
 // Adjust the import path according to your project structure

export  async function POST(req, res) {
  await dbConnect();
    try {
    const data = await req.json();

      // Validate that togetherID and password are provided
      if (!data.togetherID || !data.password) {
        return NextResponse.json({ success: false, error: "Together ID and password are required",statusCode:400 });
      }

      // Check if a user with the same togetherID and password exists
      const user = await User.findOne({togetherID: data.togetherID, password: data.password });
      if (user) {
        return NextResponse.json({ success: true, data: user,statusCode:200 });
      } else {
        return NextResponse.json({ success: false, error: "User not found",statusCode:404 });
      }
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message,statuscode:500 });
    }

 
}
