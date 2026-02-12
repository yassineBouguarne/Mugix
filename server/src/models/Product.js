import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: null
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  images: {
    type: [String],
    default: []
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      ret.image_url = ret.images && ret.images.length > 0 ? ret.images[0] : null;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Auto-migration: convertir l'ancien champ image_url en images[]
productSchema.post('init', function(doc) {
  if (doc._doc.image_url && (!doc.images || doc.images.length === 0)) {
    doc.images = [doc._doc.image_url];
    doc.save();
  }
});

// Virtual pour populer la catégorie
productSchema.virtual('category', {
  ref: 'Category',
  localField: 'category_id',
  foreignField: '_id',
  justOne: true
});

export default mongoose.model('Product', productSchema);
