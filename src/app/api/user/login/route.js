import { asyncError, errorHandler } from "@/middlewares/error";
import { User } from "@/models/userModel";
import { NextResponse } from "next/server";
import {
  connectDB,
  cookieSetter,
  generateToken,
  isMatch,
} from "../../../../utils/features.js";

export const POST = asyncError(async (req) => {
  const formData = await req.json();

  await connectDB();

  let user = await User.findOne({ email: formData.email }).select("+password");

  if (!user) {
    return errorHandler(NextResponse, 400, "Incorrect email or password!");
  }

  const match = await isMatch(formData.password, user.password);

  if (!match) {
    return errorHandler(NextResponse, 400, "Incorrect email or password!");
  }

  cookieSetter(NextResponse, generateToken(user._id), true);

  return NextResponse.json(
    {
      success: true,
      message: `Welcome back ${user.name}`,
      user,
    },
    { status: 200 }
  );
});
