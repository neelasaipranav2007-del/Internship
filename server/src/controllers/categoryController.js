const prisma = require('../config/prisma');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    
    // Map id to _id for frontend compatibility
    const mappedCategories = categories.map(cat => ({
      ...cat,
      _id: cat.id
    }));
    
    res.json(mappedCategories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const categoryExists = await prisma.category.findUnique({ where: { slug } });
    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const createdCategory = await prisma.category.create({
      data: { name, slug }
    });

    // Automatically seed 4 default high-quality photography images for the new category
    const defaultImages = [
      {
        title: `${name} Showcase 1`,
        imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
        publicId: `placeholder_unsplash_${Date.now()}_1`,
        categoryId: createdCategory.id,
        isFeatured: false,
        order: 0
      },
      {
        title: `${name} Showcase 2`,
        imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
        publicId: `placeholder_unsplash_${Date.now()}_2`,
        categoryId: createdCategory.id,
        isFeatured: false,
        order: 1
      },
      {
        title: `${name} Showcase 3`,
        imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop',
        publicId: `placeholder_unsplash_${Date.now()}_3`,
        categoryId: createdCategory.id,
        isFeatured: false,
        order: 2
      },
      {
        title: `${name} Showcase 4`,
        imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop',
        publicId: `placeholder_unsplash_${Date.now()}_4`,
        categoryId: createdCategory.id,
        isFeatured: false,
        order: 3
      }
    ];

    await prisma.gallery.createMany({ data: defaultImages });

    res.status(201).json({ ...createdCategory, _id: createdCategory.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const updatedCategory = await prisma.category.update({
      where: { id: req.params.id },
      data: { name, slug }
    });

    res.json({ ...updatedCategory, _id: updatedCategory.id });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res) => {
  try {
    // Delete associated galleries first
    await prisma.gallery.deleteMany({
      where: { categoryId: req.params.id }
    });
    
    await prisma.category.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Category removed' });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
