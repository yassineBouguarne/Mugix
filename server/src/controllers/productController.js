import Product from '../models/Product.js';

// GET /api/products - Liste tous les produits
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category_id', 'id name description')
      .sort({ createdAt: -1 });

    // Transformer pour correspondre au format frontend
    const formattedProducts = products.map(product => {
      const obj = product.toJSON();
      if (product.category_id) {
        obj.category = {
          id: product.category_id._id.toString(),
          name: product.category_id.name,
          description: product.category_id.description
        };
      }
      delete obj.category_id;
      return obj;
    });

    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/products/:id - Obtenir un produit par ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category_id', 'id name description');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const obj = product.toJSON();
    if (product.category_id) {
      obj.category = {
        id: product.category_id._id.toString(),
        name: product.category_id.name,
        description: product.category_id.description
      };
    }
    delete obj.category_id;

    res.json(obj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/products - Créer un produit
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image_url, images, category_id, available } = req.body;

    // Support both old (image_url) and new (images) format
    let productImages = [];
    if (images && Array.isArray(images) && images.length > 0) {
      productImages = images;
    } else if (image_url) {
      productImages = [image_url];
    }

    const product = new Product({
      name,
      description,
      price,
      images: productImages,
      category_id: category_id || null,
      available: available !== undefined ? available : true
    });

    await product.save();

    const savedProduct = await Product.findById(product._id)
      .populate('category_id', 'id name description');

    const obj = savedProduct.toJSON();
    if (savedProduct.category_id) {
      obj.category = {
        id: savedProduct.category_id._id.toString(),
        name: savedProduct.category_id.name,
        description: savedProduct.category_id.description
      };
    }
    delete obj.category_id;

    res.status(201).json(obj);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT /api/products/:id - Mettre à jour un produit
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, image_url, images, category_id, available } = req.body;

    // Support both old (image_url) and new (images) format
    const updateData = { name, description, price, category_id, available };
    if (images !== undefined) {
      updateData.images = Array.isArray(images) ? images : [];
    } else if (image_url !== undefined) {
      updateData.images = image_url ? [image_url] : [];
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category_id', 'id name description');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const obj = product.toJSON();
    if (product.category_id) {
      obj.category = {
        id: product.category_id._id.toString(),
        name: product.category_id.name,
        description: product.category_id.description
      };
    }
    delete obj.category_id;

    res.json(obj);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE /api/products/:id - Supprimer un produit
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
