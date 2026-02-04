import Category from '../models/Category.js';

// GET /api/categories - Liste toutes les catégories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });

    const formattedCategories = categories.map(cat => ({
      id: cat._id.toString(),
      name: cat.name,
      description: cat.description,
      created_at: cat.createdAt
    }));

    res.json(formattedCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/categories - Créer une catégorie
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = new Category({ name, description });
    await category.save();

    res.status(201).json({
      id: category._id.toString(),
      name: category.name,
      description: category.description,
      created_at: category.createdAt
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /api/categories/:id - Supprimer une catégorie
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
