import Contact from '../models/Contact.js';

// POST /api/contacts - Creer un message de contact (public)
export const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'firstName, lastName, email et message sont requis.' });
    }

    const contact = new Contact({ firstName, lastName, email, phone: phone || null, message });
    await contact.save();

    res.status(201).json({
      id: contact._id.toString(),
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      message: contact.message,
      createdAt: contact.createdAt
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /api/contacts - Lister tous les messages (admin)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    const formatted = contacts.map(c => ({
      id: c._id.toString(),
      firstName: c.firstName,
      lastName: c.lastName,
      email: c.email,
      phone: c.phone,
      message: c.message,
      createdAt: c.createdAt
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE /api/contacts/:id - Supprimer un message (admin)
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
