import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { group } from "console";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  const posts = [
    {
      slug: "how-to-became-frontend-developer",
      title: "How to became a frontend developer",
      markdown: `
        # Learn how to became a frontend developer
        ready to code?
      `.trim()
    },
    {
      slug: "create-your-first-portfolio-page",
      title: "Create your first portfolio page",
      markdown: `
        # Let's build your portfolio
        let's start
      `.trim()
    }
  ];

  for(const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post
    });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
