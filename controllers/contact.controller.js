const Contact = require("../models/contact.model");

// Contact Controller
const contactForm = async (req, res) => {
  try {
    const { username, email, message } = req.body;

    const newContact = new Contact({
      username,
      email,
      message,
    });

    // Check if message already sent
    const contactExist = await Contact.findOne({ email: email });
    if (contactExist) {
      return res.status(400).json({ message: "Message already sent" });
    }

    // Save the contact to the database
    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Message Sent Successfully",
    });
    console.log("Message Sent Successfully");
  } catch (error) {
    res.status(500).json({ message: "Message Not Delivered" });
  }
};

module.exports = {
  contactForm,
};
