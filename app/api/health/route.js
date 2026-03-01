import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const checks = { env: !!process.env.DATABASE_URL, db: false, videoCount: 0 };

  try {
    const videos = await prisma.video.findMany({ take: 1 });
    checks.db = true;
    checks.videoCount = videos.length;
  } catch (err) {
    checks.dbError = err.message;
  }

  const status = checks.db ? 200 : 500;
  return NextResponse.json(checks, { status });
}
