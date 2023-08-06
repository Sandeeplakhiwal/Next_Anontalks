import { asyncError } from "@/middlewares/error";
import { User } from "@/models/userModel";
import { NextResponse } from "next/server";

export const POST = asyncError(async (req) => {
  return NextResponse.json(
    {
      success: true,
      message: "Registered successfully",
    },
    { status: 200 }
  );
});
