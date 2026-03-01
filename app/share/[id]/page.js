import prisma from "../../lib/prisma";
import { notFound } from "next/navigation";
import LoomPlayer from "../../components/LoomPlayer";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const video = await prisma.video.findUnique({ where: { id } });

  if (!video) return { title: "Video not found" };

  return {
    title: `${video.title} | Loom`,
    description: `${video.title} by ${video.author}`,
  };
}

export default async function SharePage({ params }) {
  const { id } = await params;

  const video = await prisma.video.findUnique({ where: { id } });

  if (!video) notFound();

  // Increment view count
  await prisma.video.update({
    where: { id },
    data: { views: { increment: 1 } },
  });

  return (
    <LoomPlayer
      videoUrl={video.videoUrl}
      title={video.title}
      author={video.author}
      views={video.views + 1}
      createdAt={video.createdAt.toISOString()}
    />
  );
}
