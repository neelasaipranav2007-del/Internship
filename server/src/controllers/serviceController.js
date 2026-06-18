const prisma = require('../config/prisma');

// @desc    Get all services (supports all=true query for admin)
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { isActive: true };
    const services = await prisma.service.findMany({ where: filter });
    
    const mappedServices = services.map(srv => ({
      ...srv,
      _id: srv.id
    }));
    
    res.json(mappedServices);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
const createService = async (req, res) => {
  try {
    const { title, description, price, deliverables, imageUrl, isActive } = req.body;
    
    const createdService = await prisma.service.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        deliverables: deliverables || [],
        imageUrl,
        isActive: isActive !== undefined ? isActive : true
      }
    });
    
    res.status(201).json({ ...createdService, _id: createdService.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = async (req, res) => {
  try {
    const { title, description, price, deliverables, imageUrl, isActive } = req.body;
    
    const dataToUpdate = {};
    if (title !== undefined) dataToUpdate.title = title;
    if (description !== undefined) dataToUpdate.description = description;
    if (price !== undefined) dataToUpdate.price = parseFloat(price);
    if (deliverables !== undefined) dataToUpdate.deliverables = deliverables;
    if (imageUrl !== undefined) dataToUpdate.imageUrl = imageUrl;
    if (isActive !== undefined) dataToUpdate.isActive = isActive;

    const updatedService = await prisma.service.update({
      where: { id: req.params.id },
      data: dataToUpdate
    });
    
    res.json({ ...updatedService, _id: updatedService.id });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Service not found' });
    } else {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = async (req, res) => {
  try {
    await prisma.service.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Service removed' });
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ message: 'Service not found' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = { 
  getServices, 
  createService,
  updateService,
  deleteService
};
