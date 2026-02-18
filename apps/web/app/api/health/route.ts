import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ Health: "Server is Running" }, { status: 200 });
}
