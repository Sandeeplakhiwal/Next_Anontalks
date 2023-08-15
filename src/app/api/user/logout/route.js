import { asyncError } from "@/middlewares/error";
import { cookieSetter } from "@/utils/features";
import { NextResponse } from "next/server";

export const GET = asyncError(async (req) => {
  cookieSetter(NextResponse, null, false);
  return NextResponse.json(
    {
      success: true,
      message: "Logged out successfully",
    },
    {
      status: 200,
    }
  );
});
