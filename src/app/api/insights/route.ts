import { NextResponse } from "next/server";
import auditsData from "@/src/data/audits.json";

export async function GET() {
  return NextResponse.json(auditsData);
}
