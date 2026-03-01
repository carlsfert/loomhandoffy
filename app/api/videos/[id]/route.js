import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const { id } = await params;

  const video = await prisma.video.findUnique({ where: { id } });

  if (!video) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }

  return NextResponse.json(video);
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();

  const video = await prisma.video.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(video);
}
