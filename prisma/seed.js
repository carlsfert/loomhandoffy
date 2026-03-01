const { PrismaClient } = require("../app/generated/prisma");

const prisma = new PrismaClient();

async function main() {
  const videos = [
    {
      title: "Optimierung des Slicer-Exports für Kampagnen",
      author: "Zachary Coleman",
      videoUrl:
        "https://storage.googleapis.com/videos-eu/p5QxDBXybOUa1u1wPtSCR.mp4",
      views: 2,
    },
  ];

  for (const video of videos) {
    const created = await prisma.video.create({ data: video });
    console.log(`Created video: ${created.title} (${created.id})`);
    console.log(`  Share link: /share/${created.id}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
