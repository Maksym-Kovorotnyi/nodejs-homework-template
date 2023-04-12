const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

const getAllContacts = async (req, res) => {
  const result = await listContacts();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const getOneContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    throw HttpError(404, "There is no such contact");
  }
  res.json(result);
};

const addNewContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const result = await addContact(name, email, phone);
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw HttpError(404, "There is no such Id");
  }
  res.json(result);
};

const changeContact = async (req, res) => {
  const id = req.params.contactId;
  const result = await updateContact(id, req.body);
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  addNewContact: ctrlWrapper(addNewContact),
  deleteContact: ctrlWrapper(deleteContact),
  changeContact: ctrlWrapper(changeContact),
};
