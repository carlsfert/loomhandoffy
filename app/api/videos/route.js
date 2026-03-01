import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const videos = await prisma.video.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(videos);
}

export async function POST(request) {
  const body = await request.json();
  const { title, author, videoUrl } = body;

  if (!title || !author || !videoUrl) {
    return NextResponse.json(
      { error: "title, author, and videoUrl are required" },
      { status: 400 }
    );
  }

  const video = await prisma.video.create({
    data: { title, author, videoUrl },
  });

  return NextResponse.json(video, { status: 201 });
}
