import prisma from "../../lib/prisma";
import { notFound } from "next/navigation";
import LoomPlayer from "../../components/LoomPlayer";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const video = await prisma.video.findUnique({ where: { id } });
    if (!video) return { title: "Video not found" };
    return {
      title: `${video.title} | Loom`,
      description: `${video.title} by ${video.author}`,
    };
  } catch {
    return { title: "Loom Player" };
  }
}

export default async function SharePage({ params }) {
  const { id } = await params;

  let video;
  try {
    video = await prisma.video.findUnique({ where: { id } });
  } catch (err) {
    return (
      <div style={{ padding: 40, fontFamily: "monospace" }}>
        <h1>Database connection error</h1>
        <p>{err.message}</p>
        <p style={{ color: "#888", fontSize: 12 }}>
          Check that DATABASE_URL is set in Vercel environment variables
          and that the RDS security group allows inbound connections.
        </p>
      </div>
    );
  }

  if (!video) notFound();

  // Increment view count
  try {
    await prisma.video.update({
      where: { id },
      data: { views: { increment: 1 } },
    });
  } catch {
    // non-critical — continue rendering even if view count fails
  }

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
