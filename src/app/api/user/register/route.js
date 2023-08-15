import { asyncError, errorHandler } from "@/middlewares/error";
import { User } from "@/models/userModel";
import { NextResponse } from "next/server";
import {
  connectDB,
  cookieSetter,
  generateToken,
} from "../../../../utils/features.js";
import bcrypt from "bcrypt";

export const POST = asyncError(async (req) => {
  await connectDB();
  const formData = await req.json();
  console.log("formData in route.js", formData);

  let user = await User.findOne({ email: formData.email }).lean();
  if (user) {
    return errorHandler(
      NextResponse,
      409,
      "User already exist with this email address."
    );
  }

  console.log("Creating user....");

  const hashedPassword = await bcrypt.hash(formData.password, 10);

  user = await User.create({
    name: formData.name,
    email: formData.email,
    password: hashedPassword,
  });

  console.log("User has created!");

  cookieSetter(NextResponse, generateToken(user._id), true);

  return NextResponse.json(
    {
      success: true,
      message: "Registered successfully",
      user,
    },
    { status: 201 }
  );
});
