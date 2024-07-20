import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/model/User.Model";
import { NextRequest, NextResponse } from "next/server";
 // Adjust the import path according to your project structure

export  async function POST(req, res) {
  await dbConnect();
    try {
      const data = await req.json();
      console.log("the data is",data);
      const newUser = new User(data);
      const response = await newUser.save();
      console.log(response);
      return NextResponse.json({ success: true, data: newUser,statusCode:200 });
    } catch (error) {
       return  NextResponse.json({ success: false, error: error.message,statusCode:500 });
    }
 
}
