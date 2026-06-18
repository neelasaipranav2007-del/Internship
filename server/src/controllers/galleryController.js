const prisma = require('../config/prisma');

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
const getGallery = async (req, res) => {
  try {
    const gallery = await prisma.gallery.findMany({
      include: {
        category: true,
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });
    
    // Map id to _id for frontend compatibility
    const mappedGallery = gallery.map(img => ({
      ...img,
      _id: img.id,
      category: img.category ? { ...img.category, _id: img.category.id } : null
    }));

    res.json(mappedGallery);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add a gallery image
// @route   POST /api/gallery
// @access  Private/Admin
const addGalleryImage = async (req, res) => {
  try {
    const { title, imageUrl, publicId, categoryId, isFeatured, order } = req.body;
    
    // If order is not specified, assign next high order value
    let orderVal = order;
    if (orderVal === undefined) {
      const highest = await prisma.gallery.findFirst({
        where: { categoryId: categoryId },
        orderBy: { order: 'desc' }
      });
      orderVal = highest ? highest.order + 1 : 0;
    }

    const createdImage = await prisma.gallery.create({
      data: {
        title,
        imageUrl,
        publicId,
        categoryId,
        isFeatured: isFeatured !== undefined ? isFeatured : false,
        order: orderVal
      },
      include: {
        category: true
      }
    });
    
    res.status(201).json({
      ...createdImage,
      _id: createdImage.id,
      category: createdImage.category ? { ...createdImage.category, _id: createdImage.category.id } : null
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a gallery image details
// @route   PUT /api/gallery/:id
// @access  Private/Admin
const updateGalleryImage = async (req, res) => {
  try {
    const { title, categoryId, isFeatured, order } = req.body;
    
    const dataToUpdate = {};
    if (title !== undefined) dataToUpdate.title = title;
    if (categoryId !== undefined) dataToUpdate.categoryId = categoryId;
    if (isFeatured !== undefined) dataToUpdate.isFeatured = isFeatured;
    if (order !== undefined) dataToUpdate.order = order;

    const updatedImage = await prisma.gallery.update({
      where: { id: req.params.id },
      data: dataToUpdate,
      include: {
        category: true
      }
    });
    
    res.json({
      ...updatedImage,
      _id: updatedImage.id,
      category: updatedImage.category ? { ...updatedImage.category, _id: updatedImage.category.id } : null
    });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Image not found' });
    } else {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

// @desc    Reorder gallery images
// @route   PUT /api/gallery/reorder
// @access  Private/Admin
const reorderGalleryImages = async (req, res) => {
  try {
    const { images } = req.body; // Array of { id, order }
    if (!images || !Array.isArray(images)) {
      return res.status(400).json({ message: 'Invalid payload' });
    }

    // Prisma doesn't have a direct bulkWrite for updates with different values per row.
    // We can use a transaction.
    const updates = images.map(img => 
      prisma.gallery.update({
        where: { id: img.id },
        data: { order: img.order }
      })
    );

    await prisma.$transaction(updates);
    res.json({ message: 'Gallery order updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deleteGalleryImage = async (req, res) => {
  try {
    await prisma.gallery.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Image removed' });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Image not found' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = { 
  getGallery, 
  addGalleryImage, 
  updateGalleryImage,
  reorderGalleryImages,
  deleteGalleryImage 
};
