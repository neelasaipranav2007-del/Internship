const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Create a default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    },
  });
  console.log(`Admin created/found: ${admin.email}`);

  // 2. Create some categories
  const categoriesData = [
    { name: 'Weddings', slug: 'weddings' },
    { name: 'Portraits', slug: 'portraits' },
    { name: 'Events', slug: 'events' },
  ];

  const createdCategories = [];
  for (const cat of categoriesData) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    createdCategories.push(category);
  }
  console.log('Categories created:', createdCategories.map((c) => c.name).join(', '));

  // 3. Create placeholder gallery images
  const galleryData = [
    {
      title: 'Beach Wedding',
      imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop',
      publicId: 'seed_wedding_1',
      categoryId: createdCategories[0].id,
      isFeatured: true,
      order: 1,
    },
    {
      title: 'Classic Portrait',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
      publicId: 'seed_portrait_1',
      categoryId: createdCategories[1].id,
      isFeatured: true,
      order: 2,
    },
    {
      title: 'Corporate Event',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop',
      publicId: 'seed_event_1',
      categoryId: createdCategories[2].id,
      isFeatured: false,
      order: 3,
    },
    {
      title: 'Sunset Engagement',
      imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
      publicId: 'seed_wedding_2',
      categoryId: createdCategories[0].id,
      isFeatured: false,
      order: 4,
    },
    {
      title: 'Studio Portrait',
      imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop',
      publicId: 'seed_portrait_2',
      categoryId: createdCategories[1].id,
      isFeatured: true,
      order: 5,
    },
    {
      title: 'Concert Night',
      imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop',
      publicId: 'seed_event_2',
      categoryId: createdCategories[2].id,
      isFeatured: false,
      order: 6,
    },
  ];

  // Optional: clear existing gallery to avoid duplicates
  // await prisma.gallery.deleteMany({});

  for (const item of galleryData) {
    // Only create if we can't find it by publicId
    const existing = await prisma.gallery.findFirst({
      where: { publicId: item.publicId }
    });
    
    if (!existing) {
      await prisma.gallery.create({
        data: item,
      });
    }
  }
  console.log('Gallery images seeded successfully.');

  // 4. Create default settings
  await prisma.setting.createMany({
    data: [
      {
        siteName: 'JonathanPortfolio',
        heroText: 'Capturing Moments, Creating Memories',
        heroSubtext: 'Professional Photography Services',
      }
    ],
    skipDuplicates: true
  });
  console.log('Settings seeded.');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
