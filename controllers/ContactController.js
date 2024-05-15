//import the model
const Contact = require("../models/contactModel");
const mongoose = require("mongoose");

//get all contacts
const getContacts = async (req, res) => {
  const contacts = await Contact.find({}).sort({ createdAt: -1 });
  res.status(200).json(contacts);
};

//create a contact
const createContact = async (req, res) => {
  const { fullname, email, phonenumber, gender } = req.body;

  //get the empty fields to send as an error message
  let emptyFields = [];

  if (!fullname) {
    emptyFields.push(" Full Name");
  }
  if (!email) {
    emptyFields.push(" Email");
  }
  if (!gender) {
    emptyFields.push(" Gender");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in " + emptyFields });
  }

  //add document to database
  try {
    const contact = await Contact.create({
      fullname,
      email,
      phonenumber,
      gender,
    });
    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a contact
const deleteContact = async (req, res) => {
  const { id } = req.params;

  //is the id valid?
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such contact" });
  }

  const contact = await Contact.findOneAndDelete({ _id: id });

  if (!contact) {
    res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(contact);
};

//update a contact
const updateContact = async (req, res) => {
  const { id } = req.params;

  //is the id valid?
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such contact" });
  }

  const contact = await Contact.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!contact) {
    res.status(400).json({ error: "No such workout" });
  }

  res.status(200).json(contact);
};

module.exports = {
  createContact,
  getContacts,
  deleteContact,
  updateContact,
};
